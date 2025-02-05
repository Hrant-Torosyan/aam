import React, { useEffect, useState } from "react";
import "./MainLogin.scss";
import "./MainLoginResposive.scss";
import LoginPage from "./LoginPage/LoginPage";
import ResetPassword from "./ResetPassword/ResetPassword";
import RegisterPage from "./RegisterPage/RegisterPage";
const generateLinkedUserId = () => {
	return `user_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
};
const BASE_URL = "http://145.223.99.13:8080/api/rest/projects";

const MainLogin = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const referralCode = urlParams.get("q");
	const [page, setPage] = useState(referralCode ? "register" : "login");

	useEffect(() => {
		if (referralCode) {
			const storedReferral = localStorage.getItem("referral_sent");

			if (storedReferral !== referralCode) {
				const linkedUserId = generateLinkedUserId();

				fetch(BASE_URL + "/api/rest/referral/linked/users/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						referral: referralCode,
						linkedUserId,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						localStorage.setItem("referral_sent", referralCode);
					})
					.catch((error) => console.error("Error sending referral:", error));
			}
		}
	}, [referralCode]);
	return (
		<div className="mainLogin">
			<div className="mainLoginHeader">
				<div className="logo">
					<img src="./images/LogoLogin.png" alt="Logo" />
				</div>
			</div>
			<div className="mainLoginContent">
				<div className="mainLoginForm">
					{page === "login" ? (
						<LoginPage setPage={setPage} />
					) : page === "resetPassword" ? (
						<ResetPassword setPage={setPage} />
					) : (
						<RegisterPage setPage={setPage} />
					)}
				</div>
				<div className="mainLoginImage">
					<div className="circleSm"></div>
					<div className="circleXl"></div>
					<img src="./images/loginImage.png" alt="" />
				</div>
			</div>
			<div className="mainLoginFooter">
				<p>© ААМ, 2020–2024. </p>
			</div>
		</div>
	);
};

export default MainLogin;
