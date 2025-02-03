import React, { useState } from "react";

import leftArrow from "../../../../svg/leftArrow.svg";
import rightArrow from "../../../../svg/rightArrow.svg";

import "./ProductSlider.scss";
import "./ProductSliderResponsive.scss";

const ProductSlider = ({ mainData }) => {
	const [activeIndex, setActiveIndex] = useState(0);

	const handlePrevious = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === 0 ? mainData.medias.length - 1 : prevIndex - 1
		);
	};

	const handleNext = () => {
		setActiveIndex((prevIndex) =>
			prevIndex === mainData.medias.length - 1 ? 0 : prevIndex + 1
		);
	};

	return (
		mainData.medias && (
			<div className="productSlider">
				<div className="productSliderActive">
					{mainData.medias[activeIndex].type === "video" ? (
						<video controls>
							<source
								src={mainData.medias[activeIndex]?.url.url}
								type="video/mp4"
							/>
							Your browser does not support the video tag.
						</video>
					) : (
						<img
							src={mainData.medias[activeIndex]?.url.url}
							alt={mainData.medias[activeIndex]?.url.name}
						/>
					)}
				</div>

				<div className="productSliderThumbnails">
					<button className="arrow left" onClick={handlePrevious}>
						<img src={leftArrow} alt="Previous" />
					</button>
					<div className="thumbnailsContainer">
						{mainData.medias.map((item, index) => (
							<img
								key={index}
								className={activeIndex === index ? "active" : ""}
								onClick={() => setActiveIndex(index)}
								src={item?.url?.url}
								alt={item?.url?.name}
							/>
						))}
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
