import "./App.scss";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import ProtectedRoutes from "./ProtectedRoutes";
import { createContext, lazy, useState } from "react";
import LayoutRoot from "../components/access/Layouts/LayoutRoot";
import Layout from "../components/access/Layouts/Layout";
import Profile from "../components/access/Main/pages/Profile/Profile";

const MainLogin = lazy(() => import("../components/loginRegister/MainLogin"));
const Analytics = lazy(() => import("../components/access/Main/pages/Analytics/Analytics"));
const Market = lazy(() => import("../components/access/Main/pages/Market/Market"));
const Briefcase = lazy(() => import("../components/access/Main/pages/Briefcase/Briefcase"));
const Wallet = lazy(() => import("../components/access/Main/pages/Wallet/Wallet"));
const Career = lazy(() => import("../components/access/Main/pages/Career/Career"));

export const MainContext = createContext();
const App = () => {
	const [hiddenHeader, setHiddenHeader] = useState("");
	const [imageInfo, setImageInfo] = useState(null);
	const [checkWallet, setCheckWallet] = useState(false);
	const [checkPay, setCheckPay] = useState(null);
	return (
		<MainContext.Provider
			value={{
				hiddenHeader: hiddenHeader,
				setHiddenHeader: setHiddenHeader,
				setImageInfo: setImageInfo,
				imageInfo: imageInfo,
				setCheckWallet: setCheckWallet,
				checkWallet: checkWallet,
				setCheckPay: setCheckPay,
				checkPay: checkPay,
			}}
		>
			<Router>
				<Routes>
					<Route path={"/login"} element={<MainLogin />} />
					<Route
						path={"/"}
						element={
							<ProtectedRoutes href={"/login"}>
								<LayoutRoot>
									<Layout />
								</LayoutRoot>
							</ProtectedRoutes>
						}
					>
						<Route path={"/"} element={<Analytics />} />
						<Route path={"/market"} element={<Market />} />
						<Route path={"/briefcase"} element={<Briefcase />} />
						<Route path={"/wallet"} element={<Wallet />} />
						<Route path={"/career"} element={<Career />} />
						<Route path={"/profile"} element={<Profile />} />
					</Route>
				</Routes>
			</Router>
		</MainContext.Provider>
	);
};

export default App;
