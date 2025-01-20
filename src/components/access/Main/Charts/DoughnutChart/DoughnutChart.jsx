import React, { useEffect, useRef, useState } from "react";
import Chart from "chart.js/auto";
import "./DoughnutChart.scss";
import { GetAnalyticList } from "../../../../../api/analytics";

export default function DoughnutChart({ count, colorsArr, refresh }) {
	const chartRef = useRef(null);
	const chartInstance = useRef(null);
	const [analyticList, setAnalyticList] = useState(null);
	useEffect(() => {
		if (count) {
			GetAnalyticList({
				pageSize: count,
			}).then((res) => {
				setAnalyticList(res.content);
			});
		} else {
			GetAnalyticList().then((res) => {
				setAnalyticList(res.content);
			});
		}
	}, [count]);
	const [windowSize, setWindowSize] = useState({
		width: window.innerWidth,
		size: 60,
	});

	useEffect(() => {
		let prevWidth = window.innerWidth;
		const handleResize = () => {
			const width = window.innerWidth;
			if (width !== prevWidth) {
				let size = 60;

				if ((width > 576 && width <= 991) || width <= 400) {
					size = 40;
				} else if (width < 576 && width >= 400) {
					size = 60;
				}

				setWindowSize({
					width,
					size,
				});

				prevWidth = width;
			}
		};
		const delayedResize = () => {
			setTimeout(() => {
				handleResize();
			}, 100);
		};

		delayedResize();
		window.addEventListener("resize", handleResize);

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (chartInstance.current) {
			chartInstance.current.destroy();
		}
		const myChartRef = chartRef.current.getContext("2d");

		chartInstance.current = new Chart(myChartRef, {
			type: "doughnut",
			data: {
				labels: analyticList?.map((item) => {
					return item.title;
				}),
				datasets: [
					{
						data: analyticList?.map((item) => {
							return item.percentage;
						}),
						backgroundColor: analyticList?.map((item, key) => {
							return colorsArr[key];
						}),
					},
				],
			},
			options: {
				cutout: windowSize.size,
				responsive: true,
				plugins: {
					tooltip: {
						callbacks: {
							label: function (context) {
								return ` (${context.dataset.data[context.dataIndex]}%)`;
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
			if (chartInstance.current) {
				chartInstance.current.destroy();
			}
		};
	}, [windowSize, colorsArr, analyticList, refresh]);

	return (
		<div className="chartBlcok">
			<p>{analyticList?.length} активов</p>
			<canvas ref={chartRef} />
		</div>
	);
}
