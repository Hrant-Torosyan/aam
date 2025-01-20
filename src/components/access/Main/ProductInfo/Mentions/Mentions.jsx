import React, { useEffect, useState } from "react";
import { GetProductHistories } from "../../../../../api/productInfo";
const Mentions = ({ prodId }) => {
	const [mainData, setMainData] = useState(null);

	useEffect(() => {
		if (prodId) {
			GetProductHistories(prodId).then((res) => setMainData(res));
		}
	}, [prodId]);

	return (
		<div className="mentions prodInfoCard">
			<h1>Упоминания в СМИ </h1>
			{mainData &&
				mainData.content.map((item, key) => (
					<div key={key}>
						<p>{item.content}</p>
						<img src={item.image.url} alt={item.image.name} />
					</div>
				))}
		</div>
	);
};

export default Mentions;
