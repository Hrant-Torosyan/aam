import React, { useState, useEffect } from "react";
import "./PopupProdNew.scss";
import MainInput from "../../MainInput/MainInput";
import { AddBriefcaseProducts } from "../../../../../api/briefcase";
import bannerLogo from "../../../../svg/bannerLogo.svg";
import pdfImg from "../../../../svg/pdf.svg";
import { Wallets } from "../../../../../api/analytics";
import arrowDown from "../../../../svg/arrowDown.svg";
import { formatNumber } from "../../../../../utils/formatNumber";

const PopUpProdNew = ({ popUpProdNew, setPopUpProdNew, mainData, setSuccessInfo, setIsOpenSc }) => {
	const [sumValue, setSumValue] = useState("");
	const [errors, setErrors] = useState({});
	const [visibleCount, setVisibleCount] = useState(2);
	const [isChecked, setIsChecked] = useState(false);
	const [walletsData, setWalletsData] = useState([]);
	const [showMore, setShowMore] = useState(false);

	const fetchWalletData = async () => {
		try {
			const res = await Wallets();
			setWalletsData(res);
		} catch (error) {
			console.error("Error", error);
		}
	};

	useEffect(() => {
		fetchWalletData();
	}, []);

	const handleShowMore = () => {
		setShowMore(!showMore);
		setVisibleCount(showMore ? 2 : mainData.conditionDocuments.length);
	};

	const investmentAmount = walletsData?.investmentAccount || 0;

	const validateForm = () => {
		const newErrors = {};
		const formattedSum = sumValue ? +sumValue.replace(/\s/g, "") : 0;

		if (!isChecked) {
			newErrors.checkboxError = "Необходимо согласиться с условиями.";
		}

		if (
			mainData.type !== "ASSET" &&
			(formattedSum < mainData.minPrice || formattedSum > mainData.maxPrice)
		) {
			newErrors.rangeError =
				"Введенная сумма превышает максимально допустимую. Пожалуйста, введите сумму, которая не больше " +
				mainData.maxPrice;
		}

		const parsedInvestmentAmount = parseFloat(mainData.investmentAmount);
		if (formattedSum > parsedInvestmentAmount) {
			newErrors.balanceError = "Недостаточно средств для инвестиции.";
		}
		if (mainData.type === "ASSET" && mainData.maxPrice > investmentAmount) {
			newErrors.balanceError = "Недостаточно средств для инвестиции.";
		}

		setErrors(newErrors);
		return Object.keys(newErrors).length === 0;
	};

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
							return "MONTHLY";
						case "QUARTERLY":
							return "QUARTERLY";
						case "SEMI_ANNUAL":
							return "SEMI_ANNUAL";
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
			};

			if (mainData.type !== "ASSET") {
				requestData.period = period;
				requestData.amount = +sumValue.replace(/\s/g, "");
				requestData.term = mainData.term;
			} else {
				requestData.amount = mainData.maxPrice;
				requestData.period = period;
				requestData.term = mainData.term;
			}

			const res = await AddBriefcaseProducts(mainData.projectId, requestData);
			if (res?.success) {
				setSuccessInfo(true);
			} else {
				setSuccessInfo(false);
			}
			setIsOpenSc(true);
			setPopUpProdNew(false);
		}
	};

	return (
		<div className="popUpProd">
			<div className="popUpProdBlock">
				<div className="popUpProdHeader">
					<p>Согласие и ввод суммы</p>
					<button onClick={() => setPopUpProdNew(false)}>
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
					{popUpProdNew === "start" && (
						<>
							<div className="banner">
								<div className="bannerLogo">
									<p>Доступный баланс</p>
									<h2 style={{ color: errors.balanceError ? "#FF0000" : "#00B4D2" }}>
										${formatNumber(investmentAmount)}
									</h2>
									{errors.balanceError && (
										<span className="error">{errors.balanceError}</span>
									)}
								</div>
								<img src={bannerLogo} alt="bannerLogo" />
							</div>

							{mainData.type !== "ASSET" ? (
								<h3 className="sumExample">
									от {mainData.minPrice.toLocaleString()}&nbsp;
									<span className={`removeWhenError ${errors.rangeError ? "error" : ""}`}>
										- до {mainData.maxPrice.toLocaleString()}
									</span>
								</h3>
							) : (
								<h3 className="sumExample">
									<p className="typeSum">Сумма:</p>
									<span>{mainData.maxPrice.toLocaleString()} $</span>
								</h3>
							)}

							{mainData.type !== "ASSET" && (
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
									Комиссия при продаже актива: <span>{mainData.profitCommission}%</span>
								</p>
								<p>
									Комиссия за управление: <span>{mainData.managementCommission}%</span>
								</p>
							</div>

							<div className="files">
								<p>Условия</p>
								<span>Ознакомьтесь и подтвердите условия</span>

								<div className="documentsDownload">
									{mainData?.conditionDocuments?.length > 0 && (
										<>
											{mainData.conditionDocuments
												.slice(0, visibleCount)
												.map((doc, index) => (
													<div key={index} className="documentsCardDownload">
														<div className="download">
															<img src={pdfImg} alt="pdfImg" />
															<p>{doc?.name}</p>
															<button
																className="documentsDownload"
																onClick={() => {
																	if (doc?.url?.url) {
																		const dummyLink = document.createElement("a");
																		dummyLink.href = doc.url.url;
																		dummyLink.setAttribute("target", "_blank");
																		dummyLink.download =
																			doc.url.name || "download";
																		document.body.appendChild(dummyLink);
																		dummyLink.click();
																		document.body.removeChild(dummyLink);
																	} else {
																		console.error("Документ поврежден");
																	}
																}}
															>
																<span>Скачать</span>
															</button>
														</div>
													</div>
												))}
											{mainData.conditionDocuments?.length > 2 && (
												<div className="seeMore" onClick={handleShowMore}>
													<span>{showMore ? "Скрыть" : "Посмотреть еще"}</span>
													<img
														src={arrowDown}
														alt="toggle"
														className={showMore ? "rotated" : ""}
													/>
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
										style={{
											color: isChecked
												? "#000"
												: errors.checkboxError
												? "#FF0000"
												: "#212529",
										}}
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
									<span>{mainData.type === "ASSET" ? "Оплатить" : "Инвестировать"}</span>
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
