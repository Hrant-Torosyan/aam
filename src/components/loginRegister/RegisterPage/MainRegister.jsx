import React, { useContext, useState } from "react";
import { RegisterContext } from "./RegisterPage";
import { signup } from "../../../api/autorisation";
import { useNavigate } from "react-router-dom";

const MainRegister = () => {
	let regCon = useContext(RegisterContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const navigate = useNavigate();

	const handleRegister = (event) => {
		event.preventDefault();
		if (
			!regCon.email.trim() ||
			!regCon.password.trim() ||
			!regCon.fullName.trim() ||
			!regCon.confirmOne ||
			!regCon.confirmTwo
		) {
			setError("Заполните поле");
			return;
		} else if (regCon.password.trim().length < 8) {
			setError("Пароль должен быть не менее 7 символов");
			return;
		} else if (!emailRegex.test(regCon.email)) {
			setError("Неправильный формат email");
			return;
		}

		setLoading(false);
		const urlParams = new URLSearchParams(window.location.search);
		const referralCode = urlParams.get("q");

		signup({
			email: regCon.email,
			password: regCon.password,
			full_name: regCon.fullName,
			company_name: regCon.companyName,
			investment_amount: regCon.investmentAmount,
			investment_experience: regCon.investmentExperience,
			referral: referralCode,
		}).then((res) => {
			if (res.token) {
				navigate("/");
			} else {
				setError("Такой e-mail уже существует");
			}
			setLoading(true);
		});
	};

	return (
		<>
			<form className="registerPage" onSubmit={handleRegister}>
				{loading ? (
					<>
						<h1>Регистрация</h1>
						<span className="errors">{error}</span>

						<div onClick={() => regCon.setStep(0)} className="prevBtn">
							<svg
								width="34"
								height="34"
								viewBox="0 0 34 34"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M19.8333 9.91602L12.75 16.9993L19.8333 24.0827"
									stroke="#0E1A32"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
						<div
							className={regCon.fullName === "" && error ? "inputStyle error" : "inputStyle"}
						>
							<input
								placeholder="ФИО"
								type="text"
								value={regCon.fullName}
								onChange={(e) => regCon.setFullName(e.target.value)}
							/>
						</div>
						<div
							className={
								error === "Неправильный формат email" ||
								error === "Такой e-mail уже существует" ||
								(regCon.email === "" && error)
									? "inputStyle error"
									: "inputStyle"
							}
						>
							<input
								placeholder="Email"
								type="text"
								value={regCon.email}
								onChange={(e) => {
									if (emailRegex.test(e.target.value)) {
										setError("");
									}
									regCon.setEmail(e.target.value);
								}}
							/>
						</div>
						<div
							className={
								error === "Пароль должен быть не менее 7 символов" ||
								(regCon.password === "" && error)
									? "inputStyle error"
									: "inputStyle"
							}
						>
							<input
								placeholder="Пароль"
								type="password"
								value={regCon.password}
								onChange={(e) => {
									if (e.target.value.length >= 7) {
										setError("");
									}
									regCon.setPassword(e.target.value);
								}}
							/>
						</div>
						<div
							onClick={() => regCon.setConfirmOne(!regCon.confirmOne)}
							className={
								regCon.confirmOne === false && error ? "checkBox error" : "checkBox"
							}
						>
							<div className={regCon.confirmOne ? "checkBoxMain active" : "checkBoxMain"}>
								<svg
									width="10"
									height="8"
									viewBox="0 0 10 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 1L3.40002 7L1 4.42856"
										stroke="white"
										strokeWidth="1.17523"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<p>Подтверждаю данные</p>
						</div>
						<div
							onClick={() => regCon.setConfirmTwo(!regCon.confirmTwo)}
							className={
								regCon.confirmTwo === false && error ? "checkBox error" : "checkBox"
							}
						>
							<div className={regCon.confirmTwo ? "checkBoxMain active" : "checkBoxMain"}>
								<svg
									width="10"
									height="8"
									viewBox="0 0 10 8"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M9 1L3.40002 7L1 4.42856"
										stroke="white"
										strokeWidth="1.17523"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
							</div>
							<p>Согласен с условиями политики конфиденциальности</p>
						</div>
						<div className="buttonStyle">
							<button type="submit">
								<span>Регистрация</span>
							</button>
						</div>
					</>
				) : (
					<div className="loader">
						<img
							src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
							alt="loader"
						/>
					</div>
				)}
			</form>
		</>
	);
};

export default MainRegister;
