import React from "react";
import "./UserInfo.scss";

const UserInfo = ({ mainData, setPopUpProdNew }) => {
	return (
		<div className="userInfo">
			<div className="prodInfoCard">
				<div className="userInfoImage">
					<img src={mainData.ceoImage?.url} alt=""/>
					<h3>
						{mainData.ceoFirstname} {mainData.ceoLastname}
					</h3>
				</div>

				<div className="mobileWrapper infoCreate">
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

					<div className="mobileWrapperInside">
						<div className="userInfoPrice">

							{mainData?.type === 'ASSET' ?
								<>
									<div className="userInfoPriceItem">
										<span>Цена</span>
										<p>от ${mainData.price}</p>
									</div>
									<div className="userInfoPriceItem">
										<span>Мин. сумма</span>
										<p>до ${mainData.minPrice}</p>
									</div>
								</> :
								<div className="userInfoPriceItem">
									<span>Цена</span>
									<p>${mainData.price}</p>
								</div>
							}
						</div>
						{mainData?.type === "ASSET" &&
							<div className="payments">
								<div className="userInfoCreateList">
									<p>Выплаты:</p>
									<button>{mainData.paymentPeriods[0]}</button>
								</div>
								<p>
									Срок инвестирования: <strong>{mainData.term}</strong>
								</p>
							</div>
						}
					</div>
				</div>

				<div className="mobileWrapper">
					<div className="hastagsWrapper">
						<p>Теги</p>
						<div className="hashtags">
							{mainData.tags?.map((item, key) => (
								<div key={key} className="hashtag">
									#{item}
								</div>
							))}
						</div>
					</div>
					<div className="prodInfoCardWrapper">
						<h2>Условия сделки:</h2>
						<p>
							Комиссия при покупке: <span>{mainData.purchaseCommission}%</span>
						</p>
						<p>
							Комиссия при продаже актива: <span>{mainData.withdrawalCommission}%</span>
						</p>
						<p>
							Комиссия за управление: <span>{mainData.managementCommission}%</span>
						</p>
					</div>
				</div>
				{mainData?.type === 'ASSET' ?
					<div className="buttonStyle">
						<button
							onClick={() => {
								setPopUpProdNew("start");
							}}
						>
							<span>Инвестировать</span>
						</button>
					</div> :
					<div className="buttonStyle">
						<button
							onClick={() => {
								setPopUpProdNew("start");
							}}
						>
							<span>Купить</span>
						</button>
					</div>
				}
			</div>
		</div>
	);
};

export default UserInfo;
