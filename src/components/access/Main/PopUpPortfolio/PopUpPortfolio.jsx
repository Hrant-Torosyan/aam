import React from "react";
import "./PopUpPortfolio.scss";
import DoughnutChart from "../Charts/DoughnutChart/DoughnutChart";
import ProdItems from "../ProdItems/ProdItems";
const PopUpPortfolio = ({ setPortfolioPopUp, colorsArr }) => {
	return (
		<div className="popUpPortfolio">
			<div className="popUpPortfolioBlock">
				<div className="popUpPortfolioHeader">
					<p>Структура портфеля</p>
					<button onClick={() => setPortfolioPopUp(false)}>
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
				<div className="popUpPortfolioContent">
					<div className="popUpPortfolioContentCart">
						<DoughnutChart colorsArr={colorsArr} count={null} />
						<p>
							Реферальная программа — это способ продвижения товара или услуги через
							рекомендации. Компания предлагает клиентам посоветовать свой продукт знакомым и
							получить за это вознаграждение: скидку, деньги или баллы на бонусный счёт.
							Проще говоря, это способ стимулировать сарафанное радио.
						</p>
					</div>
					<div className="popUpPortfolioContentProds">
						<ProdItems count={null} colorsArr={colorsArr} />
					</div>
				</div>
			</div>
		</div>
	);
};

export default PopUpPortfolio;
