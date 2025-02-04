import React, { useState, useEffect } from "react";
import "./PopupProdNew.scss";
import MainInput from "../../MainInput/MainInput";
import { AddBriefcaseProducts } from "../../../../../api/briefcase";
import bannerLogo from "../../../../svg/bannerLogo.svg";
import pdfImg from "../../../../svg/pdf.svg";
import { Wallets } from "../../../../../api/analytics";

const PopUpProdNew = ({ popUpProdNew, setPopUpProdNew, mainData, setSuccessInfo, setIsOpenSc }) => {
	const [sumValue, setSumValue] = useState("");
	const [errors, setErrors] = useState({});
	const [visibleCount, setVisibleCount] = useState(2);
	const [isChecked, setIsChecked] = useState(false);
	const [walletsData, setWalletsData] = useState([]);

	const fetchWalletData = async () => {
		try {
			const res = await Wallets();
			setWalletsData(res);
		} catch (error) {
			console.error("Error fetching wallets data:", error);
		}
	};

	useEffect(() => {
		fetchWalletData();
	}, []);

	const handleShowMore = () => {
		setVisibleCount(mainData.documents.length);
	};

	const validateForm = () => {
		const newErrors = {};
		const formattedSum = sumValue ? +sumValue.replace(/\s/g, "") : 0;

		if (!isChecked) {
			newErrors.checkboxError = "Необходимо согласиться с условиями.";
		}

		if (formattedSum < mainData.minPrice || formattedSum > mainData.maxPrice) {
			newErrors.rangeError = "Введенная сумма превышает максимально допустимую. Пожалуйста, введите сумму, которая не больше " + mainData.maxPrice;		}

		const parsedInvestmentAmount = parseFloat(mainData.investmentAmount);
		if (formattedSum > parsedInvestmentAmount) {
			newErrors.balanceError = "Недостаточно средств для инвестиции.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

	const investmentAmount = walletsData?.investmentAccount || 0;
	console.log(investmentAmount, 'investmentAmount');

	const handleConfirmClick = async () => {
		if (investmentAmount <= 0) {
			setErrors({ balanceError: "Баланс недоступен для инвестиций." });
			return;
		}

		if (validateForm()) {
			const periodArr = mainData?.paymentPeriods
				.map((item) => {
					switch (item) {
						case "MONTHLY":
							return "Ежемесячные";
						case "QUARTERLY":
							return "Поквартальные";
						case "SEMI_ANNUAL":
							return "Полугодовые";
						default:
							return null;
					}
				})
				.filter(Boolean);

			const period = periodArr.length > 0 ? periodArr[0] : null;

			const requestData = {
				amount: +sumValue.replace(/\s/g, ""),
				purchaseCommission: mainData.purchaseCommission,
				profitCommission: mainData.profitCommission,
				withdrawalCommission: mainData.withdrawalCommission,
				managementCommission: mainData.managementCommission,
				sharesCount: 1,
			};

			if (mainData.type === "ASSET") {
				requestData.period = period;
				requestData.term = mainData.term;
			}

			try {
				await AddBriefcaseProducts(mainData.projectId, requestData);

				setSuccessInfo("Инвестиция успешно оформлена!");
				setIsOpenSc(true);
				setPopUpProdNew(false);
			} catch (error) {
				setErrors({ rangeError: "Что-то пошло не так" });
			}
		}
	};

	return (
		<div className="popUpProd">
			<div className="popUpProdBlock">
				<div className="popUpProdHeader">
					<p>Согласие и ввод суммы</p>
					<button onClick={() => setPopUpProdNew(false)}>
						<svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
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
					{popUpProdNew === "start" && (
						<>
							<div className="banner">
								<div className="bannerLogo">
									<p>Доступный баланс</p>
									<h2 style={{ color: errors.balanceError ? "#FF0000" : "#00B4D2" }}>
										${investmentAmount}
									</h2>
									{errors.balanceError && <span className="error">{errors.balanceError}</span>}
								</div>
								<img src={bannerLogo} alt="bannerLogo" />
							</div>

							{mainData.type === "ASSET" ? (
								<h3 className="sumExample">
									от {mainData.minPrice.toLocaleString()}&nbsp;
									<span className={`removeWhenError ${errors.rangeError ? "error" : ""}`}>
                    - до {mainData.maxPrice.toLocaleString()}
                  </span>
								</h3>
							) : (
								<h3 className="sumExample">
									<p className="typeSum">Сумма:</p>
									<span>{mainData.maxPrice.toLocaleString()}</span>
								</h3>
							)}

							{mainData.type === "ASSET" && (
								<MainInput
									error={errors.rangeError}
									setError={setErrors}
									title="Сумма которую хотите инвестировать:"
									sumValue={sumValue}
									setSumValue={setSumValue}
									type="money"
									min={mainData.minPrice}
									max={mainData.maxPrice}
								/>
							)}

							{errors.rangeError && <span className="error">{errors.rangeError}</span>}

							<div className="prodInfoCardWrapper">
								<h2>Условия сделки:</h2>
								<p>
									Комиссия при покупке: <span>{mainData.purchaseCommission}%</span>
								</p>
								<p>
									Комиссия при продаже актива: <span>{mainData.withdrawalCommission}%</span>
								</p>
								<p>
									Комиссия за управление: <span>{mainData.managementCommission}%</span>
								</p>
							</div>

							<div className="files">
								<p>Условия</p>
								<span>Ознакомьтесь и подтвердите условия</span>

								<div className="documentsDownload">
									{mainData?.documents?.length > 0 && (
										<>
											{mainData.documents.slice(0, visibleCount).map((doc, index) => (
												<div key={index} className="documentsCardDownload">
													<div className="download">
														<img src={pdfImg} alt="pdfImg" />
														<p>{doc?.url?.name}</p>
													</div>
												</div>
											))}
											{visibleCount < mainData.documents.length && (
												<div className="seeMore" onClick={handleShowMore}>
													<span>Посмотреть еще</span>
												</div>
											)}
										</>
									)}
								</div>
							</div>

							<div className="confirm">
								<label className="confirmLabel">
                  <span
					  className={`confirmText ${errors.checkboxError ? "error" : ""}`}
					  style={isChecked || !errors.checkboxError ? {} : { color: "#FF0000" }}
				  >
                    Я подтверждаю, что ознакомлен(а) с условиями и соглашением о
                    предоставлении услуг, а также с рисками, связанными с инвестициями в
                    активы, и согласен(согласна) с ними.
                  </span>
									<input
										type="checkbox"
										name="confirm"
										id="confirm"
										className="confirmRadio"
										onChange={() => setIsChecked(!isChecked)}
									/>
								</label>
							</div>

							<div className="buttonStyleTooNew">
								<button onClick={handleConfirmClick}>
									<span>{mainData.type === "ASSET" ? "Инвестировать" : "Оплатить"}</span>
								</button>
							</div>
						</>
					)}
				</div>
			</div>
		</div>
	);
};

export default PopUpProdNew;