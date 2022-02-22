import '../App.css';
import Predictor from './predictor';
import Header from './Header';
import banner from '../img/banner.png';
import React, { useState } from "react";

const Home = () => {
  const [team1Name, setTeam1Name] = useState(null);
  const [team2Name, setTeam2Name] = useState(null);
  const [region, setRegion] = useState(null);

  return (
    <>
    <div id="mainContainer">
      <img src={banner}></img>
      <div id="contentContainer">
        <Predictor team1={team1Name} team2={team2Name} region={region} setRegion={setRegion} region={region} setTeam1Name={setTeam1Name} setTeam2Name={setTeam2Name}/>
      </div>
    </div>
    <Header />
    </>
  );
}

export default Home;