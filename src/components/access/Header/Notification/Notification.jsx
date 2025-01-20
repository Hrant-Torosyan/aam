import React, { useState, useEffect, useContext } from "react";
import SockJS from "sockjs-client";
import webstomp from "webstomp-client";
import { GetNotifications, ReadNotification } from "../../../../api/autorisation";
import { MainContext } from "../../../../app/App";

const Notification = ({
	setIsActiveSelectHeader,
	notification,
	setNotification,
	setIsOpenSc,
	setSuccessInfo,
}) => {
	let glData = useContext(MainContext);

	const [notificationInfo, setNotificationInfo] = useState(null);
	const [notifications, setNotifications] = useState(null);
	const [limitNotification, setLimitNotification] = useState({ pageSize: 3 });

	const [remainingTime, setRemainingTime] = useState(1200);

	useEffect(() => {
		let interval;

		if (glData.checkWallet) {
			interval = setInterval(() => {
				setRemainingTime((prevTime) => {
					if (prevTime === 0) {
						clearInterval(interval);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		} else {
			setRemainingTime(1200);
		}

		return () => clearInterval(interval);
	}, [glData]);

	useEffect(() => {
		if (remainingTime === 0) {
			glData.setCheckWallet(false);
			setIsOpenSc(true);
			setSuccessInfo(false);
		}
	}, [remainingTime, glData, setIsOpenSc, setSuccessInfo]);

	useEffect(() => {
		GetNotifications(limitNotification).then((res) => {
			setNotifications(res);
			res.content.forEach((item) => {
				if (item.readDate === null) {
					setNotificationInfo(item.notificationId);
				}
			});
		});
	}, [notificationInfo, limitNotification, notification]);
	useEffect(() => {
		// console.log = function () {};
		const socket = new SockJS("http://145.223.99.13:8080/aam-websocket");
		const stompClient = webstomp.over(socket);
		const connectCallback = () => {
			stompClient.subscribe(
				`/topic/messages.${JSON.parse(localStorage.getItem("userAuth")).id}`,
				function (message) {
					if (JSON.parse(message.body).type === "USER_DEPOSIT") {
						glData.setCheckWallet(false);
						setIsOpenSc(true);
						setSuccessInfo(true);
					}
					glData.setCheckPay(Math.random() * 333);
					console.log(JSON.parse(message.body));
					setNotificationInfo(JSON.parse(message.body).notificationId);
				}
			);
		};
		const errorCallback = (error) => {
			console.error("Error:", error);
		};
		stompClient.connect({}, connectCallback, errorCallback);
		return () => {
			stompClient.disconnect();
		};
	}, []);

	return (
		<div
			className={
				`notification ${notification ? "activeNotification" : "unActiveNotification"}` +
				(notificationInfo !== null ? " active" : "")
			}
		>
			<svg
				onClick={() => {
					if (notification) {
						let notRead = notifications?.content
							.filter((item) => item.readDate === null)
							.map((item) => item.notificationId);
						if (notRead.length) {
							ReadNotification(notRead.join(",")).then((res) => {
								if (res.success) {
									setIsActiveSelectHeader(false);
									setNotification(!notification);
									setNotificationInfo(null);
								}
							});
							return;
						}
					}
					setIsActiveSelectHeader(false);
					setNotification(!notification);
				}}
				xmlns="http://www.w3.org/2000/svg"
				width={28}
				height={28}
				fill="none"
			>
				<rect width={28} height={28} fill="#348EF1" fillOpacity={0.1} rx={6} />
				<path
					stroke="#348EF1"
					strokeLinecap="round"
					strokeLinejoin="round"
					strokeWidth={1.5}
					d="M14 6.91c2.76 0 5 1.41 5 4.17 0 1.61.58 3.43 1.19 4.86.5 1.2-.34 2.64-1.64 2.64H9.44c-1.3 0-2.14-1.44-1.64-2.64.61-1.43 1.2-3.25 1.2-4.86 0-2.76 2.23-4.17 5-4.17Zm2.5 11.67v.83c0 1.38-1.12 2.09-2.5 2.09-1.39 0-2.5-.71-2.5-2.09"
				/>
			</svg>
			<div className="notificationItem">
				{notifications?.totalElements > 0 ? (
					notifications?.content.map((item, index) => (
						<div
							className={
								item.readDate === null
									? "notificationItemBlock active"
									: "notificationItemBlock"
							}
							key={index}
						>
							<h3>
								<div className="dote"></div>
								{item.title}
							</h3>
							<p>{item.content}</p>
						</div>
					))
				) : (
					<p className="notMsg">Пока пусто </p>
				)}
				{notifications?.totalElements > 3 && (
					<button
						onClick={() => {
							console.log(limitNotification);
							if (limitNotification.pageSize !== undefined) {
								setLimitNotification({});
							} else {
								setLimitNotification({ pageSize: 3 });
							}
						}}
					>
						{notifications.content.length === 3 ? "смотреть полностью" : "скрыть"}
					</button>
				)}
			</div>
		</div>
	);
};

export default Notification;
