import {type} from "@testing-library/user-event/dist/type";

const BASE_URL = "http://145.223.99.13:8080/api/rest/";

export const MarketProducts = async (category, search, type) => {
	let bodyData;

	if (search) {
		bodyData = {
			title: search,
			category: category === "all" ? null : category,
			type: type === "all" ? null : type,
		};
	} else {
		bodyData = {
			category: category === "all" ? null : category,
			type: type === "all" ? null : type,
		};
	}

	try {
		const res = await fetch(BASE_URL + "projects/list", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify(bodyData),
		});

		const data = await res.json();
		console.log(bodyData, "data"); // Check if 'type' is passed correctly
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

export const MarketCategories = async () => {
	try {
		const res = await fetch(BASE_URL + "projects/categories", {
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
