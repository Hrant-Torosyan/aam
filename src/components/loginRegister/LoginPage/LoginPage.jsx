import React, { useState } from "react";
import "./LoginPage.scss";
import { useNavigate } from "react-router-dom";
import { login } from "../../../api/autorisation";
const LoginPage = ({ setPage }) => {
	const navigate = useNavigate();
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const handleLogin = (event) => {
		event.preventDefault();

		if (!email.trim() || !password.trim()) {
			setError("Заполните поле");
			return;
		}
		setLoading(false);
		login({
			email: email,
			password: password,
		}).then((res) => {
			if (res === 200) {
				navigate("/");
			} else {
				setError("Неправильный логин или пароль");
			}
			setLoading(true);
		});
	};

	return (
		<>
			<form id="loginPage" onSubmit={handleLogin}>
				{loading ? (
					<>
						<h1>Вход</h1>
						<h2>Добро пожаловать!</h2>

						<span className="errors">{error}</span>
						<div
							className={
								error === "Неправильный логин или пароль" || (email === "" && error)
									? "inputStyle error"
									: "inputStyle"
							}
						>
							<input
								placeholder="Email"
								type="text"
								value={email}
								onChange={(e) => {
									setEmail(e.target.value);
								}}
							/>
						</div>
						<div
							className={
								error === "Неправильный логин или пароль" || (password === "" && error)
									? "inputStyle error"
									: "inputStyle"
							}
						>
							<input
								placeholder="Пароль"
								type="password"
								value={password}
								onChange={(e) => {
									setPassword(e.target.value);
								}}
							/>
						</div>
						<p onClick={() => setPage("resetPassword")}>Забыли пароль?</p>
						<div className="buttonStyle">
							<button type="submit">
								<span>Войти</span>
							</button>
						</div>
						<div onClick={() => setPage("register")} className="buttonStyleToo">
							<div>
								<span>Регистрация</span>
							</div>
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

export default LoginPage;
