import React, { useEffect, useState } from "react";
import "./Team.scss";
import { GetProductTeam } from "../../../../../api/productInfo";
const Team = ({ prodId, content }) => {
	const [mainData, setMainData] = useState(null);

	useEffect(() => {
		if (prodId) {
			GetProductTeam(prodId).then((res) => setMainData(res));
		}
	}, [prodId]);
	return (
		<div className="team prodInfoCard">
			<h1>Команда </h1>
			<p>{content}</p>
			<div className="teamItems">
				{mainData &&
					mainData.content.map((item, key) => (
						<div key={key} className="teamItem">
							<img src={item.image ? item.image.url : "./images/avatar.png"} alt="people" />
							<div className="teamItemInfo">
								<h3>{item.fullName}</h3>
								<p>{item.position}</p>
								<span>{item.about}</span>
							</div>
						</div>
					))}
			</div>
		</div>
	);
};

export default Team;
