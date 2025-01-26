import React, { Suspense, useContext, useEffect, useState } from "react";
import "./Briefcase.scss";
import Products from "../../Products/Products";
import Buttons from "../../Buttons/Buttons";
import { BriefcaseCategories, BriefcaseProducts } from "../../../../../api/briefcase";
import { MainContext } from "../../../../../app/App";

const Briefcase = () => {
	const [products, setProducts] = useState(null);
	const [filter, setFilter] = useState("all");
	const [categories, setCategories] = useState(null);
	let mainCntx = useContext(MainContext);
	useEffect(() => {
		BriefcaseCategories().then((res) => {
			if (res?.categories?.length) {
				setCategories(res.categories);
			}
		});
	}, []);
	useEffect(() => {
		BriefcaseProducts(filter).then((res) => {
			setProducts(res?.content);
		});
	}, [filter]);

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
			{categories !== null && products !== null ? (
				<div className="briefcase">
					{!mainCntx.hiddenHeader && (
						<>
							<div className="briefcaseTitle">
								<h1>Портфель</h1>
							</div>
							{categories && !mainCntx.hiddenHeader && (
								<Buttons categories={categories} filter={filter} setFilter={setFilter} />
							)}
						</>
					)}
					<Products info={"Briefcase"} products={products} />
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

export default Briefcase;
