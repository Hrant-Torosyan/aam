import React, { createContext, useState } from "react";
import "./RegisterPage.scss";
import MainRegisterItem from "./MainRegisterItem";
import MainRegister from "./MainRegister";

export const RegisterContext = createContext();
const RegisterPage = ({ setPage }) => {
	const [step, setStep] = useState(0);
	const [companyName, setCompanyName] = useState("");
	const [investmentAmount, setInvestmentAmount] = useState("");
	const [investmentExperience, setInvestmentExperience] = useState("");
	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [confirmOne, setConfirmOne] = useState(false);
	const [confirmTwo, setConfirmTwo] = useState(false);

	return (
		<RegisterContext.Provider
			value={{
				setPage: setPage,
				step: step,
				setStep: setStep,
				companyName: companyName,
				setCompanyName: setCompanyName,
				investmentAmount: investmentAmount,
				setInvestmentAmount: setInvestmentAmount,
				investmentExperience: investmentExperience,
				setInvestmentExperience: setInvestmentExperience,
				email: email,
				setEmail: setEmail,
				password: password,
				setPassword: setPassword,
				fullName: fullName,
				setFullName: setFullName,
				confirmOne: confirmOne,
				setConfirmOne: setConfirmOne,
				confirmTwo: confirmTwo,
				setConfirmTwo: setConfirmTwo,
			}}
		>
			{step === 0 ? <MainRegisterItem /> : <MainRegister />}
		</RegisterContext.Provider>
	);
};

export default RegisterPage;
