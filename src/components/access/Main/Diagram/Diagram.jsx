import { buildStyles, CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import "./Diagram.scss";

const Diagram = ({ percentage }) => {
	return (
		<div className="progressLvl">
			<CircularProgressbar
				styles={buildStyles({
					textColor: "#2c73f3",
					pathColor: "#2c73f3",
					trailColor: "#2c72f347",
				})}
				value={percentage}
				text={`${percentage}%`}
			/>
		</div>
	);
};

export default Diagram;
