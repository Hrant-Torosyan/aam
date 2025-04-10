import React, { useEffect, useState } from "react";
import "./ProductInfo.scss";
import ProductSlider from "./ProductSlider/ProductSlider";
import AboutCompany from "./AboutCompany/AboutCompany";
import Team from "./Team/Team";
import UserInfo from "./UserInfo/UserInfo";
import Investors from "./Investors/Investors";
import { GetProductInfo } from "../../../../api/productInfo";
import IsSuccessful from "../IsSuccessful/IsSuccessful";
import DetailsOfFund from "./DetailsOfFund/DetailsOfFund";
import Presentation from "./Presentation/Presentation";
import Video from "./Video/Video";
import Documents from "./Documents/Documents";
import Map from "./Map/Map";
import { FilterByTags } from "../../../../api/market";
import SimilarSlider from "./SimilarProjects/SimilarSlider";
import PopUpProdNew from "./PopupProdNew/PopupProdNew";

const ProductInfo = ({ setIsActiveProductInfo, prodId, setProdId, handleImageError }) => {
	const [mainData, setMainData] = useState(null);
	const [popUpProdNew, setPopUpProdNew] = useState(false);
	const [isOpenSc, setIsOpenSc] = useState(false);
	const [successInfo, setSuccessInfo] = useState(true);
	const [profileProducts, setProfileProducts] = useState([]);
	const [filter, setFilter] = useState([]);
	useEffect(() => {
		if (prodId !== null) {
			GetProductInfo(prodId).then((res) => {
				setMainData(res);
				setFilter(res.tags);
			});
		}
	}, [prodId]);

	useEffect(() => {
		FilterByTags(filter).then((res) => {
			setProfileProducts(res.content);
		});
	}, [filter]);
	return (
		<>
			{isOpenSc && (
				<IsSuccessful
					setIsOpenTransfer={setPopUpProdNew}
					info={successInfo}
					delay={1000}
					setIsOpen={setIsOpenSc}
				/>
			)}
			{popUpProdNew && mainData && (
				<PopUpProdNew
					setIsOpenSc={setIsOpenSc}
					setSuccessInfo={setSuccessInfo}
					mainData={mainData}
					setPopUpProdNew={setPopUpProdNew}
					popUpProdNew={popUpProdNew}
				/>
			)}

			<div className="productInfo">
				{mainData !== null || profileProducts !== null ? (
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
							<h1>{mainData && mainData.title}</h1>
							<div className="percent">+{mainData && mainData.profit}%</div>
						</div>

						{mainData && (
							<div className="productInfoContent">
								<div className="productInfoItem">
									<ProductSlider mainData={mainData} />
									<div className="productInfoUserConent contentMobile">
										<UserInfo
											popUpProdNew={popUpProdNew}
											setPopUpProdNew={setPopUpProdNew}
											mainData={mainData}
										/>
									</div>
									<DetailsOfFund mainData={mainData} />
									<AboutCompany mainData={mainData} />
									{/*<Mentions prodId={prodId} />*/}
									{/*<Indicators mainData={mainData} />*/}
									<Presentation mainData={mainData} />
									<Team
										ceoPosition={mainData?.ceoPosition}
										ceoLastname={mainData?.ceoLastname}
										ceoFirstname={mainData?.ceoFirstname}
										ceoImage={mainData?.ceoImage?.url}
										content={mainData?.employeesContent}
										prodId={prodId}
									/>
									<Video mainData={mainData} />
									<Documents mainData={mainData} />
									<Map mainData={mainData} />
									{mainData.type !== "ASSET" && (
										<Investors prodId={prodId} mainData={mainData} />
									)}
									{Boolean(profileProducts?.length) && (
										<SimilarSlider
											handleImageError={handleImageError}
											setProdId={setProdId}
											prodId={prodId}
											setMainData={setMainData}
											products={profileProducts}
											info={{
												tags: mainData?.tags || [],
											}}
										/>
									)}
								</div>
								<div className="productInfoUserConent">
									<UserInfo
										popUpProdNew={popUpProdNew}
										setPopUpProdNew={setPopUpProdNew}
										mainData={mainData}
									/>
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
