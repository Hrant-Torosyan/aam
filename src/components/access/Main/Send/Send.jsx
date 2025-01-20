import React, { useEffect, useState } from "react";
import "./Send.scss";
import MainSelect from "../MainSelect/MainSelect";
import MainInput from "../MainInput/MainInput";
import { SetSendUser, SetSendWallet } from "../../../../api/analytics";

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
const Send = ({ setIsOpenSned, walletsData, setSuccessInfo, setIsOpenSc }) => {
	const [from, setFrom] = useState(
		`Основной счет: <span>$ ${
			walletsData?.masterAccount
				? parseFloat(
						(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
				  ).toLocaleString()
				: 0
		}</span>`
	);
	const [sumValue, setSumValue] = useState("");
	const [user, setUser] = useState(true);
	const [isUserSel, setIsUserSel] = useState(false);
	const [error, setError] = useState("");
	const [sendInfo, setSendInfo] = useState("");

	const [errorUser, setErrorUser] = useState("");

	const [currency, setCurrency] = useState(`USTD`);
	const [transaction, setTransaction] = useState(infoes[currency][0]);

	useEffect(() => {
		setTransaction(infoes[currency][0]);
	}, [currency]);
	return (
		<>
			<div className="send">
				<div className="popUpProdBlock">
					<div className="popUpProdHeader">
						<p>Отправить</p>
						<button onClick={() => setIsOpenSned(false)}>
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
							<MainSelect
								type={false}
								selectTitle={"Счет:"}
								selectValue={from}
								setSelectValue={setFrom}
								dataSelect={[
									`Основной счет: <span>$ ${parseFloat(
										(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
									// `Инвестиционный счет: <span>$ ${parseFloat(
									// 	(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
									// ).toLocaleString()}</span>`,
									// `Агентский счет: <span>$ ${parseFloat(
									// 	(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
									// ).toLocaleString()}</span>`,
								]}
							/>

							<p className="selectTitle">{user ? "Пользователь" : "Кошелек"}:</p>
							<div
								className={
									isUserSel
										? "mainSelect mainSelectSend activeSl"
										: "mainSelect mainSelectSend" + (errorUser ? " errSend" : "")
								}
							>
								<div className="mainSelectSendInfo">
									<p>{user ? "ID" : "AD"}</p>
									<input
										value={sendInfo}
										onChange={(e) => {
											setErrorUser("");
											setSendInfo(e.target.value);
										}}
										type="text"
									/>
								</div>

								<img
									onClick={() => setIsUserSel(!isUserSel)}
									src="./images/angle.png"
									alt=""
								/>
								<div className="mainSelectItem">
									<div
										className={user === false ? "active" : ""}
										onClick={() => {
											setIsUserSel(false);
											setUser(false);
										}}
									>
										<p>Кошелек:</p>
									</div>
									<div
										className={user === true ? "active" : ""}
										onClick={() => {
											setIsUserSel(false);

											setUser(true);
										}}
									>
										<p>Пользователь</p>
									</div>
								</div>
							</div>

							{!user && (
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
								</>
							)}

							<MainInput
								setError={setError}
								error={error}
								title={"Сумма перевода:"}
								sumValue={sumValue}
								setSumValue={setSumValue}
								type={"money"}
							/>
							<div
								onClick={() => {
									let sumAmout = +sumValue.replace(/\s/g, "");

									if (!sendInfo.trim()) {
										setErrorUser("Заполните поле");
										return;
									}
									if (!sumValue.trim() || sumAmout > walletsData?.masterAccount) {
										setError("Заполните поле");
										return;
									}
									console.log(sumAmout);
									console.log(user);
									console.log(sendInfo);
									if (user) {
										SetSendUser({
											outerUserId: sendInfo,
											amount: sumAmout,
										}).then((res) => {
											if (res.success) {
												setIsOpenSned(false);
												setSuccessInfo(true);
												setIsOpenSc(true);
											} else {
												setIsOpenSned(false);
												setSuccessInfo(false);
												setIsOpenSc(true);
											}
										});
									} else {
										SetSendWallet({
											currencyFrom: "usd",
											currencyTo: transaction.currency,
											amount: sumAmout,
											address: sendInfo,
										}).then((res) => {
											console.log(res);
											if (res.success) {
												setIsOpenSned(false);
												setSuccessInfo(true);
												setIsOpenSc(true);
											} else {
												setIsOpenSned(false);
												setSuccessInfo(false);
												setIsOpenSc(true);
											}
										});
									}
								}}
								className="buttonStyleToo"
							>
								<button>
									<span>Отправить</span>
								</button>
							</div>
						</>
					</div>
				</div>
			</div>
		</>
	);
};

export default Send;
