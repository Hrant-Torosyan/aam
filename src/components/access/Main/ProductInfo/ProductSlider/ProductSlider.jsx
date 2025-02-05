import React, { useState } from "react";
import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";
import closeIcon from "../../../../svg/close.svg";
import "./ProductSlider.scss";
import "./ProductSliderResponsive.scss";

const ProductSlider = ({ mainData }) => {
	const [activeIndex, setActiveIndex] = useState(0);
	const [popupVisible, setPopupVisible] = useState(false);
	const [popupIndex, setPopupIndex] = useState(null);

	const handlePrevious = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? mainData.mediaImages.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === mainData.mediaImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	const openPopup = () => {
		setPopupIndex(activeIndex);
		setPopupVisible(true);
	};

	const closePopup = () => {
		setPopupVisible(false);
	};

	const handlePopupPrevious = () => {
		setPopupIndex((prevIndex) =>
			prevIndex === 0 ? mainData.mediaImages.length - 1 : prevIndex - 1
		);
	};

	const handlePopupNext = () => {
		setPopupIndex((prevIndex) =>
			prevIndex === mainData.mediaImages.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		<>
			<div className="productSlider">
				<div className="productSliderActive">
					<img
						src={mainData.mediaImages[activeIndex].url}
						alt={mainData.mediaImages[activeIndex].name}
						onClick={openPopup}
					/>
				</div>

				<div className="productSliderThumbnails">
					<button className="arrow left" onClick={handlePrevious}>
						<img src={leftArrow} alt="Previous" />
					</button>

					<div className="thumbnailsContainer">
						{mainData.mediaImages.map((item, index) => (
							<img
								key={index}
								className={activeIndex === index ? "active" : ""}
								onClick={() => setActiveIndex(index)}
								src={item.url}
								alt={item.name}
							/>
						))}
					</div>

					<button className="arrow right" onClick={handleNext}>
						<img src={rightArrow} alt="Next" />
					</button>
				</div>
			</div>

			{popupVisible && (
				<div className="popup" onClick={closePopup}>
					<div className="popupContent" onClick={(e) => e.stopPropagation()}>
						<button className="popupArrow left" onClick={handlePopupPrevious}>
							<img src={leftArrow} alt="Previous" />
						</button>

						<img
							src={mainData.mediaImages[popupIndex].url}
							alt={mainData.mediaImages[popupIndex].name}
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
