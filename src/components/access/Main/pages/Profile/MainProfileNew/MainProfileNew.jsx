import React, { Suspense, useEffect, useState } from "react";
import { GetProfileCareer, GetUerInfo, GetProfit } from "../../../../../../api/profile";
import { MarketProducts } from "../../../../../../api/market";
import ProfileSlider from "../../../ProfileSlider/ProfileSlider";

import avatar from "../../../../../images/avatar.png";
import edit from "../../../../../svg/edit.svg";
import insta from "../../../../../svg/insta.svg";
import x from "../../../../../svg/х.svg";
import fb from "../../../../../svg/fb.svg";
import vk from "../../../../../svg/vk.svg";

import "./MainProfileNew.scss";
import "./MainProfileNewResponsive.scss";

const MainProfileNew = ({ setProfilePage, products }) => {
	const [userAllInfo, setUserAllInfo] = useState(null);
	const [formattedDate, setFormattedDate] = useState(null);
	const [profileProducts, setProfileProducts] = useState([]);
	const [amount, setAmount] = useState(0);
	const [careerInfo, setCareerInfo] = useState(0);
	const [filter, setFilter] = useState("all");

	console.log(products, "products");

	useEffect(() => {
		GetProfileCareer().then((res) => {
			setCareerInfo(res);
		});
	}, []);

	useEffect(() => {
		GetUerInfo().then((res) => {
			setUserAllInfo(res);

			if (res?.birthDay !== null) {
				let userDate = new Date(+res?.birthDay);

				setFormattedDate(
					`${userDate.getDate().toString().padStart(2, "0")}-${(userDate.getMonth() + 1)
						.toString()
						.padStart(2, "0")}-${userDate.getFullYear()}`
				);
			}
		});

		GetProfit().then((res) => {
			setAmount(res?.amount);
		});
	}, []);

	useEffect(() => {
		MarketProducts(filter, "").then((res) => {
			setProfileProducts(res.content);
		});
	}, [filter]);

	console.log(profileProducts, "profileProducts");

	return (
		<Suspense
			fallback={
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			}
		>
			{userAllInfo !== null && careerInfo !== null && profileProducts.length > 0 ? (
				<div className="mainProfile">
					<div className="mainProfileTitle">
						<h1>Мой профиль</h1>
					</div>
					<div className="mainInfo">
						<div className="userInfo">
							<div className="user">
								<div className="userContent">
									<div className="avatar">
										<img
											src={userAllInfo?.image?.url ? userAllInfo.image?.url : avatar}
											alt="user"
										/>
									</div>
									<div className="userName">
										<h1>{`${userAllInfo?.fullName.split(" ")[0]} ${
											userAllInfo?.fullName.split(" ").length !== 1
												? userAllInfo?.fullName.split(" ")[1]
												: ""
										}`}</h1>
									</div>
								</div>
								<div className="socialLinks">
									{userAllInfo?.instagramUrl && (
										<a href={userAllInfo.instagramUrl} rel="noreferrer" target="_blank">
											<img src={insta} alt="Instagram" />
										</a>
									)}
									{userAllInfo?.twitterUrl && (
										<a href={userAllInfo.twitterUrl} rel="noreferrer" target="_blank">
											<img src={x} alt="Twitter" />
										</a>
									)}
									{userAllInfo?.facebookUrl && (
										<a href={userAllInfo.facebookUrl} rel="noreferrer" target="_blank">
											<img src={fb} alt="Facebook" />
										</a>
									)}
									{userAllInfo?.vkUrl && (
										<a href={userAllInfo.vkUrl} rel="noreferrer" target="_blank">
											<img src={vk} alt="VK" />
										</a>
									)}
								</div>
							</div>
						</div>

						<div className="userOwnInfo">
							{formattedDate && (
								<div className="mainProfileUserInfos">
									<div className="mainProfileUserInfosImg">
										<img src="./images/date.png" alt="date" />
									</div>

									<div className="mainProfileUserInfosItem">
										<span>Дата рождения</span>
										<p>{formattedDate}</p>
									</div>
								</div>
							)}

							{userAllInfo?.city && (
								<div className="mainProfileUserInfos">
									<div className="mainProfileUserInfosImg">
										<img src="./images/map.png" alt="map" />
									</div>
									<div className="mainProfileUserInfosItem">
										<span>Город проживания</span>
										<p>{userAllInfo?.city}</p>
									</div>
								</div>
							)}
							{userAllInfo?.email && (
								<div className="mainProfileUserInfos">
									<div className="mainProfileUserInfosImg">
										<img src="./images/email.png" alt="email" />
									</div>
									<div className="mainProfileUserInfosItem">
										<span>E-mail</span>
										<p>{userAllInfo?.email}</p>
									</div>
								</div>
							)}
							{userAllInfo?.phone && (
								<div className="mainProfileUserInfos">
									<div className="mainProfileUserInfosImg">
										<img src="./images/phone.png" alt="phone" />
									</div>
									<div className="mainProfileUserInfosItem">
										<span>Телефон</span>
										<p>+{userAllInfo?.phone}</p>
									</div>
								</div>
							)}

							{userAllInfo?.website && (
								<div className="mainProfileUserInfos">
									<div className="mainProfileUserInfosImg">
										<img src="./images/site.png" alt="site" />
									</div>
									<div className="mainProfileUserInfosItem">
										<span>Веб-сайт</span>
										<p>
											<a
												target="_blank"
												rel="noopener noreferrer"
												href={userAllInfo?.website}
											>
												{userAllInfo?.website}
											</a>
										</p>
									</div>
								</div>
							)}
						</div>
						<div onClick={() => setProfilePage("ProfileEdit")} className="userInfoEdit">
							<div className="svgBackground">
								<img src={edit} alt="edit" />
							</div>
							<span>Редактировать профиль</span>
						</div>
					</div>
				</div>
			) : (
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			)}

			<ProfileSlider products={profileProducts} info={"Info"} />
		</Suspense>
	);
};

export default MainProfileNew;
