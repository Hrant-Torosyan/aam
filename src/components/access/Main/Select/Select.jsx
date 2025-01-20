import React, { useState } from "react";
import "./Select.scss";

const Select = ({ setSelectValue, selectValue }) => {
	const [isActiveSelect, setIsActiveSelect] = useState(false);
	return (
		<div onClick={() => setIsActiveSelect(!isActiveSelect)} className={isActiveSelect ? "select activeSel" : "select"}>
			<p>{selectValue === "WEEKLY" ? "Неделя" : selectValue === "MONTHLY" ? "Месяц" : selectValue === "SEMI_ANNUAL" ? "Полугод" : "год"}</p>
			<img src="./images/angle.png" alt="" />
			<div className="selectItem">
				<p className={selectValue === "WEEKLY" ? "activeOption" : ""} onClick={() => setSelectValue("WEEKLY")}>
					Неделя
				</p>
				<p className={selectValue === "MONTHLY" ? "activeOption" : ""} onClick={() => setSelectValue("MONTHLY")}>
					Месяц
				</p>
				<p className={selectValue === "SEMI_ANNUAL" ? "activeOption" : ""} onClick={() => setSelectValue("SEMI_ANNUAL")}>
					Полугод
				</p>
				<p className={selectValue === "ANNUAL" ? "activeOption" : ""} onClick={() => setSelectValue("ANNUAL")}>
					Год
				</p>
			</div>
		</div>
	);
};

export default Select;
