import React from "react";
import "./DetailsOfFund.scss";
import "./DetailsOfFundResponsive.scss";

const DetailsOfFund = ({ mainData }) => {
	const fundDetails = Object.entries(mainData?.fundDetails);
	return (
		fundDetails.length > 0 && (
			<div className="detailsOfFundWrapper">
				<h2>Детали фонда</h2>
				<div className="detailsOfFund">
					{fundDetails.map(([key, value]) => (
						<div className="details" key={key}>
							<p>{key}</p>
							<strong>{value}</strong>
						</div>
					))}
				</div>
			</div>
		)
	);
};

export default DetailsOfFund;
