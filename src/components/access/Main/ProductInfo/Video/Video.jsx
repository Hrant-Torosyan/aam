import React, { useState, useRef, useEffect } from "react";

import play from "../../../../svg/play.svg";
import pause from "../../../../svg/pause.svg";

import "./Video.scss";
import "./VIdeoResponsice.scss";

const Video = ({ mainData }) => {
	const videoUrl = mainData?.mediaVideo.url;
	const videoName = mainData?.mediaVideo.name;
	const videoRef = useRef(null);

	const [isPlaying, setIsPlaying] = useState(false);
	const [showPauseButton, setShowPauseButton] = useState(true);
	const timeoutRef = useRef(null);

	const handlePlayPause = () => {
		if (videoRef.current) {
			if (isPlaying) {
				videoRef.current.pause();
			} else {
				videoRef.current.play();
			}
			setIsPlaying(!isPlaying);

			setShowPauseButton(true);

			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
			timeoutRef.current = setTimeout(() => {
				setShowPauseButton(false);
			}, 1000);
		}
	};

	const handleVideoClick = () => {
		if (isPlaying) {
			videoRef.current.pause();
			setIsPlaying(false);
			setShowPauseButton(true);
		} else {
			videoRef.current.play();
			setIsPlaying(true);
			setShowPauseButton(true);
		}

		if (timeoutRef.current) {
			clearTimeout(timeoutRef.current);
		}
		timeoutRef.current = setTimeout(() => {
			setShowPauseButton(false);
		}, 1000);
	};

	useEffect(() => {
		if (!isPlaying) {
			setShowPauseButton(true);
		}
	}, [isPlaying]);

	return (
		<div className="video">
			<div className="videoWrapper" onClick={handleVideoClick}>
				{videoUrl ? (
					<>
						<video ref={videoRef} src={videoUrl} preload="metadata" controls={false} />
						<button
							className="playButton"
							onClick={handlePlayPause}
							style={{
								opacity: isPlaying ? 0 : 1,
								visibility: isPlaying ? "hidden" : "visible",
							}}
						>
							<img
								className="playIcon"
								src={isPlaying ? pause : play}
								alt={isPlaying ? "pause" : "play"}
							/>
						</button>
						<p className="videoName">{videoName}</p>
					</>
				) : (
					<p className="noVideo">Video not available</p>
				)}
			</div>
		</div>
	);
};

export default Video;
