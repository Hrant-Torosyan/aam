import React, { useState } from "react";
import "./Operations.scss";
import "./ResposiveOperations.scss";
import OperationPopUp from "./OperationPopUp/OperationPopUp";
function formatDate(milliseconds) {
	const date = new Date(milliseconds);

	const months = [
		"Января",
		"Февраля",
		"Марта",
		"Апреля",
		"Мая",
		"Июня",
		"Июля",
		"Августа",
		"Сентября",
		"Октября",
		"Ноября",
		"Декабря",
	];

	const day = date.getDate();
	const month = months[date.getMonth()];

	const year = date.getFullYear();

	return `${day} ${month}, ${year}`;
}

const Operations = ({ operationsArr, setShowOperationsList, showOperationsList, count }) => {
	const [isActive, setIsactive] = useState(false);
	const [operationId, setOperationId] = useState(true);
	let operationBlocks = operationsArr?.transactionOperationsContent?.content?.map((item, key) => (
		<div
			onClick={() => {
				setOperationId(item.transactionOperationId);
				setIsactive(true);
			}}
			key={key}
			className="operationBlockItem"
		>
			<div className="operationBlockMain">
				{item.type === "DIVIDEND_PAYMENT"
					? "Выплата по дивидендам"
					: item.type === "PROJECT_INVEST"
					? "Инвестиция"
					: item.type === "PROJECT_DELETE"
					? "По закрытии проекта"
					: item.type === "TRANSFER_BETWEEN_WALLETS"
					? "Внутренний перевод"
					: item.type === "TRANSFER_BETWEEN_USERS_WALLETS"
					? "Перевод пользователю"
					: item.type === "WITHDRAWALS"
					? "Вывод средств"
					: item.type === "DEPOSITS"
					? "Пополнения"
					: "Комиссия"}
			</div>
			<div className="operationBlockInfo">
				<p>{formatDate(+item.date)}</p>
				<p>${parseFloat(item.amount.toString().replace(/[^\d.-]/g, "")).toLocaleString()}</p>
				<div
					className={
						item.status === "DONE"
							? "done"
							: item.status === "IN_PROCESS"
							? "progress"
							: "failed"
					}
				>
					<span>
						{item.status === "DONE"
							? "Выполнено"
							: item.status === "IN_PROCESS"
							? "В процессе"
							: "Неуспешно"}
					</span>
				</div>
			</div>
		</div>
	));
	return (
		<div className="operationBlock">
			{isActive && <OperationPopUp setIsactive={setIsactive} operationId={operationId} />}
			<div className="operationBlockItem title">
				<div className="operationBlockMain">Операция</div>
				<div className="operationBlockInfo">
					<p>Дата</p>
					<p>Сумма</p>
					<p>Статус</p>
				</div>
			</div>
			<div className="operationBlockContent">
				{operationsArr?.transactionOperationsContent?.content?.length ? (
					operationBlocks
				) : (
					<p className="empty">Пока что пусто</p>
				)}
			</div>

			{operationsArr?.transactionOperationsContent?.totalElements > count && (
				<button
					onClick={() => {
						if (showOperationsList) {
							setShowOperationsList(null);
						} else {
							setShowOperationsList(count);
						}
					}}
				>
					{operationsArr?.transactionOperationsContent?.content?.length === count
						? "смотреть полностью"
						: "скрыть"}
				</button>
			)}
		</div>
	);
};

export default Operations;
