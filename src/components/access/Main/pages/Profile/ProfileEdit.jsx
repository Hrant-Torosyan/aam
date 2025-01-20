import React, { Suspense, useContext, useEffect, useState } from "react";
import ImageUploader from "./ImageUploader";
import InputDate from "./InputDate";
import { GetUerInfo, ResetPassword, SetUerInfo, SetUserImage } from "../../../../../api/profile";
import { MainContext } from "../../../../../app/App";

const ProfileEdit = ({ setProfilePage }) => {
	let glData = useContext(MainContext);

	const [loading, setLoading] = useState(true);
	const [image, setImage] = useState(null);
	const [imageUrl, setImageUrl] = useState(null);
	const [name, setName] = useState("");
	const [day, setDay] = useState(null);
	const [month, setMonth] = useState(null);
	const [year, setYear] = useState(null);
	const [email, setEmail] = useState("");
	const [surname, setSurname] = useState("");
	const [phone, setPhone] = useState("");
	const [city, setCity] = useState("");
	const [website, setWebsite] = useState("");
	const [oldPassword, setOldPassword] = useState("");
	const [newPassword, setNewPassword] = useState("");
	const [errorDate, setErrorDate] = useState(false);

	const [error, setError] = useState("");

	useEffect(() => {
		GetUerInfo().then((res) => {
			let userDate = res.birthDay ? new Date(+res.birthDay) : "";

			let nameUser = res.fullName.split(" ")[0];
			let surnameUser = res.fullName.split(" ")[1] || "";

			setImageUrl(res.image);
			setName(nameUser || "");
			setDay(userDate ? userDate.getDate() : "");
			setMonth(userDate ? userDate.getMonth() + 1 : "");
			setYear(userDate ? userDate.getFullYear() : "");
			setEmail(res.email || "");
			setSurname(surnameUser || "");
			setPhone(res.phone || "");
			setCity(res.city || "");
			setWebsite(res.website || "");
			setLoading(true);
		});
	}, []);

	const handleSubmitEditForm = async () => {
		let dateForm = null;
		const currentDate = new Date();
		const currentYear = currentDate.getFullYear();
		const currentMs = currentDate.getTime();
		if (day && month && year) {
			if (day >= 1 && day <= 31 && month >= 1 && month <= 12 && year >= currentYear - 110) {
				dateForm = new Date(year, month - 1, day).getTime();
				if (dateForm > currentMs) {
					setErrorDate(true);
					return;
				}
			} else {
				setErrorDate(true);
				return;
			}
		}

		const imageName = image !== null ? await SetUserImage(image) : null;

		if (imageName !== null) {
			glData.setImageInfo(!glData.imageInfo);
		}

		if (oldPassword.trim() && newPassword.trim()) {
			if (newPassword.trim().length < 8) {
				setError("Пароль должен быть не менее 7 символов");
				return;
			}
			ResetPassword({
				oldPassword: oldPassword,
				newPassword: newPassword,
			}).then((res) => {
				if (res.success === true) {
					SetUerInfo({
						email: email,
						fullName: `${name} ${surname}`,
						companyName: "string",
						investmentAmount: "string",
						investmentExperience: "string",
						image:
							imageName === null ? (imageUrl === null ? null : imageUrl.name) : imageName,
						birthDay: dateForm,
						city: city,
						phone: phone,
						website: website,
					}).then((res) => {
						setProfilePage("MainProfile");
					});
				} else {
					setError("Неверный пароль");
				}
			});
		} else {
			SetUerInfo({
				email: email,
				fullName: `${name} ${surname}`,
				companyName: "string",
				investmentAmount: "string",
				investmentExperience: "string",
				image: imageName === null ? (imageUrl === null ? null : imageUrl.name) : imageName,
				birthDay: dateForm,
				city: city,
				phone: phone,
				website: website,
			}).then((res) => {
				setProfilePage("MainProfile");
			});
		}
	};
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
			{loading ? (
				<div className="profileEdit">
					<div className="mainProfileTitle">
						<h1>Редактирование профиля</h1>
					</div>

					<div className="profileEditContent">
						<div className="profileImage">
							<ImageUploader
								imageUrl={imageUrl === null ? "./images/avatar.png" : imageUrl?.url}
								image={image}
								setImage={setImage}
							/>
							<div onClick={handleSubmitEditForm} className="button">
								<button>
									<p>Сохранить и выйти</p>
								</button>
							</div>
						</div>

						<div className="profileEditInputs">
							<div className="profileEditInputsList">
								<div className="profileEditInput">
									<p>Имя</p>
									<div className="inputStyle">
										<input
											type="text"
											value={name}
											onChange={(e) => setName(e.target.value)}
										/>
									</div>
								</div>
								<div className="profileEditInput ">
									<p>Дата рождения</p>
									<div className="profileEditInputDateList">
										<InputDate
											errorDate={errorDate}
											placeholder={"День"}
											number={day}
											setNumber={setDay}
										/>
										<InputDate
											errorDate={errorDate}
											placeholder={"Месяц"}
											number={month}
											setNumber={setMonth}
										/>
										<InputDate
											errorDate={errorDate}
											placeholder={"Год"}
											number={year}
											setNumber={setYear}
										/>
									</div>
								</div>
								<div className="profileEditInput">
									<p>E-mail</p>
									<div className="inputStyle">
										<input
											disabled
											type="text"
											value={email}
											onChange={(e) => setEmail(email)}
										/>
									</div>
								</div>
							</div>
							<div className="profileEditInputsList">
								<div className="profileEditInput">
									<p>Фамилия</p>
									<div className="inputStyle">
										<input
											type="text"
											value={surname}
											onChange={(e) => setSurname(e.target.value)}
										/>
									</div>
								</div>

								<div className="profileEditInput ">
									<p>Сотовый</p>
									<div className="profileEditInputPhone">
										<div className="inputStyle">
											<div className="plus">+</div>
											<input
												type="number"
												value={phone}
												onChange={(e) => setPhone(e.target.value)}
											/>
										</div>
									</div>
								</div>
								<div className="profileEditInput">
									<p>Город</p>
									<div className="inputStyle">
										<input
											type="text"
											value={city}
											onChange={(e) => setCity(e.target.value)}
										/>
									</div>
								</div>
							</div>
							<div className="profileEditInput">
								<p>Сайт</p>
								<div className="inputStyle">
									<input
										type="text"
										value={website}
										onChange={(e) => setWebsite(e.target.value)}
									/>
								</div>
							</div>
							<div className="line"></div>

							<div className="profileEditInputsList">
								<div className="profileEditInput">
									<p>Старый пароль</p>
									<div
										className={
											error === "Неверный пароль" ? "inputStyle error" : "inputStyle"
										}
									>
										<input
											autoComplete="off"
											type="password"
											value={oldPassword}
											onChange={(e) => {
												setError("");
												setOldPassword(e.target.value);
											}}
										/>
									</div>
								</div>
							</div>
							<div className="profileEditInputsList">
								<div className="profileEditInput">
									<p>Новый пароль</p>
									<div
										className={
											error === "Пароль должен быть не менее 7 символов"
												? "inputStyle error"
												: "inputStyle"
										}
									>
										<input
											autoComplete="off"
											type="password"
											value={newPassword}
											onChange={(e) => {
												if (e.target.value.length >= 7) {
													setError("");
												}
												setNewPassword(e.target.value);
											}}
										/>
									</div>
								</div>
							</div>
							<div onClick={handleSubmitEditForm} className="button mobileButton">
								<button>
									<p>Сохранить и выйти</p>
								</button>
							</div>
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
		</Suspense>
	);
};

export default ProfileEdit;
