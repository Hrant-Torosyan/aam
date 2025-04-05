const BASE_URL = "https://aams.live/api/rest/";

export const BriefcaseProducts = async (category) => {
	try {
		const res = await fetch(BASE_URL + "portfolios/list", {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify({
				category: category === "all" ? null : category,
			}),
		});
		const data = await res.json();

		return data;
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};

export const BriefcaseCategories = async () => {
	try {
		const res = await fetch(BASE_URL + "portfolios/categories", {
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

export const AddBriefcaseProducts = async (prodId, bodyReq) => {
	try {
		const res = await fetch(BASE_URL + `projects/${prodId}/invest`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
			body: JSON.stringify(bodyReq),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};
