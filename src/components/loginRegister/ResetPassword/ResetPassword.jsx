import React, { createContext, useState } from "react";
import "./ResetPassword.scss";
import Email from "./Email";
import Code from "./Code";
import NewPassword from "./NewPassword";
export const ResetPassContext = createContext();
const ResetPassword = ({ setPage }) => {
	const [step, setStep] = useState(0);
	const [email, setEmail] = useState("");
	const [enteredCode, setEnteredCode] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [register, setRegister] = useState("");
	return (
		<ResetPassContext.Provider
			value={{
				setStep: setStep,
				setPage: setPage,
				email: email,
				setEmail: setEmail,
				enteredCode: enteredCode,
				setEnteredCode: setEnteredCode,
				newPassword: newPassword,
				setNewPassword: setNewPassword,
				confirmPassword: confirmPassword,
				setConfirmPassword: setConfirmPassword,
				register: register,
				setRegister: setRegister,
			}}
		>
			{step === 0 ? <Email /> : step === 1 ? <Code /> : <NewPassword />}
		</ResetPassContext.Provider>
	);
};

export default ResetPassword;
