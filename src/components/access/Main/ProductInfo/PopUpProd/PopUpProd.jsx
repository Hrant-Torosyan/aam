import React, { useState } from "react";
import "./PopUpProd.scss";
import MainSelect from "../../MainSelect/MainSelect";
import MainInput from "../../MainInput/MainInput";
import { AddBriefcaseProducts } from "../../../../../api/briefcase";
const PopUpProd = ({ popUpProd, setPopUpProd, mainData, setSuccessInfo, setIsOpenSc }) => {
	let periodArr = mainData?.paymentPeriods.map((item) => {
		if (item === "MONTHLY") {
			return "Ежемесячные";
		}
		if (item === "QUARTERLY") {
			return "Поквартальные";
		}
		if (item === "SEMI_ANNUAL") {
			return "Полугодовые";
		}
		return null;
	});
	const [selectValue, setSelectValue] = useState(periodArr[0]);
	const [sumValue, setSumValue] = useState("");
	const [countValue, setCountValue] = useState("");
	const [error, setError] = useState("");
	let amountValueHelper =
		selectValue === "Поквартальные" ? 3 : selectValue === "Полугодовые" ? 6 : 1;

	return (
		<div className="popUpProd">
			<div className="popUpProdBlock">
				<div className="popUpProdHeader">
					<p>Инвестировать</p>
					<button onClick={() => setPopUpProd(false)}>
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
					{popUpProd === "start" ? (
						<>
							<MainInput
								error={error}
								setError={setError}
								title={"Сумма инвестирования:"}
								sumValue={sumValue}
								setSumValue={setSumValue}
								type={"money"}
								min={mainData.minPrice}
								max={mainData.maxPrice}
							/>
							<MainSelect
								type={false}
								selectTitle={"Период выплат"}
								selectValue={selectValue}
								setSelectValue={setSelectValue}
								dataSelect={periodArr}
							/>

							<h4>
								Ваша доход за {selectValue.toLocaleLowerCase()} составит:{" "}
								<span>
									$
									{Math.floor(
										sumValue.replace(/\s/g, "") *
											(mainData.profit / 100) *
											amountValueHelper
									)}
								</span>
							</h4>
							<div className="buttonStyleToo">
								<button
									onClick={() => {
										let sumAmout = sumValue.replace(/\s/g, "");
										if (!sumAmout.trim()) {
											setError("Заполните поле");
											return;
										} else if (
											+sumAmout < mainData.minPrice ||
											+sumAmout > mainData.maxPrice
										) {
											setError("minMax");
											return;
										}
										setCountValue(Math.floor(sumAmout / mainData.price));
										setPopUpProd("finish");
									}}
								>
									<span>Инвестировать</span>
								</button>
							</div>
						</>
					) : (
						<>
							<div className="popUpProdContentInfo">
								<div className="popUpProdContentInfolist">
									<h4>
										Цена за единицу:{" "}
										<span>
											$
											{parseFloat(
												mainData.price.toString().replace(/[^\d.-]/g, "")
											).toLocaleString()}
										</span>
									</h4>
									<h4>
										Сумма инвестиций: <span>${sumValue}</span>
									</h4>
								</div>
								<div className="popUpProdContentInfolist">
									<h4>
										Мин.сумма:{" "}
										<span>
											$
											{parseFloat(
												mainData.minPrice.toString().replace(/[^\d.-]/g, "")
											).toLocaleString()}
										</span>
									</h4>
									<h4>
										Макс.сумма:{" "}
										<span>
											$
											{parseFloat(
												mainData.maxPrice.toString().replace(/[^\d.-]/g, "")
											).toLocaleString()}
										</span>
									</h4>
								</div>
								<div className="popUpProdContentInfolist">
									<h4>
										Комиссия: <span>{mainData.withdrawalCommission}%</span>
									</h4>
									<h4>
										Срок: <span>{mainData.term} год</span>
									</h4>
								</div>
							</div>
							<MainInput
								error={error}
								setError={setError}
								title={"Количество акций"}
								sumValue={countValue}
								setSumValue={setCountValue}
								sumValueAmount={sumValue}
								setSumValueAmount={setSumValue}
								type={false}
								onePrice={mainData.price}
								// min={"1000"}
								// max={"12000"}
							/>
							<h4>
								Итого:{" "}
								<span>
									$
									{Math.round(
										+sumValue.replace(/\s/g, "") +
											sumValue.replace(/\s/g, "") * (mainData.purchaseCommission / 100) +
											sumValue.replace(/\s/g, "") * (mainData.managementCommission / 100)
									)}
								</span>
							</h4>
							<div className="buttonStyleToo">
								<button
									onClick={() => {
										let sumCount = countValue.toString();
										let sumAmout = sumValue.replace(/\s/g, "");

										if (!sumCount.trim()) {
											setError("Заполните поле");
											return;
										} else if (
											+sumAmout < mainData.minPrice ||
											+sumAmout > mainData.maxPrice
										) {
											setError("Заполните поле");
											return;
										}

										AddBriefcaseProducts(mainData.projectId, {
											amount: Math.round(
												+sumAmout +
													sumAmout * (mainData.purchaseCommission / 100) +
													sumAmout * (mainData.managementCommission / 100)
											),
											period:
												selectValue === "Ежемесячные"
													? "MONTHLY"
													: selectValue === "Поквартальные"
													? "QUARTERLY"
													: "SEMI_ANNUAL",
											term: mainData.term,
											sharesCount: +sumCount,
											purchaseCommission: mainData.purchaseCommission,
											profitCommission: mainData.profitCommission,
											withdrawalCommission: mainData.withdrawalCommission,
											managementCommission: mainData.managementCommission,
										}).then((res) => {
											if (res.success) {
												setSuccessInfo(true);
												setPopUpProd(false);
												setIsOpenSc(true);
											} else {
												setSuccessInfo(false);
												setPopUpProd(false);
												setIsOpenSc(true);
											}
										});
									}}
								>
									<span>Инвестировать</span>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PopUpProd;
