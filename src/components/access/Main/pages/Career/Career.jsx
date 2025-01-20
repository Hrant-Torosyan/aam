import React, { Suspense, useEffect, useState } from "react";
import "./Career.scss";
import "./CareerResponsive.scss";
import CopyOnClick from "../../CopyOnClick";
import UserLvl from "../../UserLvl/UserLvl";
import { GetProfileCareer, GetProfit } from "../../../../../api/profile";
const Career = () => {
	const [copied, setCopied] = useState(false);
	const [amount, setAmount] = useState(0);
	const [careerInfo, setCareerInfo] = useState({ referral: "sasasasa" });

	// useEffect(() => {
	// 	GetProfit().then((res) => {
	// 		setAmount(res.amount);
	// 	});
	// 	GetProfileCareer().then((res) => {
	// 		setCareerInfo(res);
	// 	});
	// }, []);
	const handleCopy = () => {
		setCopied(true);
		setTimeout(() => {
			setCopied(false);
		}, 2000);
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
			{careerInfo !== null && amount !== null ? (
				<div className="career">
					<div className="careerTitle">
						<h1>Карьера</h1>
						<div className="careerButton">
							<button>
								<p>Доход от партнерской программы:</p> <span>${amount}</span>
							</button>
						</div>
					</div>
					<div className="careerContent">
						<div className="careerContentItem">
							<div className="careerContentImg">
								<img src="/images/careerImg.jpg" alt="career" />
							</div>
							<div className="careerContentTop">
								<div className="careerContentTopItem">
									<h1>Приглашайте инвесторов и получайте бонусы</h1>
									<p>Поделись своей реферальной ссылкой и начни зарабатывать!</p>
									<div className={copied ? "careerLink linkActive" : "careerLink"}>
										<div className="careerLinkItem">
											<p>https://aamwwi.online/login?q={careerInfo.referral}</p>
											<CopyOnClick
												text={`https://aamwwi.online/login?q=${careerInfo.referral}`}
											>
												<button onClick={handleCopy}>
													{copied ? (
														<svg
															className="coped"
															xmlns="http://www.w3.org/2000/svg"
															width={24}
															height={24}
														>
															<path d="M9 16.17 5.53 12.7a.996.996 0 1 0-1.41 1.41l4.18 4.18c.39.39 1.02.39 1.41 0L20.29 7.71a.996.996 0 1 0-1.41-1.41L9 16.17z" />
														</svg>
													) : (
														<svg
															xmlns="http://www.w3.org/2000/svg"
															width={24}
															height={24}
															fill="none"
														>
															<defs>
																<clipPath id="a">
																	<path
																		fill="#fff"
																		fillOpacity={0}
																		d="M0 0h24v24H0z"
																	/>
																</clipPath>
															</defs>
															<g clipPath="url(#a)">
																<path
																	stroke="#96C5F9"
																	strokeLinecap="round"
																	strokeLinejoin="round"
																	strokeWidth={1.5}
																	d="M10.07 7c.31-3.03 1.77-4 5.43-4C19.7 3 21 4.29 21 8.5c0 3.65-.99 5.11-4 5.43M8.5 10c4.2 0 5.5 1.29 5.5 5.5 0 4.2-1.3 5.5-5.5 5.5C4.29 21 3 19.7 3 15.5 3 11.29 4.29 10 8.5 10Z"
																/>
															</g>
														</svg>
													)}
												</button>
											</CopyOnClick>
										</div>
									</div>
								</div>

								<div className="fon">
									<img src="/images/fonCareer.jpg" alt="fon" />
								</div>
							</div>
						</div>
						<div className="careerContentBottomContainer">
							<UserLvl
								levelValue={careerInfo.levelValue}
								nextLevelUserCount={careerInfo.nextLevelUserCount}
								nextLevelInvestAmount={careerInfo.nextLevelInvestAmount}
							/>

							<div className="careerContentBottom">
								<h4 className="careerContentBottomTitle">Стандартное вознаграждение</h4>

								<div className="careerContentLvlList">
									<div className="careerContentLvlListItem">
										<div className="LvlBlock">
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
										</div>
										<p>Сам партнер</p>
									</div>
								</div>
								<div className="careerContentLvlList">
									<div className="careerContentLvlListItem">
										<div className="LvlBlock">
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
										</div>
										<p>Уровень 1</p>
									</div>
									<h4 className="careerContentLvlListInfo">5%</h4>
								</div>
								<div className="careerContentLvlList">
									<div className="careerContentLvlListItem">
										<div className="LvlBlock">
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
										</div>
										<p>Уровень 2</p>
									</div>
									<h4 className="careerContentLvlListInfo">3%</h4>
								</div>
								<div className="careerContentLvlList">
									<div className="careerContentLvlListItem">
										<div className="LvlBlock">
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
											<div className="LvlBlockImg">
												<img src="./images/userLvl.svg" alt="user" />
											</div>
										</div>
										<p>Уровень 3</p>
									</div>
									<h4 className="careerContentLvlListInfo">1%</h4>
								</div>
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

export default Career;
