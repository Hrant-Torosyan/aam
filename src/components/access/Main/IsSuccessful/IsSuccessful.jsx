import React, { useEffect } from "react";
import "./IsSuccessful.scss";
const IsSuccessful = ({ info, setIsOpen, delay }) => {
	useEffect(() => {
		const timer = setTimeout(() => {
			setIsOpen(false);
		}, delay);

		return () => clearTimeout(timer);
	}, [setIsOpen, delay]);

	return (
		<div className="isSuccessful">
			<div className={info ? "isSuccessfulContent" : "isSuccessfulContent failed"}>
				<img src={info ? "./images/successful.svg" : "./images/failed.svg"} alt="" />
				<h3>{info ? "Операция успешна!" : "Ошибка!"}</h3>
				{info && <p>Окно закроется автоматически.</p>}
				{!info && (
					<div
						onClick={() => {
							setIsOpen(false);
						}}
						className="buttonStyleToo"
					>
						<button>
							<span>OK</span>
						</button>
					</div>
				)}
			</div>
		</div>
	);
};

export default IsSuccessful;
