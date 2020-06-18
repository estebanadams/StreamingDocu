import React from "react";
import { Link } from "react-router-dom";
import VideoTile from "../../components/VideoTile";
import "../../styles/home.scss";

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

interface HomeProps {
  videos: videoObj[];
}

const Home: React.FC<HomeProps> = props => {
  const { videos } = props;
  console.log(props);
  return (
    <div className="home-container">
      <div className="categorie">
        <div className="title">Trending</div>
        <div className="video-wrapper">
          {videos.map(video => {
            console.log("video", video);
            return <VideoTile video={video}></VideoTile>;
          })}
        </div>
      </div>
      <Link to="/add">
        <div className="add">+</div>
      </Link>
    </div>
  );
};

export default Home;
