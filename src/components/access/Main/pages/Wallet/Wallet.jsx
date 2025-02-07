import React, { Suspense, useContext, useEffect, useState } from "react";
import "./Wallet.scss";
import Check from "../../Check/Check";
import PopUp from "../../PopUp/PopUp";
import Operations from "../../Operations/Operations";
import { OperationsList, Wallets } from "../../../../../api/analytics";
import IsSuccessful from "../../IsSuccessful/IsSuccessful";
import Transfer from "../../Transfer/Transfer";
import Replenish from "../../Replenish/Replenish";
import Send from "../../Send/Send";
import { MainContext } from "../../../../../app/App";

const Wallet = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenTransfer, setIsOpenTransfer] = useState(false);
	const [isOpenReplenish, setIsOpenReplenish] = useState(false);
	const [isOpenSend, setIsOpenSned] = useState(false);
	const [walletsData, setWalletsData] = useState(null);
	const [operationsList, setOperationsList] = useState(null);
	const [showOperationsList, setShowOperationsList] = useState(6);
	const [isOpenSc, setIsOpenSc] = useState(false);
	const [successInfo, setSuccessInfo] = useState(true);
	let glData = useContext(MainContext);

	useEffect(() => {
		Wallets().then((res) => {
			setWalletsData(res);
		});
		OperationsList(null, showOperationsList).then((res) => {
			setOperationsList(res);
		});
	}, [showOperationsList, isOpenSc, glData.checkPay]);

	return (
		<Suspense
			fallback={
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			}
		>
			{walletsData !== null && operationsList !== null ? (
				<div className={isOpen ? "wallet hiddenScroll" : "wallet"}>
					{isOpenSc && (
						<IsSuccessful
							setIsOpenTransfer={setIsOpenTransfer}
							info={successInfo}
							delay={1000}
							setIsOpen={setIsOpenSc}
						/>
					)}
					{isOpen && (
						<PopUp
							isOpenTransfer={isOpenTransfer}
							setIsOpenTransfer={setIsOpenTransfer}
							walletsData={walletsData}
							isOpen={isOpen}
							setIsOpen={setIsOpen}
							setIsOpenReplenish={setIsOpenReplenish}
							setIsOpenSned={setIsOpenSned}
						/>
					)}
					{isOpenReplenish && (
						<Replenish
							setIsOpenSc={setIsOpenSc}
							setSuccessInfo={setSuccessInfo}
							walletsData={walletsData}
							setIsOpenReplenish={setIsOpenReplenish}
						/>
					)}
					{isOpenSend && (
						<Send
							setIsOpenSc={setIsOpenSc}
							setSuccessInfo={setSuccessInfo}
							walletsData={walletsData}
							setIsOpenSned={setIsOpenSned}
						/>
					)}
					{isOpenTransfer &&
						walletsData &&
						walletsData?.masterAccount +
							walletsData?.investmentAccount +
							walletsData?.agentAccount >
							0 && (
							<Transfer
								setIsOpenSc={setIsOpenSc}
								setSuccessInfo={setSuccessInfo}
								walletsData={walletsData}
								setIsOpenTransfer={setIsOpenTransfer}
							/>
						)}

					<div className="walletTitle">
						<h1>Кошелек</h1>
						<div className="walletButtons">
							<div className="walletBalance">
								${" "}
								{walletsData?.masterAccount
									? parseFloat(
											(
												walletsData?.masterAccount +
												walletsData?.investmentAccount +
												walletsData?.agentAccount
											)
												.toString()
												.replace(/[^\d.-]/g, "")
									  ).toLocaleString()
									: 0}
							</div>
							<div onClick={() => setIsOpenReplenish(true)} className="walletButton">
								<button>
									<p>Пополнить</p>
								</button>
							</div>
							<div onClick={() => setIsOpenTransfer(true)} className="walletButton">
								<button>
									<p>Перевести</p>
								</button>
							</div>
							<div onClick={() => setIsOpenSned(true)} className="walletButton">
								<button>
									<p>Отправить</p>
								</button>
							</div>
						</div>
					</div>

					<Check walletsData={walletsData} isOpen={isOpen} setIsOpen={setIsOpen} />
					<Operations
						count={6}
						showOperationsList={showOperationsList}
						setShowOperationsList={setShowOperationsList}
						operationsArr={operationsList}
					/>
				</div>
			) : (
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			)}
		</Suspense>
	);
};

export default Wallet;
