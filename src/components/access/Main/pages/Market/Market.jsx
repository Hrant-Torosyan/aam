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
	const [selectedType, setSelectedType] = useState("ASSET");
	const [hasInteracted, setHasInteracted] = useState(false);
	let mainCntx = useContext(MainContext);

	useEffect(() => {
		MarketCategories().then((res) => {
			if (res?.categories?.length) {
				setCategories(res.categories);
			}
		});
	}, []);

	useEffect(() => {
		MarketProducts(filter, searchInp, selectedType).then((res) => {
			setProducts(res.content);
		});
	}, [filter, searchInp, selectedType]);

	const handleTypeChange = (type) => {
		setSelectedType(type);
		setHasInteracted(true);
	};

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
							<div className="filterBlock">
								<div className="marketTitle">
									<h1>Маркет</h1>
								</div>
								<div className="switcher">
									<button
										onClick={() => handleTypeChange("ASSET")}
										className={!hasInteracted || selectedType === "ASSET" ? "active" : ""}
									>
										Активы
									</button>
									<button
										onClick={() => handleTypeChange("FUND")}
										className={selectedType === "FUND" ? "active" : ""}
									>
										Фонды
									</button>
								</div>
								<Search searchInp={searchInp} setSearchInp={setSearchInp} />
							</div>
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
