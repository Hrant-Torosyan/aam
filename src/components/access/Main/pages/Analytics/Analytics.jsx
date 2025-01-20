import React, { Suspense, lazy, useContext, useEffect, useState } from "react";
import "./Analytics.scss";
import "./ResponsiveAnalytics.scss";
import { MainContext } from "../../../../../app/App";

import { BalanceChart, OperationsList, Wallets } from "../../../../../api/analytics";

const LineChart = lazy(() => import("../../Charts/LineChart/LineChart"));
const DoughnutChart = lazy(() => import("../../Charts/DoughnutChart/DoughnutChart"));
const Check = lazy(() => import("../../Check/Check"));
const Operations = lazy(() => import("../../Operations/Operations"));
const PopUp = lazy(() => import("../../PopUp/PopUp"));
const Select = lazy(() => import("../../Select/Select"));
const PopUpPortfolio = lazy(() => import("../../PopUpPortfolio/PopUpPortfolio"));
const ProdItems = lazy(() => import("../../ProdItems/ProdItems"));
const Transfer = lazy(() => import("../../Transfer/Transfer"));
const IsSuccessful = lazy(() => import("../../IsSuccessful/IsSuccessful"));
const Replenish = lazy(() => import("../../Replenish/Replenish"));
const Send = lazy(() => import("../../Send/Send"));

const colorsArr = [
	"#2ea8ec",
	"#784ceb",
	"#3de1b1",
	"#FF5733",
	"#FFC300",
	"#8E44AD",
	"#F9690E",
	"#1ABC9C",
	"#3498DB",
	"#9B59B6",
	"#16A085",
	"#F39C12",
	"#E74C3C",
	"#2ECC71",
	"#27AE60",
	"#D35400",
	"#C0392B",
	"#2980B9",
	"#E67E22",
	"#7F8C8D",
	"#1F618D",
	"#85C1E9",
	"#D7BDE2",
	"#A9CCE3",
	"#5499C7",
	"#AED6F1",
	"#A3E4D7",
	"#48C9B0",
	"#5DADE2",
	"#76D7C4",
	"#73C6B6",
	"#82E0AA",
	"#ABEBC6",
	"#7DCEA0",
	"#229954",
	"#1E8449",
	"#186A3B",
	"#B7950B",
	"#F7DC6F",
	"#F4D03F",
	"#FAD7A0",
	"#F8C471",
];
const Analytics = () => {
	const [isOpen, setIsOpen] = useState(false);
	const [isOpenTransfer, setIsOpenTransfer] = useState(false);
	const [isOpenReplenish, setIsOpenReplenish] = useState(false);
	const [isOpenSend, setIsOpenSned] = useState(false);
	const [selectValue, setSelectValue] = useState("WEEKLY");
	const [portfolioPopUp, setPortfolioPopUp] = useState(false);
	const [walletsData, setWalletsData] = useState([]);
	const [balanceChartData, setBalanceChartData] = useState([]);
	const [operationsList, setOperationsList] = useState([]);
	const [showOperationsList, setShowOperationsList] = useState(6);
	const [isOpenSc, setIsOpenSc] = useState(false);
	const [successInfo, setSuccessInfo] = useState(true);
	const [refresh, setRefresh] = useState(null);
	const [dateNow, setDateNow] = useState(null);
	let glData = useContext(MainContext);

	// useEffect(() => {
	// 	Wallets().then((res) => {
	// 		setWalletsData(res);
	// 	});
	// 	OperationsList(null, showOperationsList).then((res) => {
	// 		setOperationsList(res);
	// 	});
	// }, [showOperationsList, isOpenSc, refresh, glData.checkPay]);
	// useEffect(() => {
	// 	BalanceChart(selectValue).then((res) => {
	// 		setBalanceChartData(res);
	// 	});
	// }, [selectValue, isOpenSc, refresh, glData.checkPay]);
	useEffect(() => {
		const specificDate = new Date();

		const day = specificDate.getDate().toString().padStart(2, "0");
		const month = (specificDate.getMonth() + 1).toString().padStart(2, "0");
		const year = specificDate.getFullYear();
		const hour = specificDate.getHours().toString().padStart(2, "0");
		const minute = specificDate.getMinutes().toString().padStart(2, "0");

		const formattedDate = `${day}.${month}.${year}, ${hour}:${minute}`;
		setDateNow(formattedDate);
	}, [dateNow, refresh, glData.checkPay]);
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
			{balanceChartData !== null && walletsData !== null && operationsList !== null ? (
				<div className={isOpen ? "analytics hiddenScroll" : "analytics"}>
					{isOpenSc && (
						<IsSuccessful
							setIsOpenTransfer={setIsOpenTransfer}
							info={successInfo}
							delay={5000}
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
					<div className="analyticsTitle">
						<h1>Аналитика</h1>
						<div className="analyticsTitleItem">
							<p>Доходность:</p>
							<div className="percent">+{balanceChartData?.profitability}%</div>
							<Select
								accountType={null}
								selectValue={selectValue}
								setSelectValue={setSelectValue}
							/>
						</div>
					</div>

					<div className="analyticsContent">
						<div className="balance">
							<div className="balanceList">
								<div className="balanceIcon">
									<svg
										width="20"
										height="20"
										viewBox="0 0 16 16"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path
											d="M8 11.3333H8.83333C9.38889 11.3333 10.5 11 10.5 9.66667C10.5 8.33333 9.38889 8 8.83333 8H7.16667C6.61111 8 5.5 7.66667 5.5 6.33333C5.5 5 6.61111 4.66667 7.16667 4.66667H8M8 11.3333H5.5M8 11.3333V13M10.5 4.66667H8M8 4.66667V3M15.5 8C15.5 12.1421 12.1421 15.5 8 15.5C3.85786 15.5 0.5 12.1421 0.5 8C0.5 3.85786 3.85786 0.5 8 0.5C12.1421 0.5 15.5 3.85786 15.5 8Z"
											stroke="#348EF1"
											strokeLinecap="round"
											strokeLinejoin="round"
										/>
									</svg>
								</div>
								<p>
									{dateNow}
									<span
										onClick={() => setRefresh(Math.random() * 333)}
										className="refresh"
									>
										<svg
											width="14"
											height="15"
											viewBox="0 0 14 15"
											fill="none"
											xmlns="http://www.w3.org/2000/svg"
										>
											<path
												d="M1.34012 9.99638C1.77241 11.2233 2.59176 12.2765 3.67472 12.9973C4.75768 13.7181 6.04557 14.0674 7.34435 13.9927C8.64313 13.9179 9.88244 13.4232 10.8755 12.5829C11.8686 11.7426 12.5618 10.6024 12.8504 9.33395C13.1391 8.06554 13.0077 6.73769 12.476 5.55045C11.9443 4.36321 11.0412 3.38091 9.90261 2.75156C8.76407 2.12221 7.45182 1.87989 6.16358 2.06113C3.98861 2.36711 2.55164 3.94355 1 5.33594M1 5.33594V1.33594M1 5.33594H5"
												stroke="#131F37"
												strokeLinecap="round"
												strokeLinejoin="round"
											/>
										</svg>
									</span>
								</p>
							</div>
							<p>Баланс на платформе:</p>
							<p>
								${" "}
								{walletsData
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
							</p>
						</div>
						<LineChart
							balanceChartData={balanceChartData}
							selectValue={selectValue}
							setSelectValue={selectValue}
						/>
						<div className="doughnutChart">
							<div className="doughnutChartTitle">Структура портфеля:</div>
							<DoughnutChart refresh={refresh} colorsArr={colorsArr} count={null} />
							{/* <ProdItems
								colorsArr={colorsArr}
								count={3}
								setPortfolioPopUp={setPortfolioPopUp}
							/> */}
						</div>

						{portfolioPopUp ? (
							<PopUpPortfolio
								colorsArr={colorsArr}
								portfolioPopUp={portfolioPopUp}
								setPortfolioPopUp={setPortfolioPopUp}
							/>
						) : (
							""
						)}

						<div className="analyticsContentMain">
							<Check walletsData={walletsData} isOpen={isOpen} setIsOpen={setIsOpen} />
							<Operations
								count={6}
								showOperationsList={showOperationsList}
								setShowOperationsList={setShowOperationsList}
								operationsArr={operationsList}
							/>
						</div>
					</div>
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

export default Analytics;
