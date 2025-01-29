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
	const [selectedType, setSelectedType] = useState("all"); // State for selectedType
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
	}, [filter, searchInp, selectedType]); // Add selectedType to dependency array

	// Handle type change (FUND, ASSET, all)
	const handleTypeChange = (type) => {
		setSelectedType(type); // Update the selectedType state
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
							<div className="marketTitle">
								<h1>Маркет</h1>
							</div>
							<Search searchInp={searchInp} setSearchInp={setSearchInp} />
							{categories && !mainCntx.hiddenHeader && (
								<Buttons categories={categories} filter={filter} setFilter={setFilter} />
							)}

							{/* Type Switcher UI */}
							<div className="typeSwitcher">
								<button
									onClick={() => handleTypeChange("FUND")}
									className={selectedType === "FUND" ? "active" : ""}
								>
									FUND
								</button>
								<button
									onClick={() => handleTypeChange("ASSET")}
									className={selectedType === "ASSET" ? "active" : ""}
								>
									ASSET
								</button>
								<button
									onClick={() => handleTypeChange("all")}
									className={selectedType === "all" ? "active" : ""}
								>
									All
								</button>
							</div>
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