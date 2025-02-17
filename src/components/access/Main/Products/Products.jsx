import React, { useContext, useRef, useState } from "react";
import { lazy } from "react";
import "./Products.scss";
import "./ProductsResponsive.scss";
import { MainContext } from "../../../../app/App";
import Product from "../Product/Product";
import leftArrow from "../../../svg/leftArrow.svg";
import rightArrow from "../../../svg/rightArrow.svg";
import { Swiper, SwiperSlide } from "swiper/react";

const ProductInfo = lazy(() => import("../ProductInfo/ProductInfo"));

const Products = ({ products, info, type = "LIST" }) => {
	const [prodId, setProdId] = useState(null);
	const mainCntx = useContext(MainContext);
	const swiperRef = useRef(null);

	const handleImageError = (event) => {
		event.target.onerror = null;
		event.target.src = "https://flagsapi.com/RU/flat/64.png";
	};

	return (
		<>
			{mainCntx.hiddenHeader && prodId !== null && (
				<ProductInfo
					prodId={prodId}
					setIsActiveProductInfo={mainCntx.setHiddenHeader}
					handleImageError={handleImageError}
					setProdId={setProdId}
				/>
			)}

			<div className={mainCntx.hiddenHeader ? "products hidden" : "products"}>
				{type === "LIST" ? (
					products.length ? (
						products.map((prod, key) => (
							<Product
								key={key}
								prod={prod}
								info={info}
								projectId={prod.projectId}
								setProdId={setProdId}
								handleImageError={handleImageError}
								setHiddenHeader={mainCntx.setHiddenHeader}
							/>
						))
					) : (
						<div className="notProd">
							{info === "Briefcase"
								? "Ваш портфель пока пуст. Начните инвестировать прямо сейчас!"
								: "В магазине не найдена продуктов"}
						</div>
					)
				) : (
					<div className="profileSlid">
						<Swiper
							onSwiper={(swiper) => (swiperRef.current = swiper)}
							slidesPerView={"auto"}
							navigation={false}
							grabCursor={true}
						>
							{products.length > 0 ? (
								products.map((prod, index) => (
									<SwiperSlide key={prod.projectId || index}>
										<Product
											fullWidth={true}
											key={index}
											prod={prod}
											info={info}
											projectId={prod.projectId}
											setProdId={setProdId}
											handleImageError={handleImageError}
											setHiddenHeader={mainCntx.setHiddenHeader}
										/>
									</SwiperSlide>
								))
							) : (
								<div className="noProductsMessage">
									{info === "Briefcase"
										? "Ваш портфель пока пуст. Начните инвестировать прямо сейчас!"
										: "В магазине не найдена продуктов"}
								</div>
							)}
						</Swiper>
						<button
							onClick={() => swiperRef.current?.slidePrev()}
							className="customArrow prevArrow"
						>
							<img src={leftArrow} alt="Previous" />
						</button>
						<button
							onClick={() => swiperRef.current?.slideNext()}
							className="customArrow nextArrow"
						>
							<img src={rightArrow} alt="Next" />
						</button>
					</div>
				)}
			</div>
		</>
	);
};

export default Products;
