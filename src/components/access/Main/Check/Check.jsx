import React, { useRef, useState } from "react";
// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination } from "swiper/modules";
import "./Check.scss";
import "swiper/css";
import "swiper/css/pagination";

const Check = ({ walletsData, isOpen, setIsOpen }) => {
	return (
		<>
			{walletsData && (
				<div className="checkBlock">
					<div className="checkBlockItem">
						<p>Основной счет:</p>
						<p>
							${" "}
							{walletsData?.masterAccount
								? parseFloat(
										(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
								  ).toLocaleString()
								: 0}
						</p>

						<button
							onClick={() =>
								setIsOpen({
									info: "MASTER",
									type: "Основной счет:",
									balance: walletsData?.masterAccount
										? parseFloat(
												(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0,
									perceent: walletsData?.masterAccount
										? Math.round(
												(walletsData?.masterAccount /
													(walletsData?.masterAccount +
														walletsData?.investmentAccount +
														walletsData?.agentAccount)) *
													100
										  )
										: 0,
									color: "rgb(0, 180, 210)",
									bg: "rgba(0, 180, 210,0.2)",
								})
							}
						>
							Подробнее
						</button>
					</div>
					<div className="checkBlockItem">
						<p>Инвестиционный счет:</p>
						<p>
							${" "}
							{walletsData?.investmentAccount
								? parseFloat(
										(walletsData?.investmentAccount).toString().replace(/[^\d.-]/g, "")
								  ).toLocaleString()
								: 0}
						</p>
						<button
							onClick={() =>
								setIsOpen({
									info: "INVESTMENT",
									type: "Инвестиционный счет:",
									balance: walletsData?.investmentAccount
										? parseFloat(
												(walletsData?.investmentAccount)
													.toString()
													.replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0,
									perceent: walletsData?.investmentAccount
										? Math.round(
												(walletsData?.investmentAccount /
													(walletsData?.masterAccount +
														walletsData?.investmentAccount +
														walletsData?.agentAccount)) *
													100
										  )
										: 0,
									color: "rgb(0, 180, 210)",
									bg: "rgba(0, 180, 210,0.2)",
								})
							}
						>
							Подробнее
						</button>
					</div>
					<div className="checkBlockItem">
						<p>Агентский счет:</p>
						<p>
							${" "}
							{walletsData?.agentAccount
								? parseFloat(
										(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
								  ).toLocaleString()
								: 0}
						</p>
						<button
							onClick={() =>
								setIsOpen({
									info: "AGENT",
									type: "Агентский счет:",
									balance: walletsData?.agentAccount
										? parseFloat(
												(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0,
									perceent: walletsData?.agentAccount
										? Math.round(
												(walletsData?.agentAccount /
													(walletsData?.masterAccount +
														walletsData?.investmentAccount +
														walletsData?.agentAccount)) *
													100
										  )
										: 0,
									color: "rgb(0, 180, 210)",
									bg: "rgba(0, 180, 210,0.2)",
								})
							}
						>
							Подробнее
						</button>
					</div>
					<Swiper
						slidesPerView={2}
						spaceBetween={10}
						pagination={{
							clickable: true,
						}}
						modules={[Pagination]}
						className="mySwiper"
					>
						<SwiperSlide>
							<div className="checkBlockItem">
								<p>Основной счет:</p>
								<p>
									${" "}
									{walletsData?.masterAccount
										? parseFloat(
												(walletsData?.masterAccount).toString().replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0}
								</p>

								<button
									onClick={() =>
										setIsOpen({
											info: "MASTER",
											type: "Основной счет:",
											balance: walletsData?.masterAccount
												? parseFloat(
														(walletsData?.masterAccount)
															.toString()
															.replace(/[^\d.-]/g, "")
												  ).toLocaleString()
												: 0,
											perceent: walletsData?.masterAccount
												? Math.round(
														(walletsData?.masterAccount /
															(walletsData?.masterAccount +
																walletsData?.investmentAccount +
																walletsData?.agentAccount)) *
															100
												  )
												: 0,
											color: "rgb(0, 180, 210)",
											bg: "rgba(0, 180, 210,0.2)",
										})
									}
								>
									Подробнее
								</button>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="checkBlockItem">
								<p>Инвестиционный счет:</p>
								<p>
									${" "}
									{walletsData?.investmentAccount
										? parseFloat(
												(walletsData?.investmentAccount)
													.toString()
													.replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0}
								</p>
								<button
									onClick={() =>
										setIsOpen({
											info: "INVESTMENT",
											type: "Инвестиционный счет:",
											balance: walletsData?.investmentAccount
												? parseFloat(
														(walletsData?.investmentAccount)
															.toString()
															.replace(/[^\d.-]/g, "")
												  ).toLocaleString()
												: 0,
											perceent: walletsData?.investmentAccount
												? Math.round(
														(walletsData?.investmentAccount /
															(walletsData?.masterAccount +
																walletsData?.investmentAccount +
																walletsData?.agentAccount)) *
															100
												  )
												: 0,
											color: "rgb(0, 180, 210)",
											bg: "rgba(0, 180, 210,0.2)",
										})
									}
								>
									Подробнее
								</button>
							</div>
						</SwiperSlide>
						<SwiperSlide>
							<div className="checkBlockItem">
								<p>Агентский счет:</p>
								<p>
									${" "}
									{walletsData?.agentAccount
										? parseFloat(
												(walletsData?.agentAccount).toString().replace(/[^\d.-]/g, "")
										  ).toLocaleString()
										: 0}
								</p>
								<button
									onClick={() =>
										setIsOpen({
											info: "AGENT",
											type: "Агентский счет:",
											balance: walletsData?.agentAccount
												? parseFloat(
														(walletsData?.agentAccount)
															.toString()
															.replace(/[^\d.-]/g, "")
												  ).toLocaleString()
												: 0,
											perceent: walletsData?.agentAccount
												? Math.round(
														(walletsData?.agentAccount /
															(walletsData?.masterAccount +
																walletsData?.investmentAccount +
																walletsData?.agentAccount)) *
															100
												  )
												: 0,
											color: "rgb(0, 180, 210)",
											bg: "rgba(0, 180, 210,0.2)",
										})
									}
								>
									Подробнее
								</button>
							</div>
						</SwiperSlide>
					</Swiper>
				</div>
			)}
		</>
	);
};

export default Check;
