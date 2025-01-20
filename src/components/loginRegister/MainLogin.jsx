import React, { useState } from "react";
import "./MainLogin.scss";
import "./MainLoginResposive.scss";
import LoginPage from "./LoginPage/LoginPage";
import ResetPassword from "./ResetPassword/ResetPassword";
import RegisterPage from "./RegisterPage/RegisterPage";
const MainLogin = () => {
	const urlParams = new URLSearchParams(window.location.search);
	const referralCode = urlParams.get("q");
	const [page, setPage] = useState(referralCode ? "register" : "login");

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
