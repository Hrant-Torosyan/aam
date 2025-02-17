import React, { createContext, useState } from "react";
import "./RegisterPage.scss";
import MainRegister from "./MainRegister";
import LoginPage from "../LoginPage/LoginPage";
import Email from "../ResetPassword/Email";
import CheckResetCode from "../ResetPassword/ResetPassword";

export const RegisterContext = createContext();

const RegisterPage = ({ setPage }) => {
	const [step, setStep] = useState(0);
	const [companyName, setCompanyName] = useState("");
	const [investmentAmount, setInvestmentAmount] = useState("");
	const [investmentExperience, setInvestmentExperience] = useState("");
	const [password, setPassword] = useState("");
	const [fullName, setFullName] = useState("");
	const [confirmOne, setConfirmOne] = useState(false);
	const [confirmTwo, setConfirmTwo] = useState(false);
	const [repeatPassword, setRepeatPassword] = useState("");
	const [email, setEmail] = useState("");
	const [resetCode, setResetCode] = useState("");
	const [newPassword, setNewPassword] = useState("");

	const handlePageChange = (page) => {
		if (page === "register") {
			setStep(0);
		} else if (page === "login") {
			setStep(1);
		} else if (page === "resetPassword") {
			setStep(2);
		} else if (page === "checkResetCode") {
			setStep(3);
		}
	};

	return (
		<RegisterContext.Provider
			value={{
				setStep,
				step,
				setPage,
				companyName,
				setCompanyName,
				investmentAmount,
				setInvestmentAmount,
				investmentExperience,
				setInvestmentExperience,
				email,
				setEmail,
				password,
				setPassword,
				fullName,
				setFullName,
				confirmOne,
				setConfirmOne,
				confirmTwo,
				setConfirmTwo,
				repeatPassword,
				setRepeatPassword,
				resetCode,
				setResetCode,
				newPassword,
				setNewPassword,
				handlePageChange,
			}}
		>
			{step === 0 ? (
				<MainRegister handlePageChange={handlePageChange} />
			) : step === 1 ? (
				<LoginPage setPage={setPage} handlePageChange={handlePageChange} />
			) : step === 2 ? (
				<Email handlePageChange={handlePageChange} />
			) : (
				<CheckResetCode handlePageChange={handlePageChange} />
			)}
		</RegisterContext.Provider>
	);
};

export default RegisterPage;