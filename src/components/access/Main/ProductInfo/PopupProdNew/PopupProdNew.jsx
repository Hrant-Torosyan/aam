import React, { useState, useEffect } from "react";
import "./PopupProdNew.scss";
import MainInput from "../../MainInput/MainInput";
import { AddBriefcaseProducts } from "../../../../../api/briefcase";
import bannerLogo from "../../../../svg/bannerLogo.svg";
import pdfImg from "../../../../svg/pdf.svg";
import { GetUerInfo } from "../../../../../api/profile";

const PopUpProdNew = ({ popUpProdNew, setPopUpProdNew, mainData, setSuccessInfo, setIsOpenSc }) => {
    const [sumValue, setSumValue] = useState("");
    const [countValue, setCountValue] = useState("");
    const [errors, setErrors] = useState({});
    const [visibleCount, setVisibleCount] = useState(2);
    const [isChecked, setIsChecked] = useState(false);
    const [userInfo, setUserInfo] = useState(null);
    const [selectValue, setSelectValue] = useState("");

    useEffect(() => {
        const fetchUserInfo = async () => {
            const data = await GetUerInfo();
            if (data) {
                setUserInfo(data);
            }
        };
        fetchUserInfo();

        if (mainData?.paymentPeriods?.length) {
            const period = mainData.paymentPeriods.find(item => item) || "";
            setSelectValue(period);
        }
    }, [mainData]);

    const formattedSum = sumValue ? +sumValue.replace(/\s/g, "") : 0;

    const investmentAmount = mainData.type === "ASSET" ? Math.round(
        formattedSum +
        formattedSum * (mainData.purchaseCommission / 100) +
        formattedSum * (mainData.managementCommission / 100)
    ) : formattedSum;

    const handleShowMore = () => {
        setVisibleCount(mainData.documents.length);
    };

    const validateForm = () => {
        const newErrors = {};
        const formattedSum = sumValue ? +sumValue.replace(/\s/g, "") : 0;

        if (!isChecked) {
            newErrors.checkboxError = "Необходимо согласиться с условиями.";
        }
        if (mainData.type === "ASSET" && formattedSum <= 0) {
            newErrors.balanceError = "Недостаточно средств на балансе.";
        }

        if (formattedSum > 5000000 || formattedSum < mainData.minPrice || formattedSum > mainData.maxPrice) {
            newErrors.rangeError = "Введенная сумма превышает максимально допустимую. Пожалуйста, введите сумму, которая не больше $ 5 000 000";
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleConfirmClick = async () => {
        if (validateForm()) {
            try {
                await AddBriefcaseProducts(mainData.projectId, {
                    amount: Math.round(
                        +sumValue.replace(/\s/g, "") +
                        sumValue.replace(/\s/g, "") * (mainData.purchaseCommission / 100) +
                        sumValue.replace(/\s/g, "") * (mainData.managementCommission / 100)
                    ),
                    count: +countValue,
                });
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
                    {popUpProdNew === "start" ? (
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
                                        - до 5 000 000
                                    </span>
                                </h3>
                            ) : (
                                <h3 className="sumExample">
                                    <p className="typeSum">Сумма:</p>
                                    <span>$5 000 000</span>
                                </h3>
                            )}

                            {mainData.type === "ASSET" && (
                                <MainInput
                                    error={errors.rangeError}
                                    setError={setErrors}
                                    title="Сумма которая хотите инвестировать:"
                                    sumValue={sumValue}
                                    setSumValue={setSumValue}
                                    type="money"
                                    min={mainData.minPrice}
                                    max={mainData.maxPrice}
                                />
                            )}

                            <div className="prodInfoCardWrapper">
                                <h2>Условия сделки:</h2>
                                <p>Комиссия при покупке: <span>{mainData.purchaseCommission}%</span></p>
                                <p>Комиссия при продаже актива: <span>{mainData.withdrawalCommission}%</span></p>
                                <p>Комиссия за управление: <span>{mainData.managementCommission}%</span></p>
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
                                <div className="confirm">
                                    <label className="confirmLabel">
                                        <span
                                            className={`confirmText ${errors.checkboxError ? "error" : ""}`}
                                            style={isChecked || !errors.checkboxError ? {} : { color: "#FF0000" }}
                                        >
                                            Я подтверждаю, что ознакомлен(а) с условиями и соглашением о предоставлении услуг,
                                            а также с рисками, связанными с инвестициями в активы, и согласен(согласна) с ними.
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
                            </div>

                            <div className="buttonStyleTooNew">
                                <button onClick={handleConfirmClick}>
                                    <span>{mainData.type === "ASSET" ? "Инвестировать" : "Оплатить"}</span>
                                </button>
                            </div>
                        </>
                    ) : null}
                </div>
            </div>
        </div>
    );
};

export default PopUpProdNew;