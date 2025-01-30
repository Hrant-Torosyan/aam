import React from "react";
import Slider from "react-slick";

import Products from "../Products/Products";
import leftArrow from "../../../svg/leftArrow.svg";
import rightArrow from "../../../svg/rightArrow.svg";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import "./ProfileSlider.scss";
import "./ProfileSliderResponssive.scss";

const ProfileSlider = ({ products = [], info }) => {
    console.log(products, 'Products');
    console.log(info, 'info')

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
        slidesToScroll: 1,
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
                },
            },
            {
                breakpoint: 768,
                settings: {
                    arrows: false,
                    slidesToShow: 2.5,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 670,
                settings: {
                    arrows: false,
                    slidesToShow: 1.5,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 576,
                settings: {
                    arrows: false,
                    slidesToShow: 1.5,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 470,
                settings: {
                    arrows: false,
                    slidesToShow: 1.2,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 410,
                settings: {
                    arrows: false,
                    slidesToShow: 1.2,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 375,
                settings: {
                    arrows: false,
                    slidesToShow: 1.2,
                    centerMode: false,
                    variableWidth: false,
                },
            },
            {
                breakpoint: 360,
                settings: {
                    arrows: false,
                    slidesToShow: 1.1,
                    centerMode: false,
                    variableWidth: false,
                },
            },
        ],
    };

    return (
        <div className="profileSliderWrapper">
            <div className="profileSlider">
                <h1 className="sliderTitle">Популярные активы</h1>
                <Slider {...settings}>
                    {products.length > 0 ? (
                        products.map((prod, index) => (
                            <div key={index} className="slideItem">
                                <Products info={'Info'} products={[prod]} />
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