import { useEffect } from "react";
import { Navigate } from "react-router-dom";
import { GetUerInfo } from "../api/profile";
import { logout } from "../api/autorisation";
const ProtectedRoutes = ({ children, href }) => {
	const login = window.localStorage.getItem("userAuth");
	// useEffect(() => {
	// 	if (login) {
	// 		GetUerInfo().then((res) => {
	// 			if (res.status) {
	// 				logout();
	// 			}
	// 		});
	// 	}
	// }, [login]);

	if (login) {
		return <Navigate to={href} replace={true} />;
	}
	return children;
};
export default ProtectedRoutes;
