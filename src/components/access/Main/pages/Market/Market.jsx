import React, { Suspense, useContext, useEffect, useState } from "react";
import "./Market.scss";
import Search from "./Search";
import Products from "../../Products/Products";
import Buttons from "../../Buttons/Buttons";
import { MarketCategories, MarketProducts } from "../../../../../api/market";
import { MainContext } from "../../../../../app/App";

const Market = () => {
	const [products, setProducts] = useState(null);
	const [filter, setFilter] = useState("all");
	const [categories, setCategories] = useState(null);
	const [searchInp, setSearchInp] = useState("");
	let mainCntx = useContext(MainContext);

	useEffect(() => {
		MarketCategories().then((res) => {
			if (res?.categories?.length) {
				setCategories(res.categories);
			}
		});
	}, []);
	useEffect(() => {
		MarketProducts(filter, searchInp).then((res) => {
			setProducts(res.content);
		});
	}, [filter, searchInp]);

	return (
		<Suspense
			fallback={
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			}
		>
			{products !== null && categories !== null ? (
				<div className="market">
					{!mainCntx.hiddenHeader && (
						<>
							<div className="marketTitle">
								<h1>Маркет</h1>
							</div>
							{!mainCntx.hiddenHeader && (
								<Search searchInp={searchInp} setSearchInp={setSearchInp} />
							)}
							{categories && !mainCntx.hiddenHeader && (
								<Buttons categories={categories} filter={filter} setFilter={setFilter} />
							)}
						</>
					)}
					<Products info={"Market"} products={products} />
				</div>
			) : (
				<div className="loader">
					<img
						src="https://i.pinimg.com/originals/92/63/9c/92639cac9c1a0451744f9077ddec0bed.gif"
						alt="loader"
					/>
				</div>
			)}
		</Suspense>
	);
};

export default Market;
