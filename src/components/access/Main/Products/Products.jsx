import React, { useContext, useState } from "react";
import { lazy } from "react";
import "./Products.scss";
import "./ProductsResponsive.scss";
import { MainContext } from "../../../../app/App";
import logo from '../../../svg/logo.svg';
const ProductInfo = lazy(() => import("../ProductInfo/ProductInfo"));

const Products = ({ products, info }) => {
	const [prodId, setProdId] = useState(null);
	let mainCntx = useContext(MainContext);
	const handleImageError = (event) => {
		event.target.onerror = null;
		event.target.src = "https://flagsapi.com/RU/flat/64.png";
	};

	console.log(products, 'prod')
	let product = products.map((prod, key) => (
		<div
			key={key}
			onClick={() => {
				if (info === "Briefcase") {
					setProdId(prod.id);
				} else {
					setProdId(prod.projectId);
				}
				mainCntx.setHiddenHeader("hidden");
			}}
			className="product"
		>
			{prod.active !== undefined &&
				(prod.active ? (
					<div className="isAvailable">
						<div className="dote"></div>
						Актив
					</div>
				) : (
					<div className="isAvailable">Не доступно</div>
				))}

			<div className="productImage">
				<img src={prod.image?.url} alt="" />
				<div className="productImageUser">
					<img src={logo} alt="logo"/>
				</div>
			</div>
			<div className="productContent">
				<h3>{prod.title}</h3>
				<div className="direction">
					<h2>{prod.description}</h2>
					<h2>Страна: <span>{prod.country}</span></h2>
				</div>
				<div className="hashtags">
					{prod.tags.map((item, key) => (
						<div key={key} className="hashtag">
							# {item}
						</div>
					))}
				</div>
				<div className="priceList">
					<div className="price">
						<p>Цена</p>
						<span>${prod.price}</span>
					</div>
				</div>
			</div>
		</div>
	));
	return (
		<>
			{mainCntx.hiddenHeader && (
				<ProductInfo prodId={prodId} setIsActiveProductInfo={mainCntx.setHiddenHeader} />
			)}
			<div className={mainCntx.hiddenHeader ? "products hidden" : "products "}>
				{products.length ? product : <div className="notProd">_</div>}
			</div>
		</>
	);
};

export default Products;
