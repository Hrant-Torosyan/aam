import React, { useContext, useState } from "react";
import { checkEmail } from "../../../api/autorisation";
import { ResetPassContext } from "./ResetPassword";

const Email = () => {
	const passCont = useContext(ResetPassContext);
	const [error, setError] = useState("");
	const [loading, setLoading] = useState(true);

	const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

	const handleRegister = (event) => {
		event.preventDefault();

		if (!passCont.email.trim()) {
			setError("Заполните поле");
			return;
		} else if (!emailRegex.test(passCont.email)) {
			setError("Неправильный формат email");
			return;
		}
		setLoading(false);
		checkEmail({
			email: passCont.email,
		}).then((res) => {
			if (res === 200) {
				passCont.setStep(1);
			} else {
				setError("Такой e-mail не существует");
			}
			setLoading(true);
		});
	};

	return (
		<form onSubmit={handleRegister} className="resetPassword" id="email">
			{loading ? (
				<>
					<div onClick={() => passCont.setPage("login")} className="prevBtn">
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
					<p>Введите E-mail, на который зарегистрирован аккаунт</p>
					<span className="errors">{error}</span>
					<div
						className={
							error === "Неправильный формат email" ||
							error === "Такой e-mail не существует" ||
							(passCont.email === "" && error)
								? "inputStyle error"
								: "inputStyle"
						}
					>
						<input
							onChange={(e) => {
								if (emailRegex.test(e.target.value)) {
									setError("");
								}
								passCont.setEmail(e.target.value);
							}}
							placeholder="Email"
							type="text"
						/>
					</div>
					<div className="buttonStyle">
						<button>
							<span>Далее</span>
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

export default Email;
