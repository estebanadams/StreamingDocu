import React from "react";
import "../styles/videotile.scss";
import { Link } from "react-router-dom";
import videoObj from "../tsDeclaration/IVideo";

interface VideoProps {
  video: videoObj;
}

const VideoTile: React.FC<VideoProps> = props => {
  const { video } = props;
  // console.log(video);

  return (
    <div className="videotile-container">
      <Link to={"/video/" + video.id}>
        <div className="thumbnail">
          <img className="poster" src={video.poster} alt=""></img>
          <div className="duration">{video.duration}</div>
        </div>

        <div className="title">{video.title}</div>
        <div className="info">
          <div className="views">{video.views} views</div>
          <div className="date">{video.date}</div>
        </div>
      </Link>
    </div>
  );
};
export default VideoTile;
