import React from "react";
import "./AboutCompany.scss";
import "./AboutCompanyResponsive.scss";

const AboutCompany = ({ mainData }) => {
	return (
		<div className="aboutCompany">
			<h1>Описание:</h1>
			<div className="aboutCompanyData">
				<img alt="about" src={mainData?.mediaImages[0].url.url} />
				<p>{mainData.financialIndicatorContent}</p>
			</div>
		</div>
	);
};

export default AboutCompany;
