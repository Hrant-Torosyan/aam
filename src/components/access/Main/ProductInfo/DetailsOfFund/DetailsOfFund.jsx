import React from "react";
import "./DetailsOfFund.scss";
import "./DetailsOfFundResponsive.scss";

const DetailsOfFund = ({ mainData }) => {
    const fundDetails = mainData?.fundDetails;

    return (
        <div className="detailsOfFundWrapper">
            <h2>Детали фонда</h2>
            <div className="detailsOfFund">
                <div className="details">
                    <p>Сдача в эксплуатацию:</p>
                    <strong>{fundDetails?.["Сдача в эксплуатацию"]}</strong>
                </div>
                <div className="details">
                    <p>Минимальная стоимость:</p>
                    <strong>{fundDetails?.["Минимальная стоимость"]}</strong>
                </div>
                <div className="details">
                    <p>Максимальная стоимость:</p>
                    <strong>{fundDetails?.["Максимальная стоимость"]}</strong>
                </div>
                <div className="details">
                    <p>Минимальная цена за м²:</p>
                    <strong>{fundDetails?.["Минимальная цена за квадрат"]}</strong>
                </div>
                <div className="details">
                    <p>Площади:</p>
                    <strong>{fundDetails?.["Площади"]}</strong>
                </div>
                <div className="details">
                    <p>Всего квартир:</p>
                    <strong>{fundDetails?.["Всего квартир"]}</strong>
                </div>
            </div>
        </div>
    );
};

export default DetailsOfFund;