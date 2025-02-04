import React from "react";
import "./AboutCompany.scss";
import "./AboutCompanyResponsive.scss";

const AboutCompany = ({ mainData }) => {
	console.log(mainData, 'mainData')
	return (
		<div className="aboutCompany">
			<h1>Описание:</h1>
			<div className='aboutCompanyData'>
				<img src={mainData?.mediaImages[0].url} />
			    <p>{mainData.companyDescription}</p>
			</div>
		</div>
	);
};

export default AboutCompany;
