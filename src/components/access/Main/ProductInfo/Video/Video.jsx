import React, { useRef } from "react";

import play from "../../../../svg/play.svg";

import "./Video.scss";
import "./VIdeoResponsice.scss";

const Video = ({ mainData }) => {
    const videoUrl = mainData?.medias[1]?.url?.url;
    const videoName = mainData?.medias[1]?.url?.name;
    const videoRef = useRef(null);

    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();
        }
    };

    return (
        <div className="video">
            <div className="videoWrapper">
                {videoUrl ? (
                    <>
                        <video
                            ref={videoRef}
                            src={videoUrl}
                            preload="metadata"
                            width="100%"
                            height="100%"
                            controls
                            onClick={handlePlay}
                        />
                        <button
                            className="playButton"
                            onClick={handlePlay}
                        >
                            <img
                                className="playIcon"
                                src={play}
                                alt="play"
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