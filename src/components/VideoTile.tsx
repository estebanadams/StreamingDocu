import React, { useEffect } from "react";
import "../styles/videotile.scss";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import { ConsoleSqlOutlined } from "@ant-design/icons";

interface videoObj {
  id: number;
  title: string;
  poster: string;
  src: string;
  views: number;
  duration: string;
  date: string;
  description: string;
}

interface VideoProps {
  video: videoObj;
}

const VideoTile: React.FC<VideoProps> = props => {
  const { video } = props;
  console.log(video);
  return (
    <div className="videotile-container">
      <Link to={"/video/" + video.id}>
        <div className="thumbnail">
          <img className="poster" src={video.poster} alt=""></img>
          <div className="duration">{video.duration}</div>
        </div>

        <div className="title">{video.title}</div>
        <div className="info">
          <div className="views">100 views</div>
          <div className="date">{video.date}</div>
        </div>
      </Link>
    </div>
  );
};
export default VideoTile;
