import React, { lazy, useEffect, useState } from "react";
import "./ProductInfo.scss";
import ProductSlider from "./ProductSlider/ProductSlider";
import AboutCompany from "./AboutCompany/AboutCompany";
import Mentions from "./Mentions/Mentions";
import Indicators from "./Indicators/Indicators";
import Team from "./Team/Team";
import UserInfo from "./UserInfo/UserInfo";
import Investors from "./Investors/Investors";
import { GetProductInfo } from "../../../../api/productInfo";
import PopUpProd from "./PopUpProd/PopUpProd";
import IsSuccessful from "../IsSuccessful/IsSuccessful";

const ProductInfoItems = lazy(() => import("./ProductInfoItems/ProductInfoItems"));

const ProductInfo = ({ setIsActiveProductInfo, prodId }) => {
	const [mainData, setMainData] = useState(null);
	const [popUpProd, setPopUpProd] = useState(false);
	const [isOpenSc, setIsOpenSc] = useState(false);
	const [successInfo, setSuccessInfo] = useState(true);

	useEffect(() => {
		if (prodId !== null) {
			GetProductInfo(prodId).then((res) => setMainData(res));
		}
	}, [prodId]);
	return (
		<>
			{isOpenSc && (
				<IsSuccessful
					setIsOpenTransfer={setPopUpProd}
					info={successInfo}
					delay={5000}
					setIsOpen={setIsOpenSc}
				/>
			)}
			{popUpProd && mainData && (
				<PopUpProd
					setIsOpenSc={setIsOpenSc}
					setSuccessInfo={setSuccessInfo}
					mainData={mainData}
					setPopUpProd={setPopUpProd}
					popUpProd={popUpProd}
				/>
			)}

			<div className="productInfo">
				{mainData !== null ? (
					<>
						<div className="productInfoTitle">
							<button onClick={() => setIsActiveProductInfo("")}>
								<svg
									width="7"
									height="12"
									viewBox="0 0 7 12"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M6 1L1 6L6 11"
										stroke="#0E1A32"
										strokeWidth="1.5"
										strokeLinecap="round"
										strokeLinejoin="round"
									/>
								</svg>
								<span>Назад</span>
							</button>
							<h1>{mainData && mainData.companyName}</h1>
							<div className="percent">+{mainData && mainData.profit}%</div>
						</div>

						{mainData && (
							<div className="productInfoContent">
								<div className="productInfoItem">
									<ProductSlider mainData={mainData} />
									<div className="productInfoUserConent contentMobile">
										<UserInfo
											popUpProd={popUpProd}
											setPopUpProd={setPopUpProd}
											mainData={mainData}
										/>
										<ProductInfoItems mainData={mainData} />
										<Investors prodId={prodId} mainData={mainData} />
									</div>
									<AboutCompany mainData={mainData} />
									<Mentions prodId={prodId} />
									<Indicators mainData={mainData} />
									<Team content={mainData?.employeesContent} prodId={prodId} />
								</div>
								<div className="productInfoUserConent">
									<UserInfo
										popUpProd={popUpProd}
										setPopUpProd={setPopUpProd}
										mainData={mainData}
									/>
									<ProductInfoItems mainData={mainData} />
									<Investors prodId={prodId} mainData={mainData} />
								</div>
							</div>
						)}
					</>
				) : (
					<div className="loader">
						<img
							src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
							alt="loader"
						/>
					</div>
				)}
			</div>
		</>
	);
};

export default ProductInfo;
