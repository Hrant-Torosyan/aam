import React, { useState, useRef, useEffect } from "react";
import ReactPlayer from "react-player";

import play from "../../../../svg/play.svg";
import pause from "../../../../svg/pause.svg";

import "./Video.scss";
import "./VIdeoResponsive.scss";

const Video = ({ mainData }) => {
	const videoUrl = mainData?.mediaVideo?.url;
	const videoName = mainData?.mediaVideo?.name;
	const playerRef = useRef(null);
	const timeoutRef = useRef(null);
	const isSeekingRef = useRef(false);
	const wasPlayingBeforeSeekRef = useRef(false);

	const [isPlaying, setIsPlaying] = useState(false);
	const [showButton, setShowButton] = useState(true);
	const [isPauseIcon, setIsPauseIcon] = useState(false);

	useEffect(() => {
		const preventScroll = (e) => {
			if (e.key === " " && e.target === document.body) {
				e.preventDefault();
			}
		};

		window.addEventListener("keydown", preventScroll);
		return () => window.removeEventListener("keydown", preventScroll);
	}, []);

	useEffect(() => {
		window.addEventListener("keydown", handleKeyDown);
		return () => {
			window.removeEventListener("keydown", handleKeyDown);
		};
	}, [isPlaying]);

	useEffect(() => {
		setShowButton(true);
		setIsPlaying(false);
		setIsPauseIcon(false);
	}, [videoUrl]);

	useEffect(() => {
		return () => {
			if (timeoutRef.current) {
				clearTimeout(timeoutRef.current);
			}
		};
	}, []);

	const showButtonTemporarily = () => {
		setShowButton(true);
		clearTimeout(timeoutRef.current);
		timeoutRef.current = setTimeout(() => {
			setShowButton(false);
		}, 700);
	};

	const handlePlayPause = () => {
		const newPlayingState = !isPlaying;
		setIsPlaying(newPlayingState);
		setIsPauseIcon(!newPlayingState);
		showButtonTemporarily();
		isSeekingRef.current = false;
		wasPlayingBeforeSeekRef.current = false;
	};

	const handleVideoClick = (e) => {
		e.preventDefault();
		if (!isSeekingRef.current) {
			handlePlayPause();
		}
	};

	const handleKeyDown = (event) => {
		if (event.key === " " || event.key === "Enter") {
			event.preventDefault();
			handlePlayPause();
		}
	};

	const handleSeekStart = () => {
		isSeekingRef.current = true;
		wasPlayingBeforeSeekRef.current = isPlaying;
		setIsPlaying(false);
		setIsPauseIcon(true);
	};

	const handleSeekEnd = () => {
		setTimeout(() => {
			isSeekingRef.current = false;
			setIsPlaying(wasPlayingBeforeSeekRef.current);
			setIsPauseIcon(!wasPlayingBeforeSeekRef.current);
			showButtonTemporarily();
		}, 50);
	};

	const handleProgress = () => {
		if (isSeekingRef.current) {
			setIsPauseIcon(true);
		}
	};

	return (
		<div className="video">
			<div
				className="videoWrapper"
				onClick={handleVideoClick}
			>
				{videoUrl ? (
					<>
						<ReactPlayer
							ref={playerRef}
							url={videoUrl}
							playing={isPlaying}
							controls={true}
							width="100%"
							height="100%"
							onSeekMouseDown={handleSeekStart}
							onSeekMouseUp={handleSeekEnd}
							onProgress={handleProgress}
						/>

						{showButton && (
							<button
								className="playButton"
								onClick={(e) => {
									e.stopPropagation();
									handlePlayPause();
								}}
							>
								<img
									className="playIcon"
									src={isPauseIcon ? pause : play}
									alt={isPauseIcon ? "pause" : "play"}
								/>
							</button>
						)}

						<p className="videoName">{videoName}</p>
					</>
				) : (
					<p className="noVideo">Видео недоступно</p>
				)}
			</div>
		</div>
	);
};

export default Video;