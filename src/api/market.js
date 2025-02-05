import { type } from "@testing-library/user-event/dist/type";

const BASE_URL = "http://145.223.99.13:8080/api/rest/";

export const MarketProducts = async (category, search, type, tags = []) => {
	let bodyData;

	if (search) {
		bodyData = {
			title: search,
			category: category === "all" ? null : category,
			type: type === "all" ? null : type,
			tags: tags.length > 0 ? tags : null,
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
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};
export const FilterByTags = async (tags = []) => {
	try {
		const res = await fetch(BASE_URL + "projects/list", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify({
				tags: tags,
			}),
		});

		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", error);
	}
};

export const MarketCategories = async (selectedType) => {
	try {
		const res = await fetch(BASE_URL + `projects/categories?projectType=${selectedType}`, {
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
