import React, { useState, useEffect, useContext } from "react";
import { validateCode } from "../../../api/autorisation";
import { ResetPassContext } from "./ResetPassword";

function Code({ setStep }) {
	const passCont = useContext(ResetPassContext);

	const [inputs, setInputs] = useState(Array.from({ length: 4 }, () => ""));
	const [isInputEmpty, setIsInputEmpty] = useState(true);
	const [isTrue, setIsTrue] = useState(true);
	const [loading, setLoading] = useState(false);

	useEffect(() => {
		setIsInputEmpty(inputs.some((input) => input === ""));
		passCont.setEnteredCode(inputs.join(""));
	}, [inputs, passCont]);

	const handleChange = (index, value) => {
		const newInputs = [...inputs];
		newInputs[index] = value;
		setInputs(newInputs);
		if (value.length === 1 && index < inputs.length - 1) {
			const nextInput = document.getElementById(`code-input-${index + 1}`);
			nextInput.focus();
		} else if (value === "" && index > 0) {
			const prevInput = document.getElementById(`code-input-${index - 1}`);
			prevInput.focus();
		}
	};

	const handlePaste = (event) => {
		const paste = event.clipboardData.getData("text");
		if (paste.length === inputs.length) {
			const newInputs = paste.split("");
			setInputs(newInputs);
			event.preventDefault();
		}
	};

	const handleSubmit = async (event) => {
		event.preventDefault();
		setLoading(true);
		try {
			const res = await validateCode({
				email: passCont.email,
				code: passCont.enteredCode,
			});
			if (res === 200) {
				passCont.setStep(2);
			} else {
				setIsTrue(false);
				setInputs(Array.from({ length: 4 }, () => ""));
			}
		} catch (error) {
			console.error("Ошибка при проверке кода:", error);
		}
		setLoading(false);
	};

	return (
		<form className="resetPassword" onSubmit={handleSubmit}>
			{!loading ? (
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
					<p>Введите код, который мы отправили на Вашу почту</p>
					<div className="codeInputs">
						{inputs.map((input, index) => (
							<div key={index} className={isTrue ? "codeInput" : "codeInput error"}>
								<input
									id={`code-input-${index}`}
									type="text"
									maxLength="1"
									value={input}
									onChange={(e) => handleChange(index, e.target.value)}
									onPaste={handlePaste}
								/>
							</div>
						))}
					</div>
					<div className={isInputEmpty ? "buttonStyle dis" : "buttonStyle "}>
						<button type="submit">
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
}

export default Code;
