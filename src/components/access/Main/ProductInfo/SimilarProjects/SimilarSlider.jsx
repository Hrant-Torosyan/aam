import React, { useRef, useContext } from "react";
import "swiper/swiper-bundle.css";
import "./SimilarSlider.scss";
import "./SimilarSliderResponsive.scss";
import { Swiper, SwiperSlide } from "swiper/react";
import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";
import Product from "../../Product/Product";
import { MainContext } from "../../../../../app/App";

const SimilarSlider = ({ products = [], prodId, setProdId, handleImageError }) => {
	const mainCntx = useContext(MainContext);
	const swiperRef = useRef(null);

	const handleClick = (id) => {
		setProdId(id);
		window.scrollTo({ top: 0 });
	};

	const filteredProducts = products.filter((p) => p.projectId !== prodId);

	if (!filteredProducts.length) return null;

	return (
		<div className="similarSliderWrapper">
			<div className="profileSlider">
				<h1 className="sliderTitle">Похожие проекты</h1>

				<Swiper
					onSwiper={(swiper) => (swiperRef.current = swiper)}
					slidesPerView={"auto"}
					navigation={false}
					grabCursor={true}
				>
					{filteredProducts.map((prod, index) => (
						<SwiperSlide key={prod.projectId || index} style={{ width: "280px" }}>
							<Product
								fullWidth={true}
								prod={prod}
								handleImageError={handleImageError}
								setHiddenHeader={mainCntx.setHiddenHeader}
								setProdId={handleClick}
							/>
						</SwiperSlide>
					))}
				</Swiper>
				<button
					onClick={() => swiperRef.current?.slidePrev()}
					className="customArrow prevArrow"
				>
					<img src={leftArrow} alt="Previous" />
				</button>
				<button
					onClick={() => swiperRef.current?.slideNext()}
					className="customArrow nextArrow"
				>
					<img src={rightArrow} alt="Next" />
				</button>
			</div>
		</div>
	);
};

export default SimilarSlider;
