const BASE_URL = "http://145.223.99.13:8080/api/rest/";
const WALLETS = "wallets";
const BALANCE_CHART = "wallets/balance/chart";
const OPERATIONS_LIST = "transaction/operations/list";
const OPERATIONS_ITEM = "transaction/operations";
const TRANSFER = "wallets/inner/transfer";
const REPLENISH = "deposit/payments/create";
const REPLENISH_GET = "deposit/payments/currency/info";
const SEND_USER = "wallets/outer/transfer";
const SEND_WALLET = "withdrawal/payments/request";

const ANALYTIC = "portfolios/analytic/list";

export const Wallets = async () => {
	try {
		const res = await fetch(BASE_URL + WALLETS, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return "err.message";
	}
};

export const BalanceChart = async (period, accountType = null) => {
	let bodyData;
	if (accountType) {
		bodyData = {
			period: period,
			accountType: accountType,
		};
	} else {
		bodyData = {
			period: period,
		};
	}
	try {
		const res = await fetch(BASE_URL + BALANCE_CHART, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
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
			return { lab: lab, data: dataChart, profitability: data.profitability };
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

			return { mainData: averagesByMonth, profitability: data.profitability };
		}
	} catch (err) {
		return "err.message";
	}
};

export const OperationsList = async (accountType = null, pageNumber) => {
	let bodyData;
	const queryParams = new URLSearchParams();
	if (pageNumber) {
		queryParams.append("pageSize", pageNumber);
	}
	if (accountType) {
		bodyData = {
			accountType: accountType,
		};
	} else {
		bodyData = {};
	}
	try {
		const res = await fetch(`${BASE_URL}${OPERATIONS_LIST}?${queryParams}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};

export const OperationsListItem = async (id) => {
	try {
		const res = await fetch(`${BASE_URL}${OPERATIONS_ITEM}/${id}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};

export const SetTransfer = async (bodyData) => {
	try {
		const res = await fetch(BASE_URL + TRANSFER, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};
export const SetReplenish = async (bodyData) => {
	try {
		const res = await fetch(BASE_URL + REPLENISH, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};
export const GetReplenishMinMax = async (bodyData) => {
	try {
		const res = await fetch(
			`${BASE_URL}${REPLENISH_GET}?currencyFrom=${bodyData.currencyFrom}&currencyTo=${bodyData.currencyTo}`,
			{
				method: "GET",
				headers: {
					Accept: "application/json",
					Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
					"Content-Type": "application/json",
				},
			}
		);
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};

export const SetSendUser = async (bodyData) => {
	try {
		const res = await fetch(BASE_URL + SEND_USER, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};

export const SetSendWallet = async (bodyData) => {
	try {
		const res = await fetch(BASE_URL + SEND_WALLET, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(bodyData),
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};
export const GetAnalyticList = async (queryData) => {
	try {
		const queryString = queryData ? `?${new URLSearchParams(queryData).toString()}` : "";

		const res = await fetch(`${BASE_URL}${ANALYTIC}${queryString}`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
				"Content-Type": "application/json",
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};
