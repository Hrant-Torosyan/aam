import React, { useState, useRef } from "react";
import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";
import closeIcon from "../../../../svg/close.svg";
import "./ProductSlider.scss";
import "./ProductSliderResponsive.scss";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";

const ProductSlider = ({ mainData }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [popupVisible, setPopupVisible] = useState(false);
	const sliderRef = useRef(null);

	const settings = {
		dots: false,
		infinite: false,
		speed: 500,
		slidesToShow: 4,
		slidesToScroll: 4,
		arrows: false,
		responsive: [
			{
				breakpoint: 1024,
				settings: {
					slidesToShow: 4,
					slidesToScroll: 2,
				},
			},
			{
				breakpoint: 600,
				settings: {
					slidesToShow: 2,
					slidesToScroll: 1,
				},
			},
			{
				breakpoint: 480,
				settings: {
					slidesToShow: 1.5,
					slidesToScroll: 1,
				},
			},
		],
	};

	const handlePrevious = () => {
		if (sliderRef.current) {
			sliderRef.current.slickPrev();
		}
	};

	const handleNext = () => {
		if (sliderRef.current) {
			sliderRef.current.slickNext();
		}
	};

	const openPopup = () => {
		setPopupVisible(true);
	};

	const closePopup = () => {
		setPopupVisible(false);
	};

	const handlePopupPrevious = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? mainData.mediaImages.length - 1 : prevIndex - 1
		);
	};

	const handlePopupNext = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === mainData.mediaImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const handleThumbnailClick = (index) => {
		setActiveIndex(index);
	};

	return (
		<>
			<div className="productSlider">
				<div className="productSliderActive">
					<img
						src={mainData?.mediaImages[activeIndex]?.url?.url}
						alt={mainData?.mediaImages[activeIndex]?.name}
						onClick={openPopup}
					/>
				</div>

				<div className="productSliderThumbnails">
					<Slider ref={sliderRef} {...settings}>
						{mainData?.mediaImages.map((item, index) => (
							<div key={index}>
								<img
									className={activeIndex === index ? "active" : ""}
									onClick={() => handleThumbnailClick(index)}
									src={item.url.url}
									alt={item.name}
								/>
							</div>
						))}
					</Slider>

					<button className="arrow left" onClick={handlePrevious}>
						<img src={leftArrow} alt="Previous" />
					</button>

					<button className="arrow right" onClick={handleNext}>
						<img src={rightArrow} alt="Next" />
					</button>
				</div>
			</div>

			{popupVisible && (
				<div className="popupSlider" onClick={closePopup}>
					<div className="popupContent" onClick={(e) => e.stopPropagation()}>
						<button className="popupArrow left" onClick={handlePopupPrevious}>
							<img src={leftArrow} alt="Previous" />
						</button>

						<img
							src={mainData?.mediaImages[activeIndex]?.url?.url}
							alt={mainData?.mediaImages[activeIndex]?.name}
							className="popupImage"
						/>

						<button className="popupArrow right" onClick={handlePopupNext}>
							<img src={rightArrow} alt="Next" />
						</button>

						<button className="closePopup" onClick={closePopup}>
							<img src={closeIcon} alt="Close" />
						</button>
					</div>
				</div>
			)}
		</>
	);
};

export default ProductSlider;