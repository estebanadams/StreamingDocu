import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter } from "react-router-dom";
import Home from "./pages/Home/Home";
import Player from "./pages/Player/Player";
import Header from "./components/Header";
import Add from "./pages/Add/Add";
import "./styles/app.scss";
import { firestore } from "./services/firebase";

import IVideo from "./tsDeclaration/IVideo";

const filterByViews = (a: IVideo, b: IVideo) => {
  return b.views - a.views;
};

const LoadVideos = (setVideos: any) => {
  let videosBuffer: any[] = [];
  firestore
    .collection("videos")
    .get()
    .then(querySnapshot => {
      querySnapshot.forEach(doc => {
        let video = doc.data();
        video.id = doc.id;
        videosBuffer.push(video);
      });
      videosBuffer.sort(filterByViews);
      setVideos(videosBuffer);
    });
};

const App: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
    LoadVideos(setVideos);
  }, []);
  return (
    <div className="app-container">
      <BrowserRouter>
        <Header></Header>
        <Switch>
          <Route path="/" exact render={() => <Home videos={videos} />} />
          <Route path="/video/:id" render={() => <Player videos={videos} />} />
          <Route path="/add" render={() => <Add />} />
        </Switch>
      </BrowserRouter>
    </div>
  );
};

export default App;
