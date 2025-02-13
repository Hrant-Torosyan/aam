import React from "react";

import Products from "../Products/Products";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProfileSlider.scss";
import "./ProfileSliderResponssive.scss";

const ProfileSlider = ({ products = [], info }) => {
	return (
		<div className="profileSliderWrapper">
			<div className="profileSlider">
				<h1 className="sliderTitle">Популярные активы</h1>
				<Products info={"Info"} type="SLIDER" products={products} />
			</div>
		</div>
	);
};

export default ProfileSlider;
