import React, { useState, useEffect } from "react";
import {
	GetProfileProducts,
} from "../../../../../api/profile";

import { GetProductInvestores } from "../../../../../api/productInfo";
import arrowDown from "../../../../svg/arrowDown.svg";

import "./Investors.scss";
import "./InvestorsResponsive.scss";

const Investors = ({ prodId }) => {
	const [investorsData, setInvestorsData] = useState(null);
	const [visibleCount, setVisibleCount] = useState(3);
	const [showInvestorsData, setShowInvestorsData] = useState(false);
	const [profileProducts, setProfileProducts] = useState(null);
	const [isMobile, setIsMobile] = useState(false);

	useEffect(() => {
		GetProfileProducts({
			pageSize: 4,
		}).then((res) => {
			setProfileProducts(res?.content);
		});
	}, []);

	useEffect(() => {
		if (prodId) {
			let queryBody = showInvestorsData
				? null
				: {
					pageSize: visibleCount,
				};
			GetProductInvestores(prodId, queryBody).then((res) => setInvestorsData(res));
		}
	}, [prodId, showInvestorsData, visibleCount]);

	const handleShowMore = () => {
		setVisibleCount((prevCount) => prevCount + 3);
	};

	const visibleInvestors = investorsData?.content.slice(0, visibleCount);

	useEffect(() => {
		const handleResize = () => {
			setIsMobile(window.innerWidth <= 576.99);
		};

		handleResize();
		window.addEventListener("resize", handleResize);
		return () => {
			window.removeEventListener("resize", handleResize);
		};
	}, []);

	let investors = visibleInvestors?.length ? (
		visibleInvestors.map((item, key) => (
			<div key={key} className="investorsItem">
				<img
					src={item.image === null ? "./images/avatar.png" : item.image.url}
					alt=""
				/>
				<h3>{item.fullName}</h3>
			</div>
		))
	) : (
		<h1 className="empty">Пусто</h1>
	);

	return (
		<div className="investors prodInfoCard">
			<div className="cardTitle">
				<h2>Инвесторы</h2>
				<p>{investorsData?.totalElements}</p>
			</div>
			<div className="investorsItems">
				{investors}
				{investorsData?.totalElements > visibleCount && !isMobile && (
					<div className="seeMore" onClick={handleShowMore}>
						<span>Посмотреть еще</span>
						<img src={arrowDown} alt="arrowDown" />
					</div>
				)}
			</div>
			{investorsData?.totalElements > visibleCount && isMobile && (
				<div className="seeMore" onClick={() => setShowInvestorsData(!showInvestorsData)}>
					<span>{!showInvestorsData ? "и еще " + (investorsData?.totalElements - visibleCount) + " инвесторов" : "скрыть"}</span>
				</div>
			)}
		</div>
	);
};

export default Investors;
