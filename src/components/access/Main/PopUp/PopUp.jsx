import React, { useEffect, useState } from "react";
import LineChart from "../Charts/LineChart/LineChart";
import "./PopUp.scss";
import Operations from "../Operations/Operations";
import { BalanceChart, OperationsList } from "../../../../api/analytics";

const PopUp = ({ isOpen, setIsOpen, setIsOpenTransfer, setIsOpenReplenish, setIsOpenSned }) => {
	const [popUpSelect, setPopUpSelect] = useState("WEEKLY");
	const [operationlistItem, setOperationlistItem] = useState(null);
	const [showOperationsList, setShowOperationsList] = useState(3);
	const [balanceChartData, setBalanceChartData] = useState(null);

	useEffect(() => {
		OperationsList(isOpen.info, showOperationsList).then((res) => {
			setOperationlistItem(res);
		});
	}, [showOperationsList, isOpen]);

	useEffect(() => {
		BalanceChart(popUpSelect, isOpen.info).then((res) => {
			setBalanceChartData(res);
		});
	}, [popUpSelect, isOpen.info]);

	return (
		<div className="popup">
			<div className="popupBlock">
				{operationlistItem ? (
					<>
						<div className="popupHeader">
							<p>{isOpen.type}</p>
							<button onClick={() => setIsOpen(false)}>
								<svg
									width="30"
									height="30"
									viewBox="0 0 30 30"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20.8366 9.17188L9.16992 20.8386M9.16995 9.17188L20.8366 20.8386"
										stroke="#00B4D2"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</button>
						</div>
						<div className="popupContent">
							<div className="popupContentList">
								<div className="popupContentListInfo">
									<p>
										Баланс: <span>${isOpen.balance}</span>
									</p>
									<p>
										Доля от общего баланса: <span>{isOpen.perceent}%</span>
									</p>
									<p>
										Кол-во операций за месяц:{" "}
										<span>{operationlistItem.operationsCount}</span>
									</p>
								</div>
								<Operations
									count={3}
									showOperationsList={showOperationsList}
									setShowOperationsList={setShowOperationsList}
									operationsArr={operationlistItem}
								/>
							</div>
							<LineChart
								infoPopUp={"popUp"}
								selectValue={popUpSelect}
								setSelectValue={setPopUpSelect}
								balanceChartData={balanceChartData}
								color={isOpen.color}
								bg={isOpen.bg}
							/>
							<Operations
								count={3}
								showOperationsList={showOperationsList}
								setShowOperationsList={setShowOperationsList}
								operationsArr={operationlistItem}
							/>

							<div className="popupContentList">
								<div
									onClick={() => {
										setIsOpen(false);
										setIsOpenReplenish(true);
									}}
									className="popupContentButton"
								>
									<button>
										<p>Пополнить</p>
									</button>
								</div>
								{isOpen.info === "MASTER" && (
									<div
										onClick={() => {
											setIsOpen(false);
											setIsOpenSned(true);
										}}
										className="popupContentButton"
									>
										<button>
											<p>Отправить</p>
										</button>
									</div>
								)}

								<div
									onClick={() => {
										setIsOpen(false);
										setIsOpenTransfer(true);
									}}
									className="popupContentButton"
								>
									<button>
										<p>Перевести</p>
									</button>
								</div>
							</div>
						</div>
					</>
				) : (
					<div className="loader">
						<img
							src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
							alt="loader"
						/>
					</div>
				)}
			</div>
		</div>
	);
};

export default PopUp;

// return (
// 	<div className="popup">
// 		<div className="popupBlock">
// 			<div className="popupHeader">
// 				<p>{isOpen.type}</p>
// 				<button onClick={() => setIsOpen(false)}>
// 					<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
// 						<path d="M20.8366 9.17188L9.16992 20.8386M9.16995 9.17188L20.8366 20.8386" stroke="#00B4D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
// 					</svg>
// 				</button>
// 			</div>
// 			<div className="popupContent">
// 				<div className="popupContentList">
// 					<div className="popupContentListInfo">
// 						<p>
// 							Баланс: <span>${isOpen.balance}</span>
// 						</p>
// 						<p>
// 							Доля от общего баланса: <span>{isOpen.perceent}%</span>
// 						</p>
// 						<p>
// 							Кол-во операций за месяц: <span>{operationlistItem?.operationsCount}</span>
// 						</p>
// 					</div>
// 					<Operations count={4} showOperationsList={showOperationsList} setShowOperationsList={setShowOperationsList} operationsArr={operationlistItem} />
// 				</div>
// 				<LineChart infoPopUp={"popUp"} selectValue={popUpSelect} setSelectValue={setPopUpSelect} color={isOpen.color} bg={isOpen.bg} />
// 				<div className="popupContentList">
// 					<div className="popupContentButton">
// 						<button>
// 							<p>Пополнить</p>
// 						</button>
// 					</div>
// 					<div className="popupContentButton">
// 						<button>
// 							<p>Перевести</p>
// 						</button>
// 					</div>
// 					<div className="popupContentButton">
// 						<button>
// 							<p>Отправить</p>
// 						</button>
// 					</div>
// 				</div>
// 			</div>
// 		</div>
// 	</div>
// );
