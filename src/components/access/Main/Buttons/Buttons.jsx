import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "./Buttons.scss";
import "./ButtonsResponsive.scss";

const Buttons = ({ filter, setFilter, categories }) => {
	let prodCount = categories.filter((item) => item.name === "all")[0].count;
	return (
		<div className="buttons">
			<Swiper slidesPerView={"auto"} navigation grabCursor={true}>
				{prodCount > 0 && (
					<SwiperSlide>
						<div
							onClick={() => {
								setFilter("all");
							}}
							className="button"
						>
							<button className={filter === "all" ? "active" : ""}>
								<p>Все</p> <span>{prodCount}</span>
							</button>
						</div>
					</SwiperSlide>
				)}

				{categories.map((category, key) => {
					if (category.name !== "all") {
						return (
							<SwiperSlide key={key}>
								<div
									onClick={() => {
										setFilter(category.name);
									}}
									className="button"
								>
									<button className={filter === category.name ? "active" : ""}>
										<p>{category.name}</p> <span>{category.count}</span>
									</button>
								</div>
							</SwiperSlide>
						);
					}
					return null;
				})}
			</Swiper>
		</div>
	);
};

export default Buttons;
