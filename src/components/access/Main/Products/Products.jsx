import React, { useContext, useState } from "react";
import { lazy } from "react";
import "./Products.scss";
import "./ProductsResponsive.scss";
import { MainContext } from "../../../../app/App";
import Product from "../Product/Product";
import Slider from "react-slick";
import leftArrow from "../../../svg/leftArrow.svg";
import rightArrow from "../../../svg/rightArrow.svg";

const ProductInfo = lazy(() => import("../ProductInfo/ProductInfo"));

const CustomPrevArrow = ({ onClick }) => (
	<button className="customArrow prevArrow" onClick={onClick}>
		<img src={leftArrow} alt="Previous" />
	</button>
);
const CustomNextArrow = ({ onClick }) => (
	<button className="customArrow nextArrow" onClick={onClick}>
		<img src={rightArrow} alt="Next" />
	</button>
);
const settings = {
	dots: false,
	infinite: false,
	speed: 500,
	slidesToScroll: 1,
	arrows: true,
	prevArrow: <CustomPrevArrow />,
	nextArrow: <CustomNextArrow />,
	centerMode: false,
	variableWidth: true,
	responsive: [
		{
			breakpoint: 1200,
			settings: {
				arrows: false,
			},
		},
		{
			breakpoint: 768,
			settings: {
				arrows: false,
				slidesToShow: 2.5,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 670,
			settings: {
				arrows: false,
				slidesToShow: 1.5,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 576,
			settings: {
				arrows: false,
				slidesToShow: 1.5,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 470,
			settings: {
				arrows: false,
				slidesToShow: 1.2,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 410,
			settings: {
				arrows: false,
				slidesToShow: 1.2,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 375,
			settings: {
				arrows: false,
				slidesToShow: 1.2,
				centerMode: false,
				variableWidth: false,
			},
		},
		{
			breakpoint: 360,
			settings: {
				arrows: false,
				slidesToShow: 1.1,
				centerMode: false,
				variableWidth: false,
			},
		},
	],
};

const Products = ({ products, info, type = "LIST" }) => {
	const [prodId, setProdId] = useState(null);
	const mainCntx = useContext(MainContext);

	const handleImageError = (event) => {
		event.target.onerror = null;
		event.target.src = "https://flagsapi.com/RU/flat/64.png";
	};
	return (
		<>
			{mainCntx.hiddenHeader && (
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
								setProdId={setProdId}
								handleImageError={handleImageError}
								setHiddenHeader={mainCntx.setHiddenHeader}
							/>
						))
					) : (
						<div className="notProd">Пока что пусто</div>
					)
				) : (
					<Slider {...settings}>
						{products.length > 0 ? (
							products.map((prod, index) => (
								<div key={index} className="slideItem">
									<Product
										fullWidth={true}
										key={index}
										prod={prod}
										info={info}
										setProdId={setProdId}
										handleImageError={handleImageError}
										setHiddenHeader={mainCntx.setHiddenHeader}
									/>
								</div>
							))
						) : (
							<div className="noProductsMessage">
								<p>No products available</p>
							</div>
						)}
					</Slider>
				)}
			</div>
		</>
	);
};

export default Products;
