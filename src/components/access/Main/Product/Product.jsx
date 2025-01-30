import React from "react";
import logo from "../../../svg/logo.svg";

const Product = ({
	prod,
	info,
	setProdId,
	handleImageError,
	setHiddenHeader,
	fullWidth = false,
}) => {
	const handleClick = () => {
		if (info === "Briefcase") {
			setProdId(prod.id);
		} else {
			setProdId(prod.projectId);
		}
		setHiddenHeader("hidden");
	};

	return (
		<div onClick={handleClick} className={`product ${fullWidth ? "productFull" : ""}`}>
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
				<img src={prod.image?.url} alt="" onError={handleImageError} />
				<div className="productImageUser">
					<img src={logo} alt="logo" />
				</div>
			</div>
			<div className="productContent">
				<h3>{prod.title}</h3>
				<div className="direction">
					<h2>{prod.description}</h2>
					<h2>
						Страна: <span>{prod.country}</span>
					</h2>
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
	);
};

export default Product;
