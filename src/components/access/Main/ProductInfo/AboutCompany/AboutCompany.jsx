import React from "react";

const AboutCompany = ({ mainData }) => {
	return (
		<div className="aboutCompany prodInfoCard">
			<h1>О компании</h1>
			<p>{mainData.companyDescription}</p>
		</div>
	);
};

export default AboutCompany;
