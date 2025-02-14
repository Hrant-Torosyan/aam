import React, { useState, useEffect, useRef } from "react";
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
	const [isDesktop, setIsDesktop] = useState(true);
	const sliderRef = useRef(null);

	useEffect(() => {
		const handleResize = () => {
			setIsDesktop(window.innerWidth > 1199.98);
		};

		handleResize();
		window.addEventListener("resize", handleResize);

		return () => window.removeEventListener("resize", handleResize);
	}, []);

	const settings = {
		infinite: true,
		centerMode: false,
		slidesToShow: isDesktop ? 5 : 1,
		speed: 500,
		arrows: true,
		swipe: true,
		touchMove: true,
		beforeChange: (current, next) => setActiveIndex(next),
		afterChange: (index) => setActiveIndex(index),
		ref: sliderRef,
		initialSlide: activeIndex,
		responsive: [
			{
				breakpoint: 1199.98,
				settings: {
					slidesToShow: 3,
				},
			},
			{
				breakpoint: 768,
				settings: {
					slidesToShow: 1,
					swipeToSlide: true,
				},
			},
		],
	};

	const handlePrevious = () => {
		if (activeIndex > 0) {
			sliderRef.current.slickPrev();
		}
	};

	const handleNext = () => {
		if (activeIndex < mainData?.mediaImages.length - 1) {
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
					<Slider {...settings}>
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

					<button
						className="arrow left"
						onClick={handlePrevious}
						disabled={activeIndex === 0}
					>
						<img src={leftArrow} alt="Previous" />
					</button>

					<button
						className="arrow right"
						onClick={handleNext}
						disabled={activeIndex === mainData?.mediaImages.length - 1}
					>
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