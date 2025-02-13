import React, { lazy, useState, useEffect } from "react";
import "./Profile.scss";
import "./ProfileResposive.scss";

const ProfileEdit = lazy(() => import("./ProfileEdit"));
const MainProfileNew = lazy(() => import("./MainProfileNew/MainProfileNew"));

const Profile = () => {
	const [profilePage, setProfilePage] = useState("MainProfileNew");
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	useEffect(() => {
		const handleResize = () => {
			setIsSmallScreen(window.innerWidth < 560);
		};

		window.addEventListener("resize", handleResize);

		handleResize();

		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	useEffect(() => {
		if (isSmallScreen) {
			const parentElement = document.querySelector("main");
			if (parentElement) {
				const padding = profilePage === "MainProfileNew" ? "0" : "";
				parentElement.style.paddingLeft = padding;
				parentElement.style.paddingRight = padding;
			}
		}
	}, [profilePage, isSmallScreen]);

	const CurrentPage = profilePage === "MainProfileNew" ? MainProfileNew : ProfileEdit;
	return <CurrentPage setProfilePage={setProfilePage} />;
};

export default Profile;
