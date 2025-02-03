import React, { useEffect, useState } from "react";

import { GetProductTeam } from "../../../../../api/productInfo";
import arrowDown from "../../../../svg/arrowDown.svg";

import "./Team.scss";
import "./TeamResponcive.scss";

const Team = ({ prodId }) => {
	const [mainData, setMainData] = useState(null);
	const [visibleCount, setVisibleCount] = useState(5);

	useEffect(() => {
		if (prodId) {
			GetProductTeam(prodId).then((res) => setMainData(res));
		}
	}, [prodId]);

	const handleShowMore = () => {
		setVisibleCount(mainData?.content.length);
	};

	return (
		<div className="team prodInfoCard">
			<h2>Команда проекта:</h2>
			<div className="teamItems">
				{mainData &&
					mainData.content.slice(0, visibleCount).map((item, key) => (
						<div key={key} className="teamItem">
							<img src={item.image ? item.image.url : "./images/avatar.png"} alt="people" />
							<div className="teamItemInfo">
								<h3>{item.fullName}</h3>
							</div>
						</div>
					))}
			</div>
			{mainData && visibleCount < mainData.content.length && (
				<div className="seeMore" onClick={handleShowMore}>
					<span>Посмотреть ещё</span>
					<img src={arrowDown} alt="arrowDown" />
				</div>
			)}
		</div>
	);
};

export default Team;
