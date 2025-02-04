import React, { lazy, useState, useEffect } from "react";
import arrowDown from "../../../../svg/arrowDown.svg";

import "./Presentation.scss";
import "./PresentationResponsive.scss";

const ProductInfoItems = lazy(() => import("../ProductInfoItems/ProductInfoItems"));

const Presentation = ({ mainData }) => {
	const [visibleCount, setVisibleCount] = useState(3);
	const [isMobile, setIsMobile] = useState(false);
	const allowButtons = mainData.presentations.length > 1;

	const handleShowMore = () => {
		setVisibleCount(mainData.presentations.length);
	};

	const handleDownloadAll = () => {
		mainData.presentations.forEach((presentation) => {
			if (presentation.url && presentation.url.url) {
				const link = document.createElement("a");
				link.href = presentation.url.url;
				link.download = presentation.url.name || "download";
				document.body.appendChild(link);
				link.click();
				document.body.removeChild(link);
			}
		});
	};

	const visiblePresentations = mainData.presentations.slice(0, visibleCount);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 576.99);
		};

		handleResize(); // Check on mount
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	return (
		<div className="Presentation">
			<h1>Презентаци:</h1>
			<div className={`PresentationWrapper ${isMobile ? "scrollable" : ""}`}>
				{(isMobile ? mainData.presentations : visiblePresentations).map(
					(presentation, index) => (
						<ProductInfoItems key={index} mainData={presentation} />
					)
				)}
				{/* {allowButtons && !isMobile && (
					<div className="downloadAll show" onClick={handleDownloadAll}>
						<span>Скачать все</span>
					</div>
				)} */}
			</div>
			<div className="presentationButtons">
				{/* {allowButtons && (
					<div className="downloadAll hide" onClick={handleDownloadAll}>
						<span>Скачать все</span>
					</div>
				)} */}
				{allowButtons && visibleCount < mainData.presentations.length && !isMobile && (
					<div className="seeMore" onClick={handleShowMore}>
						<span>Посмотреть ещё</span>
						<img src={arrowDown} alt="See more presentations" />
					</div>
				)}
			</div>
		</div>
	);
};

export default Presentation;
