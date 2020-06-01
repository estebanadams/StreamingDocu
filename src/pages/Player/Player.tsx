import React, { useEffect, useState } from "react";
import _ from "lodash";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import "../../styles/player.scss";
import { bindExpression } from "@babel/types";

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

interface PlayerProps {
  videos: videoObj[];
}

const selectVid = (videos: videoObj[], id: number) => {
  for (let video of videos) {
    if (video.id == id) return video;
  }
  console.log("Index Not Found");
  return null;
};

const Player: React.FC<PlayerProps> = props => {
  const match: any = useRouteMatch("/video/:id");
  const { videos } = props;
  const [video, setVideo]: any = useState(null);
  console.log(props);

  useEffect(() => {
    console.log(match);
    if (match && !_.isEmpty(match.params)) {
      console.log(match.params);
      console.log("match", match.params);
      setVideo(selectVid(videos, match.params.id));
    }
  }, [match]);
  // @ts-ignore-start
  if (video !== null) {
    return (
      <div className="video-container">
        <div className="player">
          <video controls src={video.src}></video>
        </div>
        <div className="title">{video.title}</div>
        <div className="info">
          <div className="views">{video.views} views</div>
          <div className="date">{video.date}</div>
        </div>
        <div className="description">
          <div className="title">Description</div>
          <div className="content">{video.description}</div>
        </div>
      </div>
    );
  }
  // @ts-ignore-end
  return <div className="loading">Loading...</div>;
};

export default Player;
