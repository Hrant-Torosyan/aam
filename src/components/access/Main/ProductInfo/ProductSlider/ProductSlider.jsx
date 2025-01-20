import React, { useState } from "react";
import "./ProductSlider.scss";

const ProductSlider = ({ mainData }) => {
	const [slideImg, setSlideImg] = useState(0);
	return (
		mainData.medias && (
			<div className="productSlider prodInfoCard">
				<div
					className={
						mainData.medias.length > 1 ? "productSliderPrew" : "productSliderPrew fluid"
					}
				>
					{mainData.medias.length > 1 && (
						<div
							onClick={() => {
								if (slideImg === 0) {
									setSlideImg(mainData.medias.length - 1);
								} else {
									setSlideImg(slideImg - 1);
								}
							}}
							className="btns left"
						>
							<svg
								width="7"
								height="12"
								viewBox="0 0 7 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M6 1L1 6L6 11"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}

					<img
						src={mainData.medias[slideImg].url.url}
						alt={mainData.medias[slideImg].url.name}
					/>
					{mainData.medias.length > 1 && (
						<div
							onClick={() => {
								if (slideImg === mainData.medias.length - 1) {
									setSlideImg(0);
								} else {
									setSlideImg(slideImg + 1);
								}
							}}
							className="btns right"
						>
							<svg
								width="7"
								height="12"
								viewBox="0 0 7 12"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path
									d="M1 11L6 6L1 1"
									stroke="white"
									strokeWidth="1.5"
									strokeLinecap="round"
									strokeLinejoin="round"
								/>
							</svg>
						</div>
					)}
				</div>

				{mainData.medias.length > 1 && (
					<div className="productSliderItems">
						{mainData.medias.map((item, key) => (
							<div key={key}>
								<img
									className={slideImg === key ? "active" : ""}
									onClick={() => setSlideImg(key)}
									src={item.url.url}
									alt={item.url.name}
								/>
							</div>
						))}
					</div>
				)}
			</div>
		)
	);
};

export default ProductSlider;
