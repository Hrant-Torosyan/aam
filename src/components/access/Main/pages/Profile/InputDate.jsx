import React from "react";

const InputDate = ({ errorDate, number, setNumber, placeholder }) => {
	const handleIncrement = () => {
		setNumber((prevNumber) => {
			if (prevNumber === null) {
				prevNumber = 0;
			}
			let num = placeholder === "Год" ? 4 : 2;
			if ((prevNumber + 1).toString().length > num) {
				return prevNumber;
			}
			return prevNumber + 1;
		});
	};

	const handleDecrement = () => {
		if (number > 0) {
			setNumber((prevNumber) => {
				if (prevNumber === null) {
					prevNumber = 0;
				}
				return prevNumber - 1;
			});
		}
	};
	return (
		<div className="inputStyleDate">
			<div className={errorDate ? "inputStyle error" : "inputStyle"}>
				<input
					type="number"
					placeholder={placeholder}
					value={number !== null && number}
					min="0"
					maxLength={placeholder === "Год" ? 4 : 2}
					onChange={(e) => {
						let num = placeholder === "Год" ? 4 : 2;
						if (e.target.value.length <= num) {
							setNumber(parseInt(e.target.value) || number);
						}
					}}
				/>
				<div className="buttons">
					<div className="increment" onClick={handleIncrement}>
						<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M0.574219 7.15463L5.54661 0.230469L10.4725 7.15463H0.574219Z" fill="#444444" />
						</svg>
					</div>
					<div className="decrement" onClick={handleDecrement}>
						<svg width="11" height="8" viewBox="0 0 11 8" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M10.4725 0.21875L5.54661 7.14292L0.574219 0.21875H10.4725Z" fill="#444444" />
						</svg>
					</div>
				</div>
			</div>
		</div>
	);
};

export default InputDate;
