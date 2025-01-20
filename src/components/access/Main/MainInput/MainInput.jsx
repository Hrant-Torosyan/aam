import React from "react";
import "./MainInput.scss";
import "./MainInputResponsive.scss";

const MainInput = ({
	title,
	type,
	min,
	max,
	sumValue,
	setSumValue,
	error,
	setError,
	sumValueAmount,
	setSumValueAmount,
	onePrice,
}) => {
	const validateInp = (e) => {
		if (type === "money") {
			// setSumValue(e.target.value);

			const inputValue = e.target.value.replace(/[^\d.,]/g, "");
			setSumValue(inputValue);

			// const inputValue = e.target.value.replace(/[^\d,.]/g, "");
			// const numericValue = parseFloat(inputValue);
			// if (!isNaN(numericValue)) {
			// 	const formattedNumber =
			// 		numericValue >= 1000 ? numericValue.toLocaleString() : numericValue.toString();
			// 	setSumValue(formattedNumber);
			// } else {
			// 	setSumValue("");
			// }
		} else if (title === "Количество акций") {
			if (!isNaN(e.target.value)) {
				const inputValue = (e.target.value * onePrice).toString().replace(/[^\d.-]/g, "");
				const numericValue = parseFloat(inputValue);
				if (!isNaN(numericValue)) {
					const formattedNumber =
						numericValue >= 1000 ? numericValue.toLocaleString() : numericValue.toString();
					setSumValueAmount(formattedNumber);
				} else {
					setSumValueAmount("");
				}
				setSumValue(e.target.value);
			}
		} else {
			setSumValue(e.target.value);
		}
	};
	return (
		<div className="mainInput">
			<p>{title}</p>
			<div
				className={
					(type === "money" ? "inputStyle inputStyleMn" : "inputStyle") +
					((sumValue === "" && error) || error ? " error" : "")
				}
			>
				{type && <span className="typeMoney">$</span>}
				<input
					onChange={(e) => {
						setError("");
						validateInp(e);
					}}
					value={sumValue}
					type="text"
				/>
				{min && max && (
					<span className="minMax">
						{parseFloat(min.toString().replace(/[^\d.-]/g, "")).toLocaleString()} -{" "}
						{parseFloat(max.toString().replace(/[^\d.-]/g, "")).toLocaleString()}
					</span>
				)}
			</div>
		</div>
	);
};

export default MainInput;
