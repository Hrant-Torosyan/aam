import React, { useContext } from "react";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimilarSlider.scss";
import "./SimilarSliderResponsive.scss";
import Slider from "react-slick";
import Product from "../../Product/Product";
import { MainContext } from "../../../../../app/App";
import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";

const CustomPrevArrow = ({ onClick }) => (
	<button className="customArrow prevArrow" onClick={onClick}>
		<img src={leftArrow} alt="Previous" />
	</button>
);
const CustomNextArrow = ({ onClick }) => (
	<button className="customArrow nextArrow" onClick={onClick}>
		<img src={rightArrow} alt="Next" />
	</button>
);
const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToShow: 4,
	slidesToScroll: 2,
	arrows: true,
	prevArrow: <CustomPrevArrow />,
	nextArrow: <CustomNextArrow />,
	centerMode: false,
	variableWidth: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				arrows: false,
				slidesToShow: 4,
				slidesToScroll: 2,
			},
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 3,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 670,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 470,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 410,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 375,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 360,
			settings: {
				arrows: false,
				slidesToShow: 1,
				slidesToScroll: 1,
				centerMode: false,
				variableWidth: false,
			},
		},
	],
};
const SimilarSlider = ({ products = [], info, prodId, setProdId, handleImageError }) => {
	const mainCntx = useContext(MainContext);
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
				<Slider {...settings}>
					{filteredProducts.length > 0 ? (
						filteredProducts.map((prod, index) => (
							<div key={index} className="slideItem">
								<Product
									fullWidth={true}
									key={index}
									prod={prod}
									info={info}
									setProdId={handleClick}
									handleImageError={handleImageError}
									setHiddenHeader={mainCntx.setHiddenHeader}
								/>
							</div>
						))
					) : (
						<div className="noProductsMessage">
							<p>_</p>
						</div>
					)}
				</Slider>
			</div>
		</div>
	);
};

export default SimilarSlider;
