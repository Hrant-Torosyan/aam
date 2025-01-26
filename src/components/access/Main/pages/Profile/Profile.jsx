import React, { lazy, useState } from "react";
import "./Profile.scss";
import "./ProfileResposive.scss";
const ProfileEdit = lazy(() => import("./ProfileEdit"));
const MainProfileNew = lazy(() => import("./MainProfileNew"));

const Profile = () => {
	const [profilePage, setProfilePage] = useState("MainProfileNew");
	return profilePage === "MainProfileNew" ? (
		<MainProfileNew setProfilePage={setProfilePage} />
	) : (
		<ProfileEdit setProfilePage={setProfilePage} />
	);
};

export default Profile;
