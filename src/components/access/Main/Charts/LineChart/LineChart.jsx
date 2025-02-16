import React, { useEffect, useRef } from "react";
import Chart from "chart.js/auto";
import "./LineChart.scss";
import Select from "../../Select/Select";

export default function LineChart({
	balanceChartData,
	color,
	bg,
	selectValue,
	setSelectValue,
	infoPopUp,
}) {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);

	useEffect(() => {
		if (chartInstance.current !== null) {
			chartInstance.current.destroy();
		}

		let labelsArr =
			selectValue === "MONTHLY"
				? balanceChartData?.lab?.map((item) => {
						return item.getDate();
				  })
				: selectValue === "WEEKLY"
				? balanceChartData?.lab
				: balanceChartData?.mainData?.map((item) => item.month);

		const myChartRef = chartRef.current.getContext("2d");
		chartInstance.current = new Chart(myChartRef, {
			type: "line",
			data: {
				labels: labelsArr,
				datasets: [
					{
						label: "Balance",
						data:
							selectValue === "MONTHLY" || selectValue === "WEEKLY"
								? balanceChartData?.data
								: balanceChartData?.mainData?.map((item) => item.average),
						borderColor: color || "rgb(48, 170, 235)",
						fill: {
							target: "origin",
							above: bg || "rgba(48, 170, 235,0.2)",
						},
						tension: 0.3,
						pointRadius: 0,
					},
				],
			},
			options: {
				maintainAspectRatio: false,
				aspectRatio: 2,
				scales: {
					y: {
						min: 0,
						grace: "25%",
						ticks: {
							maxTicksLimit: 6,
						},
					},

					x: {
						source: "data",
						autoSkip: true,
						grid: {
							display: true,
							color: "rgba(0, 0, 0, 0)",
						},
						ticks: {
							callback: function (value, index) {
								if (labelsArr[index] % 5 !== 0 && selectValue === "MONTHLY") {
									return null;
								} else {
									return labelsArr[index];
								}
							},
						},
					},
				},

				plugins: {
					tooltip: {
						enabled: true,
						mode: "nearest",
						intersect: false,
						backgroundColor: "#fff",
						titleColor: "rgba(60, 60, 67, 0.6)",
						bodyColor: "rgb(52, 142, 241)",
						borderWidth: 1,
						padding: 10,
						borderColor: "#fff",
						displayColors: false,
						bodyFont: {
							size: 20,
						},

						callbacks: {
							label: function (context) {
								return context.parsed.y + "$";
							},
							title: function (tooltipItem) {
								let mountInfo = "";
								if (selectValue === "MONTHLY") {
									mountInfo =
										balanceChartData?.lab[tooltipItem[0].dataIndex].getFullYear() +
										"/" +
										(balanceChartData?.lab[tooltipItem[0].dataIndex].getMonth() + 1) +
										"/" +
										balanceChartData?.lab[tooltipItem[0].dataIndex].getDate();
								}
								return selectValue === "MONTHLY" ? mountInfo : tooltipItem[0].label;
							},
						},
					},
					legend: {
						display: false,
					},
				},
			},
		});

		return () => {
			if (chartInstance.current !== null) {
				chartInstance.current.destroy();
			}
		};
	}, [balanceChartData, color, bg]);

	return (
		<div id="lineChart">
			<p>График изменения баланса</p>
			{infoPopUp === "popUp" && (
				<Select selectValue={selectValue} setSelectValue={setSelectValue} />
			) }
			<div>
				<canvas ref={chartRef} />
			</div>
		</div>
	);
}
