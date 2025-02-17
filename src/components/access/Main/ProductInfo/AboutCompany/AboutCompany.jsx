import React from "react";
import "./AboutCompany.scss";
import "./AboutCompanyResponsive.scss";

const AboutCompany = ({ mainData }) => {
	const processedContent = mainData?.financialIndicatorContent
		?.replace(/\/n/g, '<br>')
		.replace(/<br>+/g, '<br>')
		.replace(/^<br>/, '')
		.trim();

	return (
		<div className="aboutCompany">
			<h1>Описание:</h1>
			<div className="aboutCompanyData">
				<img alt="about" src={mainData?.mediaImages[0]?.url?.url} />
				<p dangerouslySetInnerHTML={{ __html: processedContent }}></p>
			</div>
		</div>
	);
};

export default AboutCompany;