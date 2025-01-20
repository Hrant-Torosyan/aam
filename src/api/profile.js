import axios from "axios";
const BASE_URL = "http://145.223.99.13:8080/api/rest/";
export const GetUerInfo = async () => {
	try {
		const res = await fetch(`${BASE_URL}users/profiles/me`, {
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

export const SetUerInfo = async (userData) => {
	try {
		const res = await fetch(`${BASE_URL}users/profiles`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},

			body: JSON.stringify(userData),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};
export const SetUserImage = async (userData) => {
	try {
		const formData = new FormData();
		let name = null;
		for (let index = 0; index < userData.length; index++) {
			const file = userData[index];
			name = file.name;
			formData.append(`files[${index}].image`, file);
			formData.append(`files[${index}].imageName`, file.name);
			formData.append(`files[${index}].type`, "USER");
		}

		const res = await axios.post(BASE_URL + "media/store", formData, {
			headers: {
				"Content-Type": "multipart/form-data",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
		});

		return res.data.data[name];
	} catch (err) {
		return err.message;
	}
};

export const ResetPassword = async (userData) => {
	try {
		const res = await fetch(`${BASE_URL}users/profiles/change-password`, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},

			body: JSON.stringify(userData),
		});
		const data = await res.json();
		return data;
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};

export const GetProfileProducts = async (queryData) => {
	try {
		const queryString = queryData ? `?${new URLSearchParams(queryData).toString()}` : "";
		const res = await fetch(`${BASE_URL}portfolios/list${queryString}`, {
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
	} catch (error) {
		console.error("Error fetching products:", "error");
	}
};

export const GetProfit = async () => {
	try {
		const res = await fetch(`${BASE_URL}users/profiles/profit`, {
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

export const GetProfileCareer = async () => {
	try {
		const res = await fetch(`${BASE_URL}users/profiles/career`, {
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
