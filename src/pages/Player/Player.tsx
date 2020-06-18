import React, { useEffect, useState } from "react";
import _ from "lodash";
import { firestore } from "../../services/firebase";
import { Link, useRouteMatch, useLocation } from "react-router-dom";
import "../../styles/player.scss";
import { DesktopOutlined } from "@ant-design/icons";

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

const selectVideo = (videos: videoObj[], id: number) => {
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
  // console.log(props);
  let allPropsLoaded =
    !video && videos.length && match && !_.isEmpty(match.params);

  useEffect(() => {
    if (allPropsLoaded) {
      // console.log("match", match.params);
      let matchingVideo: videoObj | null = selectVideo(videos, match.params.id);
      // console.log("vide", vid, videos);
      setVideo(matchingVideo);
      if (matchingVideo) {
        firestore
          .collection("videos")
          .doc(match.params.id)
          .update({ views: matchingVideo.views + 1 });
        matchingVideo.views += 1;
      }
      console.log("+1 views");
    }
  }, [match]);

  if (video !== null) {
    return (
      <div className="video-container">
        <div className="player">
          <video
            preload="auto"
            controls
            src={video.src}
            poster={video.poster}
          ></video>
          {/* <div className="controls">
            <div className="red-b">
              <div className="time"></div>
              <div className="buttons">
                <div className="play"></div>
              </div>
            </div>
          </div> */}
        </div>
        <div className="title">{video.title}</div>
        <div className="info">
          <div className="views">{video.views} views</div>
          <div className="date">{video.date}</div>
        </div>
        <div className="description">
          <div className="title">Description</div>
          <div className="content">{video.desc}</div>
        </div>
      </div>
    );
  }
  // @ts-ignore-end
  return null;
};

export default Player;
