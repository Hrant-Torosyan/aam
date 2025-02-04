import React, { useState } from "react";

import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";

import "./ProductSlider.scss";
import "./ProductSliderResponsive.scss";

const ProductSlider = ({ mainData }) => {
	const [activeIndex, setActiveIndex] = useState(0);

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

	return (
		mainData.mediaImages && (
			<div className="productSlider">
				<div className="productSliderActive">
					{mainData.mediaVideo && activeIndex === mainData.mediaImages.length ? (
						<video controls>
							<source
								src={mainData.mediaVideo.url}
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
					) : (
						<img
							src={mainData.mediaImages[activeIndex].url}
							alt={mainData.mediaImages[activeIndex].name}
						/>
					)}
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
						{mainData.mediaVideo && (
							<img
								className={activeIndex === mainData.mediaImages.length ? "active" : ""}
								onClick={() => setActiveIndex(mainData.mediaImages.length)}
								src={mainData.mediaVideo.url}
								alt={mainData.mediaVideo.name}
							/>
						)}
					</div>

					<button className="arrow right" onClick={handleNext}>
						<img src={rightArrow} alt="Next" />
					</button>
				</div>
			</div>
		)
	);
};

export default ProductSlider;