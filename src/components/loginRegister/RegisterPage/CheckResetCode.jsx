import React, { useContext, useState } from "react";
import { RegisterContext } from "../RegisterPage";

const CheckResetCode = ({ handlePageChange }) => {
    const { resetCode, setResetCode, newPassword, setNewPassword } = useContext(RegisterContext);
    const [errorMessage, setErrorMessage] = useState("");

    const handleResetPassword = () => {
        if (resetCode === "validCode") {
            alert("Password reset successfully");
            handlePageChange("login");
        } else {
            setErrorMessage("Invalid reset code. Please try again.");
        }
    };

    return (
        <div>
            <h2>Enter Reset Code and New Password</h2>
            <input
                type="text"
                placeholder="Enter reset code"
                value={resetCode}
                onChange={(e) => setResetCode(e.target.value)}
            />
            <input
                type="password"
                placeholder="Enter new password"
                value={newPassword}
                onChange={(e) => setNewPassword(e.target.value)}
            />
            <button onClick={handleResetPassword}>Reset Password</button>
            {errorMessage && <p>{errorMessage}</p>}
        </div>
    );
};

export default CheckResetCode;