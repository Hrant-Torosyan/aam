import React, { useEffect, useState } from "react";
import "./Transfer.scss";
import MainSelect from "../MainSelect/MainSelect";
import MainInput from "../MainInput/MainInput";
import { SetTransfer } from "../../../../api/analytics";
const Transfer = ({ setIsOpenTransfer, walletsData, setSuccessInfo, setIsOpenSc }) => {
	const [from, setFrom] = useState(
		`Основной счет: <span>$ ${parseFloat(
			(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
		).toLocaleString()}</span>`
	);
	const [to, setTo] = useState(
		`Инвестиционный счет: <span>$ ${parseFloat(
			(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
		).toLocaleString()}</span>`
	);
	const [sumValue, setSumValue] = useState("");
	const [error, setError] = useState("");
	useEffect(() => {
		if (from === to) {
			setTo(
				[
					`Основной счет: <span>$ ${parseFloat(
						(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
					).toLocaleString()}</span>`,
					`Инвестиционный счет: <span>$ ${parseFloat(
						(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
					).toLocaleString()}</span>`,
					`Агентский счет: <span>$ ${parseFloat(
						(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
					).toLocaleString()}</span>`,
				].filter((item) => item !== from)[0]
			);
		}
	}, [from, to, walletsData]);

	return (
		<>
			<div className="Transfer">
				<div className="popUpProdBlock">
					<div className="popUpProdHeader">
						<p>Перевести</p>
						<button onClick={() => setIsOpenTransfer(false)}>
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
								selectTitle={"Из счета:"}
								selectValue={from}
								setSelectValue={setFrom}
								dataSelect={[
									`Основной счет: <span>$ ${parseFloat(
										(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
									`Инвестиционный счет: <span>$ ${parseFloat(
										(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
									`Агентский счет: <span>$ ${parseFloat(
										(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
								]}
							/>
							<MainSelect
								type={false}
								selectTitle={"На счет:"}
								selectValue={to}
								setSelectValue={setTo}
								dataSelect={[
									`Основной счет: <span>$ ${parseFloat(
										(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
									`Инвестиционный счет: <span>$ ${parseFloat(
										(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
									`Агентский счет: <span>$ ${parseFloat(
										(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
									).toLocaleString()}</span>`,
								].filter((item) => item !== from)}
							/>
							<MainInput
								setError={setError}
								error={error}
								title={"Сумма:"}
								sumValue={sumValue}
								setSumValue={setSumValue}
								type={"money"}
							/>
							<div
								onClick={() => {
									let sumAmout = +sumValue.replace(/\s/g, "");
									let fromAccountInfo =
										from ===
										`Основной счет: <span>$ ${parseFloat(
											(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
										).toLocaleString()}</span>`
											? "masterAccount"
											: from ===
											  `Инвестиционный счет: <span>$ ${parseFloat(
													(walletsData?.investmentAccount)
														.toString()
														.replace(/[^\d.-]/g, "")
											  ).toLocaleString()}</span>`
											? "investmentAccount"
											: "agentAccount";
									if (!sumValue.trim() || sumAmout > walletsData[fromAccountInfo]) {
										setError("Заполните поле");
										return;
									}

									SetTransfer({
										fromAccount:
											from ===
											`Основной счет: <span>$ ${parseFloat(
												(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
											).toLocaleString()}</span>`
												? "MASTER"
												: from ===
												  `Инвестиционный счет: <span>$ ${parseFloat(
														(walletsData?.investmentAccount)
															.toString()
															.replace(/[^\d.-]/g, "")
												  ).toLocaleString()}</span>`
												? "INVESTMENT"
												: "AGENT",
										toAccount:
											to ===
											`Основной счет: <span>$ ${parseFloat(
												(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
											).toLocaleString()}</span>`
												? "MASTER"
												: to ===
												  `Инвестиционный счет: <span>$ ${parseFloat(
														(walletsData?.investmentAccount)
															.toString()
															.replace(/[^\d.-]/g, "")
												  ).toLocaleString()}</span>`
												? "INVESTMENT"
												: "AGENT",
										amount: sumAmout,
									}).then((res) => {
										if (res.success) {
											setSuccessInfo(true);
										} else {
											setSuccessInfo(false);
										}
										setIsOpenTransfer(false);
										setIsOpenSc(true);
									});
								}}
								className="buttonStyleToo"
							>
								<button>
									<span>Перевести</span>
								</button>
							</div>
						</>
					</div>
				</div>
			</div>
		</>
	);
};

export default Transfer;
