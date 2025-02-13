import React, { useContext, useState } from "react";
import { RegisterContext } from "./RegisterPage";
import { signup } from "../../../api/autorisation";
import { useNavigate } from "react-router-dom";
import eye from "../../svg/eye.svg";
import eyeHide from "../../svg/eyeHide.svg";

const MainRegister = () => {
	const regCon = useContext(RegisterContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);
	const [showRepeatPassword, setShowRepeatPassword] = useState(false);
	const [passwordsChecked, setPasswordsChecked] = useState(false);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
	const navigate = useNavigate();

	const handleRegister = (event) => {
		event.preventDefault();

		if (
			!regCon.email.trim() ||
			!regCon.password.trim() ||
			!regCon.fullName.trim() ||
			!regCon.confirmOne ||
			!regCon.confirmTwo ||
			!regCon.repeatPassword ||
			!regCon.repeatPassword.trim()
		) {
			setError("Заполните поле");
			return;
		}
		if (regCon.password.trim().length < 8) {
			setError("Пароль должен быть не менее 7 символов");
			return;
		}
		if (!emailRegex.test(regCon.email)) {
			setError("Неправильный формат email");
			return;
		}
		if (regCon.password !== regCon.repeatPassword) {
			setError("Пароли не совпадают");
			return;
		}

		setPasswordsChecked(true);

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

	const handleGoToLoginPage = () => {
		regCon.setStep(1);
	};

	return (
		<>
			<form className="registerPage" onSubmit={handleRegister}>
				<div onClick={handleGoToLoginPage} className="prevBtn">
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
				{loading ? (
					<>
						<h1>Регистрация</h1>
						<span className="errors">{error}</span>

						<div
							className={regCon.fullName === "" && error ? "inputStyle error" : "inputStyle"}
						>
							<input
								placeholder="Имя"
								type="text"
								value={regCon.fullName}
								onChange={(e) => {
									setError("");
									regCon.setFullName(e.target.value);
								}}
							/>
						</div>

						<div
							className={
								["Неправильный формат email", "Такой e-mail уже существует"].includes(error) ||
								(regCon.email === "" && error)
									? "inputStyle error"
									: "inputStyle"
							}
						>
							<input
								placeholder="Электронная почта"
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

						<div className={error.includes("Пароль") ? "inputStyle error" : "inputStyle"}>
							<div className="passwordInput">
								<input
									placeholder="Пароль"
									type={showPassword ? "text" : "password"}
									value={regCon.password}
									onChange={(e) => {
										if (e.target.value.length >= 8) {
											setError("");
										}
										regCon.setPassword(e.target.value);
									}}
								/>
								<button
									type="button"
									className="togglePassword"
									onClick={() => setShowPassword(!showPassword)}
								>
									<img
										src={showPassword ? eye : eyeHide}
										alt={showPassword ? "Скрыть" : "Показать"}
									/>
								</button>
							</div>
						</div>

						<div
							className={regCon.repeatPassword.trim() === "" && error === "Заполните поле" ? "inputStyle error" : "inputStyle"}
						>
							<input
								placeholder="Повторите пароль"
								type={showRepeatPassword ? "text" : "password"}
								value={regCon.repeatPassword}
								onChange={(e) => {
									if (e.target.value === regCon.password) {
										setError("");
									}
									regCon.setRepeatPassword(e.target.value);
								}}
							/>
							<button
								type="button"
								className="togglePassword"
								onClick={() => setShowRepeatPassword(!showRepeatPassword)}
							>
								<img
									src={showRepeatPassword ? eye : eyeHide}
									alt={showRepeatPassword ? "Скрыть" : "Показать"}
								/>
							</button>
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