import React, { lazy, useState } from "react";
import "./Profile.scss";
import "./ProfileResposive.scss";
const ProfileEdit = lazy(() => import("./ProfileEdit"));
const MainProfile = lazy(() => import("./MainProfile"));

const Profile = () => {
	const [profilePage, setProfilePage] = useState("MainProfile");
	return profilePage === "MainProfile" ? (
		<MainProfile setProfilePage={setProfilePage} />
	) : (
		<ProfileEdit setProfilePage={setProfilePage} />
	);
};

export default Profile;
