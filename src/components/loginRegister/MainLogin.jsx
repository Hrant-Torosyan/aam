import React, { useEffect, useState } from "react";
import "./MainLogin.scss";
import "./MainLoginResposive.scss";
import LoginPage from "./LoginPage/LoginPage";
import ResetPassword from "./ResetPassword/ResetPassword";
import RegisterPage from "./RegisterPage/RegisterPage";
import { useSearchParams } from "react-router-dom";
const generateLinkedUserId = () => {
	return `user_${Date.now()}_${Math.floor(1000 + Math.random() * 9000)}`;
};
const BASE_URL = "https://aams.live";

const MainLogin = () => {
	const [searchParams, setSearchParams] = useSearchParams();
	let innerQ = searchParams.get("q");

	const [page, setPage] = useState(innerQ ? "register" : "login");
	useEffect(() => {
		if (innerQ) {
			const storedReferral = localStorage.getItem("referral_sent");

			if (storedReferral !== innerQ) {
				const linkedUserId = generateLinkedUserId();

				fetch(BASE_URL + "/api/rest/referral/linked/users/add", {
					method: "POST",
					headers: {
						"Content-Type": "application/json",
					},
					body: JSON.stringify({
						referral: innerQ,
						linkedUserId,
					}),
				})
					.then((response) => response.json())
					.then((data) => {
						localStorage.setItem("referral_sent", innerQ);
					})
					.catch((error) => console.error("Error sending referral:", error));
			}
		}
	}, [innerQ]);
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
