import React from "react";
import { Link } from "react-router-dom";
import VideoTile from "../../components/VideoTile";
import "../../styles/home.scss";
import IVideo from "../../tsDeclaration/IVideo";

interface HomeProps {
  videos: IVideo[];
}

const Home: React.FC<HomeProps> = props => {
  const { videos } = props;
  console.log(props);
  return (
    <div className="home-container">
      <div className="categorie">
        <div className="title">Trending</div>
        <div className="video-wrapper">
          {videos.map((video, key) => {
            return <VideoTile key={key} video={video}></VideoTile>;
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
