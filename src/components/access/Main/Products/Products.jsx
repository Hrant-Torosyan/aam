import React, { useContext, useState } from "react";
import { lazy } from "react";
import "./Products.scss";
import "./ProductsResponsive.scss";
import { MainContext } from "../../../../app/App";
const ProductInfo = lazy(() => import("../ProductInfo/ProductInfo"));

const Products = ({ products, info }) => {
	const [prodId, setProdId] = useState(null);
	let mainCntx = useContext(MainContext);
	const handleImageError = (event) => {
		event.target.onerror = null;
		event.target.src = "https://flagsapi.com/RU/flat/64.png";
	};

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
						Доступно
					</div>
				) : (
					<div className="isAvailable">Не доступно</div>
				))}

			<div className="productImage">
				<img src={prod.image?.url} alt="" />
				<div className="productImageUser">
					<img src={prod.logo.url} alt="" />
				</div>
			</div>
			<div className="productContent">
				<h3>{prod.title}</h3>
				<div className="direction">
					<h2>{prod.description}</h2>
					<div className="directionImg">
						<img
							src={`https://flagsapi.com/${prod.country}/flat/64.png`}
							alt="альтернативный_текст"
							onError={handleImageError}
						></img>
						<span>{prod.country}</span>
					</div>
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
					<div className="price">
						<p>Мин. сумма</p>
						<span>${prod.minPrice}</span>
					</div>
				</div>
				<div className="buttonStyle">
					<button>
						<span>Инвестировать</span>
					</button>
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
