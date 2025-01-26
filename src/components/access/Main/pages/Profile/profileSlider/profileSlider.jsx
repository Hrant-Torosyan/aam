import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./profileSlider.scss";
import Products from "../../../Products/Products";
import leftArrow from "../../../../../svg/leftArrow.svg";
import rightArrow from "../../../../../svg/rightArrow.svg";

const ProfileSlider = ({ products = [], info }) => {
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
        slidesToShow: 3.5,
        slidesToScroll: 1,
        arrows: true,
        prevArrow: <CustomPrevArrow />,
        nextArrow: <CustomNextArrow />,
        centerMode: false,
        initialSlide: 0,
    };

    return (
        <div className="profileSliderWrapper">
            <div className="profileSlider">
                <h1 className="sliderTitle">Популярные активы</h1>
                <Slider {...settings}>
                    {products.length > 0 ? (
                        products.map((prod, index) => (
                            <div key={index} className="slideItem">
                                <Products products={[prod]} info={info} />
                            </div>
                        ))
                    ) : (
                        <div className="noProductsMessage">
                            <p>No products available</p>
                        </div>
                    )}
                </Slider>
            </div>
        </div>
    );
};

export default ProfileSlider;