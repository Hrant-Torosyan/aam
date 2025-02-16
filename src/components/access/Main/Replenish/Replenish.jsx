import React, { useContext, useEffect, useState } from "react";
import QRCode from "react-qr-code";
import "./Replenish.scss";
import MainSelect from "../MainSelect/MainSelect";
import MainInput from "../MainInput/MainInput";
import { GetReplenishMinMax, SetReplenish } from "../../../../api/analytics";
import { MainContext } from "../../../../app/App";
import CopyOnClick from "../CopyOnClick";

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
const Replenish = ({ setIsOpenReplenish, walletsData, setSuccessInfo, setIsOpenSc }) => {
	let glData = useContext(MainContext);

	const [currency, setCurrency] = useState(`USTD`);
	const [transaction, setTransaction] = useState(infoes[currency][0]);
	const [sumValue, setSumValue] = useState("");
	const [minMax, setMinMax] = useState(null);
	const [next, setNext] = useState(true);
	const [error, setError] = useState("");
	const [remainingTime, setRemainingTime] = useState(1200);
	const [isActive, setIsActive] = useState(false);
	const [replenishData, setReplenishData] = useState(null);
	const [copied, setCopied] = useState(false);
	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
	};
	useEffect(() => {
		let interval;
		if (isActive) {
			interval = setInterval(() => {
				setRemainingTime((prevTime) => {
					if (prevTime === 0) {
						setIsActive(false);
						clearInterval(interval);
						return 0;
					}
					return prevTime - 1;
				});
			}, 1000);
		}

		return () => clearInterval(interval);
	}, [isActive]);
	const minutes = Math.floor((remainingTime % 3600) / 60);
	const seconds = remainingTime % 60;

	useEffect(() => {
		setTransaction(infoes[currency][0]);
	}, [currency]);

	useEffect(() => {
		if (glData.checkWallet === false && next === false) {
			setIsOpenReplenish(false);
		}
	}, [glData, setIsOpenReplenish, next]);

	useEffect(() => {
		GetReplenishMinMax({ currencyFrom: "usd", currencyTo: transaction.currency }).then((res) => {
			setMinMax({
				maxAmountFrom: res.maxAmountFrom,
				minAmountFrom: res.minAmountFrom,
			});
		});
	}, [transaction]);

	return (
		<>
			<div className="replenish">
				<div className="popUpProdBlock">
					<div className="popUpProdHeader">
						<p>Пополнить</p>
						<button onClick={() => setIsOpenReplenish(false)}>
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
						<>
							{next ? (
								<>
									<MainSelect
										type={"USTD"}
										selectTitle={"Валюта:"}
										selectValue={currency}
										setSelectValue={setCurrency}
									/>
									<MainSelect
										type={false}
										selectTitle={"Сеть транзакции:"}
										selectValue={transaction}
										setSelectValue={setTransaction}
										dataSelect={infoes[currency]}
									/>
									<MainInput
										max={minMax && Math.floor(minMax?.maxAmountFrom)}
										min={minMax && Math.ceil(minMax?.minAmountFrom)}
										setError={setError}
										error={error}
										title={"Сумма пополнения:"}
										sumValue={sumValue}
										setSumValue={setSumValue}
										type={"money"}
									/>
									<div
										onClick={() => {
											let sumAmout = +sumValue.replace(/\s/g, "");

											if (!sumValue.trim()) {
												setError("Заполните поле");
												return;
											} else if (
												+sumAmout < Math.ceil(minMax?.minAmountFrom) ||
												+sumAmout > Math.floor(minMax?.maxAmountFrom)
											) {
												setError("minMax");
												return;
											}

											SetReplenish({
												amount: sumValue,
												currencyFrom: "usd",
												currencyTo: transaction.currency,
											}).then((res) => {
												if (res.paymentStatus) {
													glData.setCheckWallet(true);
													setIsActive(true);
													setNext(false);
													setReplenishData(res);
												} else {
													setIsOpenReplenish(false);

													setSuccessInfo(false);
													setIsOpenSc(true);
												}
											});
										}}
										className="buttonStyleToo"
									>
										<button>
											<span>Пополнить</span>
										</button>
									</div>
								</>
							) : (
								<div className="popUpProdContentQr">
									<div className="popUpProdContentQrBlock">
										<QRCode value={replenishData.payAddress} />
									</div>

									<div className="popUpProdContentQrInfo">
										<div className="popUpProdContentQrInfoItem">
											<p>Для оплаты переведите эту сумму:</p>
											<div className="popUpProdContentQrInfoItemBlock">
												<p>
													{replenishData.payAmount} {replenishData.payCurrency}{" "}
													<span>
														≈ {replenishData.amountReceived}{" "}
														{replenishData.priceCurrency.toUpperCase()}{" "}
													</span>{" "}
												</p>
											</div>
										</div>
										<div className="popUpProdContentQrInfoItem">
											<p>Для оплаты переведите эту сумму:</p>
											<div className="popUpProdContentQrInfoItemBlock">
												<p>{replenishData.payAddress}</p>
												<CopyOnClick text={replenishData.payAddress}>
													<button onClick={handleCopy}>
														{copied ? (
															<svg
																className="coped"
																xmlns="http://www.w3.org/2000/svg"
																width={24}
																height={24}
															>
																<path d="M9 16.17 5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z" />
															</svg>
														) : (
															<svg
																xmlns="http://www.w3.org/2000/svg"
																width={24}
																height={24}
																fill="none"
															>
																<defs>
																	<clipPath id="a">
																		<path
																			fill="#fff"
																			fillOpacity={0}
																			d="M0 0h24v24H0z"
																		/>
																	</clipPath>
																</defs>
																<g clipPath="url(#a)">
																	<path
																		stroke="#96C5F9"
																		strokeLinecap="round"
																		strokeLinejoin="round"
																		strokeWidth={1.5}
																		d="M10.07 7c.31-3.03 1.77-4 5.43-4C19.7 3 21 4.29 21 8.5c0 3.65-.99 5.11-4 5.43M8.5 10c4.2 0 5.5 1.29 5.5 5.5 0 4.2-1.3 5.5-5.5 5.5C4.29 21 3 19.7 3 15.5 3 11.29 4.29 10 8.5 10Z"
																	/>
																</g>
															</svg>
														)}
													</button>
												</CopyOnClick>
											</div>
										</div>
										<div className="timeLine">
											<div className="timeLineItem">
												<div
													style={{
														width: Math.ceil((remainingTime * 100) / 1200) + "%",
													}}
													className="timeLineItemInfo"
												></div>
											</div>
											<div className="timeInfo">
												{minutes}:{seconds}
											</div>
										</div>
									</div>
								</div>
							)}
						</>
					</div>
				</div>
			</div>
		</>
	);
};

export default Replenish;
