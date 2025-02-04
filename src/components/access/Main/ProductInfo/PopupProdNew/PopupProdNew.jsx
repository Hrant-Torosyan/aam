import React, { useState, useEffect } from "react";
import "./PopupProdNew.scss";
import MainInput from "../../MainInput/MainInput";
import { AddBriefcaseProducts } from "../../../../../api/briefcase";
import bannerLogo from "../../../../svg/bannerLogo.svg";
import pdfImg from "../../../../svg/pdf.svg";
import {GetUerInfo} from "../../../../../api/profile";

const PopUpProdNew = ({ popUpProdNew, setPopUpProdNew, mainData, setSuccessInfo, setIsOpenSc }) => {
        const [quantity, setQuantity] = useState(1);
        const [userInfo, setUserInfo] = useState(null);
        const [sumValue, setSumValue] = useState("");
        const [countValue, setCountValue] = useState("");
        const [error, setError] = useState("");
        const [visibleCount, setVisibleCount] = useState(2);
        const [isChecked, setIsChecked] = useState(false);
        const [balanceError, setBalanceError] = useState(false);

        useEffect(() => {
            const fetchUserInfo = async () => {
                const data = await GetUerInfo();
                if (data) {
                    setUserInfo(data);
                }
            };
            fetchUserInfo();
        }, []);

        const periodArr = mainData?.paymentPeriods.map((item) => {
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
        }).filter(Boolean);

        const formattedSum = sumValue ? +sumValue.replace(/\s/g, "") : 0;
        const investmentAmount = Math.round(
            formattedSum +
            formattedSum * (mainData.purchaseCommission / 100) +
            formattedSum * (mainData.managementCommission / 100)
        );

        console.log(mainData, 'mainData');
        console.log(investmentAmount, 'investmentAmount');

        const [selectValue, setSelectValue] = useState(periodArr[0] || "");

        const handleShowMore = () => {
            setVisibleCount(mainData.documents.length);
        };

    const handleConfirmClick = () => {
        if (!isChecked) {
            setError("Вы должны подтвердить условия.");
            return;
        }

        if (investmentAmount <= 0) {
            setBalanceError(true);
            return;
        }

        setPopUpProdNew("finish");
    };


    return (
        <div className="popUpProd">
            <div className="popUpProdBlock">
                <div className="popUpProdHeader">
                    <p>Согласие и ввод суммы</p>
                    <button onClick={() => setPopUpProdNew(false)}>
                        <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M20.8366 9.17188L9.16992 20.8386M9.16995 9.17188L20.8366 20.8386"
                                  stroke="#00B4D2" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                        </svg>
                    </button>
                </div>

                <div className="popUpProdContent">
                    {popUpProdNew === "start" ? (
                        <>
                            <div className="banner">
                                <div className="bannerLogo">
                                    <p style={{color: balanceError ? "#FF0000" : "#000000B2"}}>Доступный баланс</p>
                                    <h2 style={{color: balanceError ? "#FF0000" : "#00B4D2"}}>${investmentAmount}</h2>
                                </div>

                                <img src={bannerLogo} alt="bannerLogo"/>
                            </div>
                            <h3 className="sumExample">от 500 - до 12 000</h3>
                            <MainInput
                                error={error}
                                setError={setError}
                                title="Сумма которая хотите инвестировать:"
                                sumValue={sumValue}
                                setSumValue={setSumValue}
                                type="money"
                                min={mainData.minPrice}
                                max={mainData.maxPrice}
                            />
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
                                <span>Ознокомьтесь и потвердите условия</span>

                                <div className="documentsDownload">
                                    {mainData?.documents !== null && (
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
                                        className={`confirmText ${error ? "error" : ""}`}
                                    >
                                      Я подтверждаю, что ознакомлен(а) с условиями и соглашением о предоставлении услуг,
                                      а также с рисками, связанными с инвестициями в активы, и согласен(согласна) с ними.
                                    </span>
                                    <input
                                        type="radio"
                                        name="confirm"
                                        id="confirm"
                                        className="confirmRadio"
                                        onChange={() => setIsChecked(!isChecked)}
                                    />
                                </label>
                            </div>

                            {mainData.type === "ASSET" ?
                                <div className="buttonStyleTooNew">
                                    <button
                                        onClick={handleConfirmClick}
                                    >
                                        <span>Инвестировать</span>
                                    </button>
                                </div> :
                                <div className="buttonStyleTooNew">
                                    <button
                                        onClick={handleConfirmClick}
                                    >
                                        <span>Оплатить</span>
                                    </button>
                                </div>
                            }

                        </>
                    ) : (
                        <>
                            <div className="popUpProdContentInfo">
                                <div className="popUpProdContentInfolist">
                                    <h4>Цена за единицу: <span>${mainData.price.toLocaleString()}</span></h4>
                                    <h4>Сумма инвестиций: <span>${sumValue}</span></h4>
                                </div>
                                <div className="popUpProdContentInfolist">
                                    <h4>Мин. сумма: <span>${mainData.minPrice.toLocaleString()}</span></h4>
                                    <h4>Макс. сумма: <span>${mainData.maxPrice.toLocaleString()}</span></h4>
                                </div>
                                <div className="popUpProdContentInfolist">
                                    <h4>Комиссия: <span>{mainData.withdrawalCommission}%</span></h4>
                                    <h4>Срок: <span>{mainData.term} год</span></h4>
                                </div>
                            </div>
                            <MainInput
                                error={error}
                                setError={setError}
                                title="Количество акций"
                                sumValue={countValue}
                                setSumValue={setCountValue}
                                type={false}
                                onePrice={mainData.price}
                            />
                            <h4>
                                Итого: <span>
                                    ${Math.round(
                                +sumValue.replace(/\s/g, "") +
                                sumValue.replace(/\s/g, "") * (mainData.purchaseCommission / 100) +
                                sumValue.replace(/\s/g, "") * (mainData.managementCommission / 100)
                            )}
                                </span>
                            </h4>
                            <div className="buttonStyleToo">
                                <button
                                    onClick={() => {
                                        const sumCount = countValue.toString();
                                        const sumAmount = sumValue.replace(/\s/g, "");

                                        if (!sumCount.trim()) {
                                            setError("Заполните поле");
                                            return;
                                        }
                                        if (+sumAmount < mainData.minPrice || +sumAmount > mainData.maxPrice) {
                                            setError("Сумма вне допустимого диапазона");
                                            return;
                                        }

                                        AddBriefcaseProducts(mainData.projectId, {
                                            amount: Math.round(
                                                +sumAmount +
                                                sumAmount * (mainData.purchaseCommission / 100) +
                                                sumAmount * (mainData.managementCommission / 100)
                                            ),
                                            count: +sumCount,
                                        })
                                            .then(() => {
                                                setSuccessInfo("Инвестиция успешно оформлена!");
                                                setIsOpenSc(true);
                                                setPopUpProdNew(false);
                                            })
                                            .catch(() => setError("Что-то пошло не так"));
                                    }}
                                >
                                    <span>Подтвердить</span>
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
