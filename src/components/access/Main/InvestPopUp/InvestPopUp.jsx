import React, { useState } from "react";
import "./InvestPopUp.scss";
import MainSelect from "../MainSelect/MainSelect";
const InvestPopUp = ({ isOpenInvest, setIsOpenInvest }) => {
	const [from, setFrom] = useState(`Основной счет:`);
	const [to, setTo] = useState(`Инвестиционный счет:`);
	const [sumValue, setSumValue] = useState("");
	const [error, setError] = useState("");
	return (
		<div className="investPopUp">
			<div className="investPopUpBlock">
				<div className="investPopUpHeader">
					<p>Детали операции</p>
					<button onClick={() => setIsOpenInvest(false)}>
						<svg width="25" height="26" viewBox="0 0 25 26" fill="none" xmlns="http://www.w3.org/2000/svg">
							<path d="M19.7904 2.17969L5.20703 16.763M5.20706 2.17969L19.7904 16.763" stroke="#4D9CF3" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" />
						</svg>
					</button>
				</div>
				<div className="investPopUpContent">
					<MainSelect test={[1, 2, 3, 4, 5]} />
				</div>
			</div>
		</div>
	);
};

export default InvestPopUp;
