import React from "react";
import "./SelectHeader.scss";
import { logout } from "../../../../api/autorisation";
import { NavLink } from "react-router-dom";

const SelectHeader = ({
	setIsActiveSelectHeader,
	setNotification,
	isActiveSelectHeader,
	userData,
}) => {
	return (
		<div
			onClick={() => {
				setNotification(false);
				setIsActiveSelectHeader(!isActiveSelectHeader);
			}}
			className={
				isActiveSelectHeader ? "profileBlock activeHeader" : "profileBlock unActiveHeader"
			}
		>
			<img src={userData?.image ? userData?.image.url : "./images/avatar.png"} alt="user" />
			<div className="selectHeader">
				<p>{userData && userData.fullName.split(" ")[0]}</p>
				<img src="./images/angle.png" alt="" />
				<div className="selectItem">
					<NavLink to={"/profile"}>
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M20.416 24.5001H7.58268C5.97185 24.5001 4.66602 23.1943 4.66602 21.5835C4.66602 16.8226 11.666 16.9168 13.9993 16.9168C16.3327 16.9168 23.3327 16.8226 23.3327 21.5835C23.3327 23.1943 22.0268 24.5001 20.416 24.5001Z"
								stroke="#0E1A32"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
							<path
								d="M13.9993 12.8333C16.5767 12.8333 18.666 10.744 18.666 8.16667C18.666 5.58934 16.5767 3.5 13.9993 3.5C11.422 3.5 9.33268 5.58934 9.33268 8.16667C9.33268 10.744 11.422 12.8333 13.9993 12.8333Z"
								stroke="#0E1A32"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>
						<span>Мой профиль</span>
					</NavLink>
					<button
						onClick={() => {
							logout();
						}}
					>
						<svg
							width="28"
							height="28"
							viewBox="0 0 28 28"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M16.3333 4.66797L20.4167 4.66797C23.984 4.66797 23.9167 9.33464 23.9167 14.0013C23.9167 18.668 23.984 23.3346 20.4167 23.3346H16.3333M3.5 14.0013L17.5 14.0013M3.5 14.0013L8.16667 9.33464M3.5 14.0013L8.16667 18.668"
								stroke="#E55C5C"
								strokeWidth="1.5"
								strokeLinecap="round"
								strokeLinejoin="round"
							/>
						</svg>

						<span>Выйти</span>
					</button>
				</div>
			</div>
		</div>
	);
};

export default SelectHeader;
