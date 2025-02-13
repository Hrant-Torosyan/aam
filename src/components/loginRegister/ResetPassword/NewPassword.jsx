import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";

import { ResetPassContext } from "./ResetPassword";
import { resetPass } from "../../../api/autorisation";

import eye from "../../svg/eye.svg";
import eyeHide from "../../svg/eyeHide.svg";

const NewPassword = ({ setStep }) => {
	const navigate = useNavigate();

	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);
	const [showPassword, setShowPassword] = useState(false);  // State to toggle password visibility
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);  // State for confirm password visibility

	let passCont = useContext(ResetPassContext);

	const handleSubmit = async (e) => {
		e.preventDefault();
		if (!passCont.newPassword.trim() || !passCont.confirmPassword.trim()) {
			setError("Заполните поле");
			return;
		} else if (passCont.newPassword.trim().length < 7) {
			setError("Пароль должен быть не менее 7 символов");
			return;
		} else if (passCont.newPassword !== passCont.confirmPassword) {
			setError("Пароли не совпадают");
			return;
		}
		setLoading(false);
		resetPass({
			email: passCont.email,
			code: passCont.enteredCode,
			password: passCont.newPassword,
			passwordConfirm: passCont.confirmPassword,
		}).then((res) => {
			if (res === 200) {
				navigate("/");
			}
			setLoading(true);
		});
	};

	return (
		<form onSubmit={handleSubmit} className="resetPassword">
			{loading ? (
				<>
					<div onClick={() => passCont.setStep(0)} className="prevBtn">
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
					<h1>Восстановление пароля</h1>
					<p>Создайте новый пароль</p>
					<span className="errors">{error}</span>

					<div
						className={
							error === "Пароль должен быть не менее 7 символов" ||
							(passCont.newPassword === "" && error)
								? "inputStyle error"
								: "inputStyle"
						}
					>
						<input
							type={showPassword ? "text" : "password"} // Toggle between text and password
							placeholder="Введите новый пароль"
							value={passCont.newPassword}
							onChange={(e) => {
								if (e.target.value.length >= 7) {
									setError("");
								}
								passCont.setNewPassword(e.target.value);
							}}
						/>
						<img
							src={showPassword ? eye : eyeHide}
							alt="eye icon"
							className="eyeIcon"
							onClick={() => setShowPassword(!showPassword)} // Toggle visibility on click
						/>
					</div>
					<div
						className={
							(passCont.confirmPassword === "" && error) || error === "Пароли не совпадают"
								? "inputStyle error"
								: "inputStyle"
						}
					>
						<input
							type={showConfirmPassword ? "text" : "password"} // Toggle between text and password
							placeholder="Повторите пароль"
							value={passCont.confirmPassword}
							onChange={(e) => passCont.setConfirmPassword(e.target.value)}
						/>
						<img
							src={showConfirmPassword ? eye : eyeHide}
							alt="eye icon"
							className="eyeIcon"
							onClick={() => setShowConfirmPassword(!showConfirmPassword)} // Toggle visibility on click
						/>
					</div>
					<div className="buttonStyle">
						<button>
							<span>Сохранить</span>
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
	);
};

export default NewPassword;