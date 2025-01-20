import React, { useEffect, useState } from "react";
import LineChart from "../../Charts/LineChart/LineChart";
import { BalanceChartProd } from "../../../../../api/productInfo";

const Indicators = ({ mainData }) => {
	const [selectValue, setSelectValue] = useState("MONTHLY");
	const [balanceChartData, setBalanceChartData] = useState(null);
	useEffect(() => {
		BalanceChartProd(selectValue, mainData.projectId).then((res) => {
			setBalanceChartData(res);
		});
	}, [selectValue, mainData.projectId]);

	return (
		<div className="indicators prodInfoCard">
			<h1>Финансовые показатели </h1>
			<p>{mainData?.financialIndicatorContent}</p>

			<LineChart
				balanceChartData={balanceChartData}
				infoPopUp={"popUp"}
				selectValue={selectValue}
				setSelectValue={setSelectValue}
			/>
		</div>
	);
};

export default Indicators;
