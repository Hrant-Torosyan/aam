import React, { useEffect, useState } from "react";
import { GetProductInfo } from "../../../../api/productInfo";
import { formatNumber } from "../../../../utils/formatNumber";
const Product = ({
	prod,
	info,
	setProdId,
	handleImageError,
	setHiddenHeader,
	fullWidth = false,
	projectId,
}) => {
	const [mainData, setMainData] = useState(null);

	const handleClick = () => {
		if (info === "Briefcase") {
			setProdId(prod.id);
		} else {
			setProdId(prod.projectId);
		}
		setHiddenHeader("hidden");
	};

	useEffect(() => {
		if (prod.projectId !== null) {
			GetProductInfo(prod.projectId).then((res) => {
				setMainData(res);
			});
		}
	}, [prod.projectId]);
	return (
		<div onClick={handleClick} className={`product ${fullWidth ? "productFull" : ""}`}>
			{prod.active !== undefined &&
				(prod.active ? (
					<div className="isAvailable">
						<div className="dote"></div>
						{mainData?.type === "ASSET" ? "Актив" : "Фонд"}
					</div>
				) : (
					<div className="isAvailable">Не доступно</div>
				))}
			<div className="productImage">
				<img src={prod.image?.url} alt="" onError={handleImageError} />
				<div className="productImageUser">
					<img src={mainData?.companyLogo?.url} alt="logo" />
				</div>
			</div>
			<div className="productContent">
				<h3>{prod.title}</h3>
				<div className="direction">
					<h2>{mainData?.productType}</h2>
					<h2>
						Страна: <span>{prod.country}</span>
					</h2>
				</div>
				<div className="hashtags">
					{prod.tags.map((item, key) => (
						<div key={key} className="hashtag">
							#{item}
						</div>
					))}
				</div>
				<div className="priceList">
					<div className="price">
						<p>Цена</p>
						<span>$ {formatNumber(prod.minPrice)}</span>
					</div>
				</div>
			</div>
		</div>
	);
};

export default Product;
