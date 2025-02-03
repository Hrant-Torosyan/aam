import React from "react";


import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./SimilarSlider.scss";
import "./SimilarSliderResponsive.scss";
import Products from "../../Products/Products";

const SimilarSlider = ({ products = [], info }) => {

    return (
        <div className="profileSliderWrapper">
            <div className="profileSlider">
                <h1 className="sliderTitle">Похожие проекты</h1>
                <Products info={"Info"} type="SLIDER" products={products} />
            </div>
        </div>
    );
};

export default SimilarSlider;
