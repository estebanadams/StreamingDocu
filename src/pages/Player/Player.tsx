import React, { useEffect, useState } from "react";
import _ from "lodash";
import { firestore } from "../../services/firebase";
import { useRouteMatch } from "react-router-dom";
import "../../styles/player.scss";
import IVideo from "../../tsDeclaration/IVideo";

interface PlayerProps {
  videos: IVideo[];
}

const addComment = (comment: string, video: IVideo, setComment: any) => {
  if (video && comment.length) {
    if (!video.comment) video.comment = [];
    video.comment.push(comment);
    firestore
      .collection("videos")
      .doc(video.id)
      .update({
        comment: video.comment
      });
    setComment("");
  }
};

const selectVideo = (videos: IVideo[], id: string) => {
  for (let video of videos) {
    if (video.id === id) return video;
  }
  console.log("Index Not Found");
  return null;
};

const Player: React.FC<PlayerProps> = props => {
  const match: any = useRouteMatch("/video/:id");
  const { videos } = props;
  const [video, setVideo] = useState<IVideo | null>(null);
  const [comment, setComment] = useState<string>("");
  // console.log(props);

  useEffect(() => {
    let allPropsLoaded =
      !video && videos.length && match && !_.isEmpty(match.params);

    if (allPropsLoaded) {
      // console.log("match", match.params);
      let matchingVideo: IVideo | null = selectVideo(videos, match.params.id);
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
  }, [match, videos, video]);

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
        <div className="commentaire">
          <div className="title">Commentaires</div>
          <div className="add-comment-container">
            <input
              type="text"
              placeholder="Ajouter un commentaire..."
              className="add-comment"
              value={comment}
              onChange={e => {
                setComment(e.currentTarget.value);
                console.log(comment);
              }}
            />
            <button
              onClick={() => {
                addComment(comment, video, setComment);
              }}
              className="submit-comment"
            >
              Ajouter un commentaire
            </button>
          </div>
          {video.comment &&
            video.comment.map((comment: string, key: number) => {
              return (
                <div key={key} className="comment">
                  {comment}
                </div>
              );
            })}
        </div>
      </div>
    );
  }
  return null;
};

export default Player;
