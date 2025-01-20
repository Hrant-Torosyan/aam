import React, { useContext, useState } from "react";
import { RegisterContext } from "./RegisterPage";

const MainRegisterItem = () => {
	let regCon = useContext(RegisterContext);
	const [error, setError] = useState("");

	const handleNext = (event) => {
		event.preventDefault();
		if (!regCon.companyName.trim() || !regCon.investmentAmount.trim() || !regCon.investmentExperience.trim()) {
			setError("Заполните поле");

			return;
		}
		regCon.setStep(1);
	};

	return (
		<>
			<form className="registerPage" onSubmit={handleNext}>
				<h1>Регистрация</h1>
				<span className="errors">{error}</span>

				<div onClick={() => regCon.setPage("login")} className="prevBtn">
					<svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
						<path d="M19.8333 9.91602L12.75 16.9993L19.8333 24.0827" stroke="#0E1A32" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
					</svg>
				</div>
				<div className={regCon.companyName === "" && error ? "inputStyle error" : "inputStyle"}>
					<input placeholder="Название компании" type="text" value={regCon.companyName} onChange={(e) => regCon.setCompanyName(e.target.value)} />
				</div>
				<div className={regCon.investmentAmount === "" && error ? "inputStyle error" : "inputStyle"}>
					<input placeholder="Введите сумму инвестиций" type="text" value={regCon.investmentAmount} onChange={(e) => regCon.setInvestmentAmount(e.target.value)} />
				</div>
				<div className={regCon.investmentExperience === "" && error ? "inputStyle error" : "inputStyle"}>
					<input placeholder="Какой у Вас опыт в инвестировании" type="text" value={regCon.investmentExperience} onChange={(e) => regCon.setInvestmentExperience(e.target.value)} />
				</div>
				<div className="buttonStyle">
					<button type="submit">
						<span>Далее</span>
					</button>
				</div>
			</form>
		</>
	);
};

export default MainRegisterItem;
