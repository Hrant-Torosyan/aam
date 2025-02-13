import React, { useEffect, useState } from "react";
import "./ProdItems.scss";
import { GetAnalyticList } from "../../../../api/analytics";

const ProdItems = ({ setPortfolioPopUp, count, colorsArr }) => {
	const [analyticList, setAnalyticList] = useState(null);

	useEffect(() => {
		if (count) {
			GetAnalyticList({
				pageSize: count,
			}).then((res) => {
				setAnalyticList(res);
			});
		} else {
			GetAnalyticList().then((res) => {
				setAnalyticList(res);
			});
		}
	}, [count]);

	let doughnutChartItemBlock = analyticList?.content.length ? (
		analyticList.content.map((item, key) => (
			<div key={key} className="doughnutChartItem">
				<div className="doughnutChartItemInfoBlock">
					<img src={item.logo.url} alt={item.logo.name} />
					<div className="doughnutChartItemInfo">
						<h2>{item.title}</h2>
						<p>
							{analyticList
								? parseFloat(
										(item?.investedAmount).toString().replace(/[^\d.-]/g, "")
								  ).toLocaleString()
								: 0}{" "}
							$ ({item.percentage}%)
						</p>
					</div>
				</div>
				<div style={{ background: colorsArr[key] }} className={`dote`}></div>
			</div>
		))
	) : (
		null
	);
	return (
		<div className="doughnutChartItems">
			{doughnutChartItemBlock}

			{analyticList?.content.length > 0 && count !== null && (
				<button onClick={() => setPortfolioPopUp(true)}>смотреть полностью</button>
			)}
		</div>
	);
};

export default ProdItems;
