import React, { useContext, useState } from "react";
import { lazy } from "react";
import "./Products.scss";
import "./ProductsResponsive.scss";
import { MainContext } from "../../../../app/App";
import Product from "../Product/Product";

const ProductInfo = lazy(() => import("../ProductInfo/ProductInfo"));

const Products = ({ products, info }) => {
	const [prodId, setProdId] = useState(null);
	const mainCntx = useContext(MainContext);

	const handleImageError = (event) => {
		event.target.onerror = null;
		event.target.src = "https://flagsapi.com/RU/flat/64.png";
	};

	return (
		<>
			{mainCntx.hiddenHeader && (
				<ProductInfo prodId={prodId} setIsActiveProductInfo={mainCntx.setHiddenHeader} />
			)}
			<div className={mainCntx.hiddenHeader ? "products hidden" : "products"}>
				{products.length ? (
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
					<div className="notProd">_</div>
				)}
			</div>
		</>
	);
};

export default Products;