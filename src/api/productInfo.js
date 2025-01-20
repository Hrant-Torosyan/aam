const BASE_URL = "http://145.223.99.13:8080/api/rest/projects";
const BALANCE_CHART = "/balance/chart";

export const GetProductInfo = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};

export const GetProductHistories = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}/${id}/histories`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify({}),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return "err.message";
	}
};

export const GetProductTeam = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}/${id}/employees`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify({}),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return "err.message";
	}
};

export const GetProductInvestores = async (id, queryData) => {
	try {
		const queryString = queryData ? `?${new URLSearchParams(queryData).toString()}` : "";

		const res = await fetch(`${BASE_URL}/${id}/investors${queryString}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return "err.message";
	}
};

export const BalanceChartProd = async (period, prodId) => {
	try {
		const res = await fetch(`${BASE_URL}/${prodId}${BALANCE_CHART}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify({
				period: period,
			}),
		});
		const data = await res.json();

		if (data?.monthlyBalancesChart === null) {
			let lab = data?.dailyBalancesChart.map((item) => {
				if (period === "WEEKLY") {
					return ["Вс", "Пн", "Вт", "Ср", "Чт", "Пт", "Сб"][new Date(+item.date).getDay()];
				}
				return new Date(+item.date);
			});
			let dataChart = data?.dailyBalancesChart.map((item) => {
				return item.amount;
			});
			return { lab: lab, data: dataChart };
		} else {
			const sumsByMonth = {};

			data?.monthlyBalancesChart?.forEach((subArray) => {
				subArray.forEach((item) => {
					const currentDate = new Date(parseInt(item.date));
					const yearMonth = currentDate.getFullYear() + "/" + (currentDate.getMonth() + 1);

					if (!sumsByMonth[yearMonth]) {
						sumsByMonth[yearMonth] = {
							sum: 0,
							count: 0,
						};
					}

					sumsByMonth[yearMonth].sum += item.amount;
					sumsByMonth[yearMonth].count++;
				});
			});

			const averagesByMonth = Object.entries(sumsByMonth).map(([month, { sum, count }]) => ({
				month: month,
				average: Math.floor(sum / count),
			}));

			return { mainData: averagesByMonth };
		}
	} catch (err) {
		return "err.message";
	}
};
