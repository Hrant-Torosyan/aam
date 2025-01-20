import React, { useEffect, useState } from "react";
import "./Investors.scss";
import { GetProductInvestores } from "../../../../../api/productInfo";

const Investors = ({ prodId }) => {
	const [investorsData, setInvestorsData] = useState(null);
	const [showInvestorsData, setShowInvestorsData] = useState(null);
	useEffect(() => {
		if (prodId) {
			let queryBody = showInvestorsData
				? null
				: {
						pageSize: 3,
				  };
			GetProductInvestores(prodId, queryBody).then((res) => setInvestorsData(res));
		}
	}, [prodId, showInvestorsData]);
	let investores = investorsData?.content.length ? (
		investorsData.content.map((item, key) => (
			<div key={key} className="investorsItem">
				<img src={item.image === null ? "./images/avatar.png" : item.image.url} alt="" />
				<h3>{item.fullName}</h3>
			</div>
		))
	) : (
		<h1 className="empty">Пусто</h1>
	);

	return (
		<div className="investors prodInfoCard">
			<p>Инвесторы проекта:</p>
			{investores}
			{investorsData?.totalElements > 3 && (
				<button
					onClick={() => {
						if (showInvestorsData) {
							setShowInvestorsData(null);
						} else {
							setShowInvestorsData(4);
						}
					}}
				>
					{!showInvestorsData
						? `и еще ${
								investorsData?.totalElements && investorsData?.totalElements - 3
						  } инвесторов`
						: "скрыть"}
				</button>
			)}
		</div>
	);
};

export default Investors;
