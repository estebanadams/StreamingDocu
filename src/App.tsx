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

const App: React.FC = () => {
  const [videos, setVideos] = useState<any[]>([]);

  useEffect(() => {
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
  }, []);
  // const videos = [
  //   {
  //     id: 0,
  //     title: "NOS MONDES DISPARUS",
  //     poster:
  //       "https://www.groupe-web92.fr/1-replay/2paleontologie/Nos-mondes-disparus.jpg",
  //     src:
  //       "https://www.groupe-web92.fr/1-replay/2paleontologie/Nos-mondes-disparus.mp4",
  //     views: 100,
  //     duration: "8:00",
  //     date: "3 day ago",
  //     description:
  //       "La Terre a connu l'apocalypse à cinq reprises. Des cataclysmes phénoménaux ont alors bouleversé l'ensemble de la planète, les océans comme les continents, provoquant des extinctions de masse. La plus connue et la plus récente d'entre elles est celle qui a fait disparaître les dinosaures de la surface de la Terre, il y a 65 millions d'années.En étudiant sols et fossiles, les scientifiques ont pu déterminer que la plus ancienne extinction de masse remonte à 450 millions d'années, à une époque où la vie n'existait que dans les océans. Si les causes de ces extinctions sont multiples, deux éléments déclencheurs semblent primordiaux : les éruptions volcaniques et les changements climatiques.Un Film documentaire réalisé par : Alexis de Favitski"
  //   },
  //   {
  //     id: 1,
  //     title: "LE DERNIER JOUR DES DINOSAUREs",
  //     poster:
  //       "https://www.web92.fr/01-vhtml5/2-replay-ext/2paleontologie/derniers-jour-dino-ext.png",
  //     src:
  //       "https://www.web92.fr/01-vhtml5/1-replay/2paleontologie/derniers-jours-dino.mp4",
  //     views: 100,
  //     duration: "1h10",
  //     date: "3 day ago",
  //     description: `Il y a 65 millions d'années, à la fin du crétacé, une gigantesque météorite de près de 10 km de diamètre serait entrée en collision avec la Terre à la vitesse de 50 000 km/h. L'impact aurait soufflé des régions entières, créant un immense raz-de-marée et projetant dans l'atmosphère suffisamment de poussière pour obscurcir le sol durant des mois. Incapables de vivre sans soleil, de nombreuses plantes auraient fini par mourir, suivies par les herbivores, puis par les carnivores.
  //       Près de 80 % des espèces végétales et animales - dont les dinosaures - auraient disparu ainsi définitivement.
  //       A l'aide d'effets spéciaux, ce film illustre cette catastrophe - incendies de forêts, pluies de météorites, volcans en éruption, pluies acides, tremblements de terre, tsunamis - et décrit l'histoire possible des derniers jours des dinosaures..`
  //   }
  // ];

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
