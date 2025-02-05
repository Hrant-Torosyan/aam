import "./Diagram.scss";

const Diagram = ({ percentage }) => {
	const radius = 90;
	const circumference = 2 * Math.PI * radius;
	const offset = circumference - (percentage / 100) * circumference;

	return (
		<div className={`progressLvl`}>
			<svg viewBox="0 0 200 200" preserveAspectRatio="xMidYMid meet" className="progressRing">
				<circle className="progressRingCircleBg" cx="100" cy="100" r={radius} />
				<circle
					className="progressRingCircle"
					cx="100"
					cy="100"
					r={radius}
					strokeDasharray={circumference}
					strokeDashoffset={offset}
				/>
				<text x="50%" y="58%" className="progressRingTextPercentage" textAnchor="middle">
					{percentage}%
				</text>
			</svg>
		</div>
	);
};

export default Diagram;
