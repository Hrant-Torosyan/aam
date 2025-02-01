import React, {useEffect, useState} from "react";
import "./UserLvl.scss";
import Diagram from "../Diagram/Diagram";
import {CareerLevels} from "../../../../api/career";
const UserLvl = ({ levelValue, nextLevelUserCount, nextLevelInvestAmount }) => {

	const [careerData, setCareerData] = useState({
		referralLinkedUserCount: 0,
		registeredUserCount: 0,
		investedCount: 0,
		referralEarnedAmount: 0,
		referralProfitAmount: 0,
	});

	useEffect(() => {
		const fetchCareerData = async () => {
			try {
				const res = await CareerLevels();
				if (res) {
					setCareerData(res);
				} else {
					console.error("No career data received");
				}
			} catch (error) {
				console.error("Error fetching career data:", error);
			}
		};

		fetchCareerData();
	}, []);


	return (
		<div className="userLvl">
			<div className="userLvlTitle">
				<Diagram percentage={50}/>
				<h1>Твой уровень: {levelValue}</h1>
			</div>
			<div className="userLvlInfoContainer">
				<div className="userLvlInfo">
					<div className="userLvlInfoName">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M4 12V22C4 24.8284 4 26.2426 4.87868 27.1213C5.75736 28 7.17157 28 10 28H22C24.8284 28 26.2426 28 27.1213 27.1213C28 26.2426 28 24.8284 28 22V10C28 7.17157 28 5.75736 27.1213 4.87868C26.2426 4 24.8284 4 22 4H12"
								stroke="url(#paint0_linear_317_23924)"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<path
								d="M20 20V21H21V20H20ZM10.0404 8.62623C9.64992 8.2357 9.01675 8.2357 8.62623 8.62623C8.2357 9.01675 8.2357 9.64992 8.62623 10.0404L10.0404 8.62623ZM19 10.6667V20H21V10.6667H19ZM20 19H10.6667V21H20V19ZM20.7071 19.2929L10.0404 8.62623L8.62623 10.0404L19.2929 20.7071L20.7071 19.2929Z"
								fill="url(#paint1_linear_317_23924)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_317_23924"
									x1="-1.65289"
									y1="-29"
									x2="34.9591"
									y2="-25.3933"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_317_23924"
									x1="22.5124"
									y1="34.6667"
									x2="6.24041"
									y2="33.0637"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
							</defs>
						</svg>
						<p>Перешли по ссылке</p>
					</div>
					<h4>{careerData.referralLinkedUserCount}</h4>
				</div>
				<div className="userLvlInfo">
					<div className="userLvlInfoName">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M26.4801 25.8163C27.0697 25.6934 27.4207 25.0777 27.1458 24.5418C26.3487 22.9879 25.0255 21.6224 23.3052 20.5957C21.2095 19.3449 18.6417 18.667 16.0001 18.667C13.3585 18.667 10.7907 19.3449 8.69496 20.5957C6.97471 21.6224 5.65144 22.9879 4.85437 24.5418C4.57948 25.0777 4.93051 25.6934 5.52012 25.8162L7.83923 26.2996C13.222 27.4214 18.7782 27.4214 24.161 26.2996L26.4801 25.8163Z"
								fill="url(#paint0_linear_317_23927)"
							/>
							<circle
								cx="16"
								cy="10.6667"
								r="6.66667"
								fill="url(#paint1_linear_317_23927)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_317_23927"
									x1="-1.05129"
									y1="5.83366"
									x2="32.6393"
									y2="14.0771"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_317_23927"
									x1="6.19283"
									y1="-14.3333"
									x2="26.5328"
									y2="-12.3296"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
							</defs>
						</svg>

						<p>Зарегистрировано партнеров</p>
					</div>
					<h4>{careerData.registeredUserCount}</h4>
				</div>
				<div className="userLvlInfo">
					<div className="userLvlInfoName">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<circle
								cx="16.0001"
								cy="12.0003"
								r="5.33333"
								fill="url(#paint0_linear_317_23928)"
							/>
							<circle cx="22.6667" cy="12" r="4" fill="url(#paint1_linear_317_23928)" />
							<circle cx="9.33333" cy="12" r="4" fill="url(#paint2_linear_317_23928)" />
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M23.4247 23.9997H26.8951C27.4868 23.9997 27.9405 23.4904 27.8131 22.9127C27.3967 21.0233 26.1388 17.333 22.6668 17.333C21.4854 17.333 20.5603 17.7603 19.8375 18.3985C21.8478 19.7028 22.8873 21.9866 23.4247 23.9997Z"
								fill="url(#paint3_linear_317_23928)"
							/>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M12.1625 18.3985C11.4397 17.7603 10.5147 17.333 9.33322 17.333C5.86119 17.333 4.60333 21.0233 4.18686 22.9127C4.0595 23.4904 4.51323 23.9997 5.10485 23.9997H8.57528C9.11273 21.9866 10.1522 19.7028 12.1625 18.3985Z"
								fill="url(#paint4_linear_317_23928)"
							/>
							<path
								d="M15.9999 18.667C21.1958 18.667 22.3421 23.5266 22.595 25.6707C22.6596 26.2192 22.2188 26.667 21.6665 26.667H10.3332C9.78092 26.667 9.3401 26.2192 9.40479 25.6707C9.65767 23.5266 10.804 18.667 15.9999 18.667Z"
								fill="url(#paint5_linear_317_23928)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_317_23928"
									x1="8.1544"
									y1="-7.99967"
									x2="24.4264"
									y2="-6.39672"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_317_23928"
									x1="16.7824"
									y1="-3"
									x2="28.9864"
									y2="-1.79778"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint2_linear_317_23928"
									x1="3.44903"
									y1="-3"
									x2="15.653"
									y2="-1.79778"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint3_linear_317_23928"
									x1="17.9539"
									y1="8.16634"
									x2="30.1023"
									y2="9.60194"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint4_linear_317_23928"
									x1="2.28166"
									y1="8.16634"
									x2="14.4301"
									y2="9.60194"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint5_linear_317_23928"
									x1="6.19271"
									y1="7.66699"
									x2="26.191"
									y2="10.9504"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
							</defs>
						</svg>

						<p>Количество партнеров</p>
					</div>
					<h4>{careerData.investedCount}</h4>
				</div>

				<div className="userLvlInfo">
					<div className="userLvlInfoName">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								fillRule="evenodd"
								clipRule="evenodd"
								d="M7.2999 19.8845C6.77338 20.0256 6.51011 20.0961 6.41507 20.3215C6.32003 20.5469 6.44504 20.7699 6.69506 21.2161C7.21723 22.1478 7.87906 23.0006 8.66227 23.7429C10.1585 25.1611 12.0337 26.1153 14.0609 26.4901C16.0881 26.8648 18.1804 26.6441 20.0848 25.8547C21.9892 25.0652 23.6241 23.7408 24.7915 22.0417C25.959 20.3425 26.609 18.3415 26.663 16.2807C26.7171 14.2198 26.1727 12.1875 25.0959 10.4295C24.0191 8.67155 22.4559 7.26331 20.5955 6.37515C19.1142 5.66798 17.495 5.31465 15.8648 5.33533C15.3534 5.34182 15.0977 5.34506 14.95 5.54006C14.8023 5.73506 14.8729 5.99834 15.014 6.5249L17.3712 15.3224L17.3738 15.3319C17.3862 15.3769 17.4279 15.5287 17.4473 15.6793C17.4741 15.8867 17.4907 16.2942 17.2452 16.7194C16.9998 17.1445 16.6385 17.3339 16.4456 17.4144C16.3054 17.4729 16.1531 17.5127 16.1079 17.5245L16.1079 17.5245L16.0984 17.527L7.2999 19.8845Z"
								fill="#85CAFF"
							/>
							<path
								d="M12.808 4.08724C12.6843 3.62566 12.6225 3.39488 12.4296 3.29295C12.2367 3.19102 12.0224 3.26605 11.5939 3.4161C10.2604 3.883 9.00756 4.55962 7.88331 5.42228C6.49418 6.4882 5.3286 7.81728 4.45312 9.33366C3.57764 10.85 3.00941 12.524 2.78086 14.26C2.5959 15.6649 2.63636 17.0882 2.89874 18.4765C2.98307 18.9227 3.02523 19.1458 3.20995 19.2619C3.39468 19.3779 3.62547 19.3161 4.08704 19.1924L15.0342 16.2591C15.4895 16.1371 15.7172 16.0761 15.8208 15.8968C15.9243 15.7174 15.8633 15.4897 15.7413 15.0344L12.808 4.08724Z"
								fill="url(#paint0_linear_317_23926)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_317_23926"
									x1="-3.6142"
									y1="-33.9997"
									x2="37.0658"
									y2="-29.9923"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
							</defs>
						</svg>

						<p>Объем продаж партнеров</p>
					</div>
					<h4>{careerData.referralProfitAmount}</h4>
				</div>
				<div className="userLvlInfo">
					<div className="userLvlInfoName">
						<svg
							width="32"
							height="32"
							viewBox="0 0 32 32"
							fill="none"
							xmlns="http://www.w3.org/2000/svg"
						>
							<path
								d="M25.3335 25.333H6.66679"
								stroke="url(#paint0_linear_317_23925)"
								strokeWidth="2"
								strokeLinecap="round"
							/>
							<path
								d="M12.6665 10.667H11.3332C10.2286 10.667 9.33321 11.5624 9.33321 12.667V19.3337C9.33321 20.4382 10.2286 21.3337 11.3332 21.3337H12.6665C13.7711 21.3337 14.6665 20.4382 14.6665 19.3337V12.667C14.6665 11.5624 13.7711 10.667 12.6665 10.667Z"
								fill="url(#paint1_linear_317_23925)"
							/>
							<path
								d="M20.6665 5.33301H19.3332C18.2286 5.33301 17.3332 6.22844 17.3332 7.33301V19.333C17.3332 20.4376 18.2286 21.333 19.3332 21.333H20.6665C21.7711 21.333 22.6665 20.4376 22.6665 19.333V7.33301C22.6665 6.22844 21.7711 5.33301 20.6665 5.33301Z"
								fill="url(#paint2_linear_317_23925)"
							/>
							<defs>
								<linearGradient
									id="paint0_linear_317_23925"
									x1="2.2701"
									y1="23.958"
									x2="8.83247"
									y2="36.0253"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint1_linear_317_23925"
									x1="8.07701"
									y1="-3.99967"
									x2="16.2721"
									y2="-3.59603"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
								<linearGradient
									id="paint2_linear_317_23925"
									x1="16.077"
									y1="-16.667"
									x2="24.2831"
									y2="-16.3975"
									gradientUnits="userSpaceOnUse"
								>
									<stop offset="0.00394059" stopColor="#2C73F3" />
									<stop offset="1" stopColor="#30CDE7" />
								</linearGradient>
							</defs>
						</svg>

						<p>Заработано на комиссии</p>
					</div>
					<h4>{careerData.referralEarnedAmount}</h4>
				</div>
			</div>
		</div>
	);
};

export default UserLvl;
