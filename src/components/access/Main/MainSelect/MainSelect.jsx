import React, { useState } from "react";
import "./MainSelect.scss";
import "./MainSelectResponsive.scss";
const MainSelect = ({ selectValue, setSelectValue, type, dataSelect, selectTitle }) => {
	const [isActiveSelect, setIsActiveSelect] = useState(false);

	return (
		<>
			<p className="selectTitle">{selectTitle}</p>
			<div
				onClick={() => setIsActiveSelect(!isActiveSelect)}
				className={
					(isActiveSelect ? "mainSelect activeSl" : "mainSelect") + (type ? " typeSelect" : "")
				}
			>
				{selectValue === "USTD" && type ? (
					<div className="typeInfo">
						<img src="./images/USTD.png" alt="" />
						<div className="typeInfoItem">
							<h3>Tether</h3>
							<p>#USDT</p>
						</div>
					</div>
				) : selectValue === "BTC" && type ? (
					<div className="typeInfo">
						<img src="./images/BTC.png" alt="" />
						<div className="typeInfoItem">
							<h3>Bitcoin</h3>
							<p>#BTC</p>
						</div>
					</div>
				) : selectValue === "ETH" && type ? (
					<div className="typeInfo">
						<img src="./images/ETH.png" alt="" />
						<div className="typeInfoItem">
							<h3>Ethereum</h3>
							<p>#ETH</p>
						</div>
					</div>
				) : (
					<p
						dangerouslySetInnerHTML={{
							__html: typeof selectValue === "object" ? selectValue.name : selectValue,
						}}
					/>
				)}
				<img src="./images/angle.png" alt="" />
				{type ? (
					<div className="mainSelectItemType mainSelectItem">
						<div
							onClick={() => setSelectValue("BTC")}
							className={
								"BTC" === selectValue
									? "mainSelectItemTypeItem active"
									: "mainSelectItemTypeItem"
							}
						>
							<div className="typeInfo">
								<img src="./images/BTC.png" alt="" />
								<div className="typeInfoItem">
									<h3>Bitcoin</h3>
									<p>#BTC</p>
								</div>
							</div>
							<p>2823094 04892834902 892394</p>
						</div>
						<div
							onClick={() => setSelectValue("USTD")}
							className={
								"USTD" === selectValue
									? "mainSelectItemTypeItem active"
									: "mainSelectItemTypeItem"
							}
						>
							<div className="typeInfo">
								<img src="./images/USTD.png" alt="" />
								<div className="typeInfoItem">
									<h3>Tether</h3>
									<p>#USDT</p>
								</div>
							</div>
							<p>2823094 04892834902 892394</p>
						</div>
						<div
							onClick={() => setSelectValue("ETH")}
							className={
								"USTD" === selectValue
									? "mainSelectItemTypeItem active"
									: "mainSelectItemTypeItem"
							}
						>
							<div className="typeInfo">
								<img src="./images/ETH.png" alt="" />
								<div className="typeInfoItem">
									<h3>Ethereum</h3>
									<p>#ETH</p>
								</div>
							</div>
							<p>2823094 04892834902 892394</p>
						</div>
					</div>
				) : (
					<div className="mainSelectItem">
						{dataSelect.map((item, key) => (
							<div
								key={key}
								className={item === selectValue ? "active" : ""}
								onClick={() => {
									if (typeof item === "object") {
										setSelectValue(item);
									} else {
										setSelectValue(item);
									}
								}}
							>
								{typeof item === "object" ? (
									<p dangerouslySetInnerHTML={{ __html: item.name }} />
								) : (
									<p dangerouslySetInnerHTML={{ __html: item }} />
								)}
							</div>
						))}
					</div>
				)}
			</div>
		</>
	);
};

export default MainSelect;
