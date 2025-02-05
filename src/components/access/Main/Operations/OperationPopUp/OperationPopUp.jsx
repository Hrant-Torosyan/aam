import React, { useEffect, useState } from "react";
import "./OperationPopUp.scss";
import { OperationsListItem } from "../../../../../api/analytics";
function formatDate(milliseconds) {
	const date = new Date(milliseconds);
	const options = {
		hour: "2-digit",
		minute: "2-digit",
		second: "2-digit",
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	const formattedDate = new Intl.DateTimeFormat("ru-RU", options).format(date);
	return formattedDate;
}
let infoes = {
	USTD: [
		{
			min_amount: 8,
			max_amount: 2886,
			currency: "usdcmatic",
			name: "Matic Network",
		},
		{
			min_amount: 9,
			max_amount: 579,
			currency: "usddbsc",
			name: "Arbitrum Network",
		},

		{
			min_amount: 10,
			max_amount: 76798,
			currency: "usdttrc20",
			name: "TRON Network",
		},
		{
			min_amount: 11,
			max_amount: 76798,
			currency: "usdterc20",
			name: "Ethereum Network",
		},
		{
			min_amount: 9,
			max_amount: 23089,
			currency: "usdtbsc",
			name: "Binance Smart Chain Network",
		},
		{
			min_amount: 69,
			max_amount: 16072,
			currency: "usdtsol",
			name: "Solana Network",
		},
		{
			min_amount: 8,
			max_amount: 2889,
			currency: "usdtalgo",
			name: "Algorand Network",
		},
	],
	BTC: [
		{
			min_amount: 0.0001783,
			max_amount: 1.26359284,
			currency: "btc",
			name: "Bitcoin",
		},
	],
	ETH: [
		{
			min_amount: 1,
			max_amount: 26,
			currency: "eth",
			name: "ETH",
		},
		{
			min_amount: 0.0031139,
			max_amount: 5,
			currency: "ethbsc",
			name: "ETHBSC",
		},
		{
			min_amount: 0.0029608,
			max_amount: 0.85378951,
			currency: "etharb",
			name: "ETHArb",
		},
	],
};
const OperationPopUp = ({ setIsactive, operationId }) => {
	const [operationData, setOperationData] = useState(null);
	const [operationWallet, setOperationWallet] = useState(null);
	useEffect(() => {
		OperationsListItem(operationId).then((res) => {
			setOperationData(res);
		});
	}, [operationId]);

	useEffect(() => {
		if (operationData?.type === "DEPOSITS") {
			setOperationWallet(
				infoes.ETH.findIndex((item) => item.currency === operationData?.depositCurrencyFrom) >=
					0
					? "ETH"
					: infoes.BTC.findIndex(
							(item) => item.currency === operationData?.depositCurrencyFrom
					  ) >= 0
					? "BTC"
					: "USTD"
			);
		} else if (operationData?.type === "WITHDRAWALS") {
			setOperationWallet(
				infoes.ETH.findIndex(
					(item) => item.currency === operationData?.withdrawalCurrencyFrom
				) >= 0
					? "ETH"
					: infoes.BTC.findIndex(
							(item) => item.currency === operationData?.withdrawalCurrencyFrom
					  ) >= 0
					? "BTC"
					: "USTD"
			);
		}
	}, [operationData]);
	return (
		<>
			{operationData && (
				<div className="operationPopUp">
					<div className="popUpProdBlock">
						<div className="popUpProdHeader">
							<p>Детали операции</p>
							<button onClick={() => setIsactive(false)}>
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
						<div className="popUpProdContent">
							<div className="operationPopUpTitle">
								<p>
									{operationData.type === "DIVIDEND_PAYMENT"
										? `Выплата по дивидендам проекта “${operationData.projectTitle}” за ${
												operationData.projectTerm
										  } ${
												operationData.projectPeriod === "MONTHLY"
													? "месяц"
													: operationData.projectPeriod === "QUARTERLY"
													? "квартал"
													: "полугодоа"
										  }`
										: operationData.type === "PROJECT_INVEST"
										? `Инвестиция “${operationData.projectTitle}”`
										: operationData.type === "PROJECT_DELETE"
										? `${operationData.projectTitle} проект отменен`
										: operationData.type === "TRANSFER_BETWEEN_WALLETS"
										? "Внутренний перевод по счетами"
										: operationData.type === "TRANSFER_BETWEEN_USERS_WALLETS"
										? "Выплата средств на внешний кошелек из инвестиционного счета"
										: operationData.type === "WITHDRAWALS"
										? "Вывод средств из основного счета"
										: operationData.type === "DEPOSITS"
										? "Пополнения основного  счета"
										: `${
												operationData.type === "PROJECT_PURCHASE_COMMISSION"
													? "Комиссия при покупке"
													: operationData.type === "PROJECT_MANAGEMENT_COMMISSION"
													? "Комиссия за управление"
													: operationData.type === "PROJECT_PROFIT_COMMISSION"
													? "Комиссия с прибыли"
													: operationData.type === "PROJECT_WITHDRAWAL_COMMISSION"
													? "Комиссия за вывод"
													: ""
										  }`}
								</p>
								<div
									className={
										operationData.status === "DONE"
											? "done"
											: operationData.status === "IN_PROCESS"
											? "progress"
											: "failed"
									}
								>
									<span>
										{operationData.status === "DONE"
											? "Выполнено"
											: operationData.status === "IN_PROCESS"
											? "В процессе"
											: "Неуспешно"}
									</span>
								</div>
							</div>
							<div className="operationPopUpTitle">
								<p>
									Время транзакции: <span> {formatDate(+operationData.date)}</span>
								</p>
								<h3>
									Сумма транзакции: <span>${operationData.amount}</span>
								</h3>
							</div>

							{operationData.type === "WITHDRAWALS" && (
								<>
									<div className="operationPopUpInfo">
										<p>Счет списания: </p>
										<div className="operationPopUpInfoItem">
											{" "}
											{operationData.operationFrom === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationFrom === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Источник пополнения: </p>
										<div className="operationPopUpInfoItem type">
											<div className="mainSelectItemTypeItem">
												<div className="typeInfo">
													<img src={`./images/${operationWallet}.png`} alt="" />
													<div className="typeInfoItem">
														<h3>
															{operationWallet === "BTC"
																? "Bitcoin"
																: operationWallet === "USTD"
																? "Tether"
																: "Ethereum"}
														</h3>
														<p>#{operationWallet}</p>
													</div>
												</div>
												<p>{operationData.withdrawalAddress}</p>
											</div>
										</div>
									</div>
								</>
							)}

							{operationData.type === "DEPOSITS" && (
								<>
									<div className="operationPopUpInfo">
										<p>Счет списания: </p>
										<div className="operationPopUpInfoItem type">
											<div className="mainSelectItemTypeItem">
												<div className="typeInfo">
													<img src={`./images/${operationWallet}.png`} alt="" />
													<div className="typeInfoItem">
														<h3>
															{operationWallet === "BTC"
																? "Bitcoin"
																: operationWallet === "USTD"
																? "Tether"
																: "Ethereum"}
														</h3>
														<p>#{operationWallet}</p>
													</div>
												</div>
												<p>{operationData.depositAddress}</p>
											</div>
										</div>
									</div>

									<div className="operationPopUpInfo">
										<p>Счет пополнения:</p>
										<div className="operationPopUpInfoItem">
											{" "}
											{operationData.operationTo === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationTo === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
								</>
							)}

							{operationData.type === "TRANSFER_BETWEEN_WALLETS" && (
								<>
									<div className="operationPopUpInfo">
										<p>Счет списания: </p>
										<div className="operationPopUpInfoItem">
											{operationData.operationFrom === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationFrom === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Счет пополнения: </p>
										<div className="operationPopUpInfoItem">
											{operationData.operationTo === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationTo === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
								</>
							)}

							{operationData.type === "PROJECT_INVEST" && (
								<>
									<div className="operationPopUpInfo">
										<p>Счет списания: </p>
										<div className="operationPopUpInfoItem">
											{operationData.operationFrom === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationFrom === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Проект: </p>
										<div className="operationPopUpInfoItem">
											{operationData.projectTitle}
										</div>
									</div>
								</>
							)}
							{operationData.type === "PROJECT_DELETE" && (
								<>
									<div className="operationPopUpInfo">
										<p>Проект: </p>
										<div className="operationPopUpInfoItem">
											{operationData.projectTitle}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Счет пополнения: </p>
										<div className="operationPopUpInfoItem">
											{operationData.operationTo === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationTo === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
								</>
							)}
							{operationData.type === "DIVIDEND_PAYMENT" && (
								<>
									<div className="operationPopUpInfo">
										<p>Проект: </p>
										<div className="operationPopUpInfoItem">
											{operationData.projectTitle}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Счет пополнения: </p>
										<div className="operationPopUpInfoItem">
											{operationData.operationTo === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationTo === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
								</>
							)}

							{operationData.type === "TRANSFER_BETWEEN_USERS_WALLETS" && (
								<>
									<div className="operationPopUpInfo">
										<p>
											{operationData.toUserId === null
												? "Счет пополнения:"
												: "Счет списания:"}
										</p>
										<div className="operationPopUpInfoItem">
											{operationData.toUserId === null
												? operationData.operationTo === "MASTER_ACCOUNT"
													? "Основной счет"
													: operationData.operationTo === "INVESTMENT_ACCOUNT"
													? "Инвестиционный счет"
													: "Агентский счет"
												: operationData.operationFrom === "MASTER_ACCOUNT"
												? "Основной счет"
												: operationData.operationFrom === "INVESTMENT_ACCOUNT"
												? "Инвестиционный счет"
												: "Агентский счет"}
										</div>
									</div>
									<div className="operationPopUpInfo">
										<p>
											{operationData.toUserId === null ? "Отправитель:" : "Получатель:"}
										</p>
										<div className="operationPopUpInfoItem">
											ID:{" "}
											{operationData.toUserId === null
												? operationData.fromUserId
												: operationData.toUserId}
										</div>
									</div>
								</>
							)}

							{operationData.type === "PROJECT_PURCHASE_COMMISSION" ||
							operationData.type === "PROJECT_MANAGEMENT_COMMISSION" ||
							operationData.type === "PROJECT_PROFIT_COMMISSION" ||
							operationData.type === "PROJECT_WITHDRAWAL_COMMISSION" ? (
								<>
									<div className="operationPopUpInfo">
										<p>Счет списания: </p>
										<div className="operationPopUpInfoItem">Инвестиционный счет</div>
									</div>
									<div className="operationPopUpInfo">
										<p>Проект: </p>
										<div className="operationPopUpInfoItem">
											{operationData.projectTitle}
										</div>
									</div>
								</>
							) : (
								""
							)}
						</div>
					</div>
				</div>
			)}
		</>
	);
};

export default OperationPopUp;
