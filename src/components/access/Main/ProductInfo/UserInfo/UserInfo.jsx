import React from "react";
import "./UserInfo.scss";

const UserInfo = ({ mainData, setPopUpProd }) => {
	return (
		<div className="userInfo prodInfoCard">
			<div className="userInfoImage">
				<img src={mainData.ceoImage?.url} alt="" />
				<h3>
					{mainData.ceoFirstname} {mainData.ceoLastname}
				</h3>
			</div>
			<div className="userInfoCreate">
				<h4>Создан: 21.03.2024</h4>
				<div className="userInfoCreateList">
					<p>Страна:</p>
					<p>{mainData.country}</p>
				</div>
				<div className="userInfoCreateList">
					<p>Город:</p>
					<p>{mainData.city}</p>
				</div>
				<div className="userInfoCreateList">
					<p>Отрасль:</p>
					<p>{mainData.categories?.join(", ")}</p>
				</div>
				<div className="userInfoCreateList">
					<p>Веб-сайт:</p>

					<a target="_blank" rel="noopener noreferrer" href={mainData.webSite}>
						{mainData.webSite}
					</a>
				</div>
			</div>

			<div className="userInfoPrice">
				<div className="userInfoPriceItem">
					<span>Цена</span>
					<p>${mainData.price}</p>
				</div>
				<div className="userInfoPriceItem">
					<span>Мин. сумма</span>
					<p>${mainData.minPrice}</p>
				</div>
			</div>

			<div className="hashtags">
				{mainData.tags?.map((item, key) => (
					<div key={key} className="hashtag">
						#{item}
					</div>
				))}
			</div>
			<div className="buttonStyle">
				<button
					onClick={() => {
						setPopUpProd("start");
					}}
				>
					<span>Инвестировать</span>
				</button>
			</div>
		</div>
	);
};

export default UserInfo;
