const BASE_URL = "https://aams.live/api/rest/";
const URL_LOGIN = "auth/signin";
const URL_SIGNUP = "auth/signup";
const URL_CHECK = "reset/password/check";
const URL_VALIDATE = "reset/password/validate";
const URL_RESET = "reset/password/reset";
const URL_NOTIFICATIONS = "notifications/list";
const URL_NOTIFICATIONS_READ = "notifications/read";

export const signup = async (userData) => {
	try {
		const { repeatPassword, ...signupData } = userData;

		const res = await fetch(BASE_URL + URL_SIGNUP, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(signupData), // Send only the necessary fields
		});
		const userAuth = await res.json();

		if (userAuth.token) {
			localStorage.setItem("userAuth", JSON.stringify(userAuth));
		}
		return userAuth;
	} catch (err) {
		return err.message;
	}
};

export const login = async (userData) => {
	try {
		const res = await fetch(BASE_URL + URL_LOGIN, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});
		const userAuth = await res.json();

		userAuth.token && localStorage.setItem("userAuth", JSON.stringify(userAuth));
		return res.status;
	} catch (err) {
		return err.message;
	}
};

export const logout = async () => {
	localStorage.removeItem("userAuth");
	window.location.href = "/login";
};

export const getUserAuth = () => {
	const userAuthJSON = localStorage.getItem("userAuth");
	return userAuthJSON ? JSON.parse(userAuthJSON) : null;
};

export const checkEmail = async (email) => {
	try {
		const res = await fetch(BASE_URL + URL_CHECK, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(email),
		});

		return res.status;
	} catch (err) {
		return err.message;
	}
};
export const validateCode = async (data) => {
	try {
		const res = await fetch(BASE_URL + URL_VALIDATE, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(data),
		});

		return res.status;
	} catch (err) {
		return err.message;
	}
};

export const resetPass = async (data) => {
	try {
		const { repeatPassword, ...resetData } = data;

		const dataToSend = {
			...resetData,
			repeatPassword,
		};

		const res = await fetch(BASE_URL + URL_RESET, {
			method: "POST",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
			},
			body: JSON.stringify(dataToSend),
		});

		return res.status;
	} catch (err) {
		return err.message;
	}
};

export const GetNotifications = async (query = {}) => {
	try {
		const queryString = new URLSearchParams(query).toString();
		const res = await fetch(`${BASE_URL}${URL_NOTIFICATIONS}?${queryString}`, {
			method: "GET",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
		});

		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};

export const ReadNotification = async (query) => {
	try {
		const res = await fetch(`${BASE_URL}${URL_NOTIFICATIONS_READ}?notificationIds=${query}`, {
			method: "PUT",
			headers: {
				Accept: "application/json",
				"Content-Type": "application/json",
				Authorization: `Bearer ${JSON.parse(localStorage.getItem("userAuth")).token}`,
			},
		});
		const data = await res.json();
		return data;
	} catch (err) {
		return err.message;
	}
};
