import React, { useEffect, useState } from "react";
import axios from 'axios';
import Dropdown from 'react-dropdown'
import 'react-dropdown/style.css'
import AnimatedNumber from 'react-animated-number';

const regions = ['LEC', 'LCS', 'LCK']
const lecTeams = ['Astralis', 'Excel Esports', 'Fnatic', 'G2 Esports', 'MAD Lions', 'Misfits Gaming', 'Rogue', 'SK Gaming', 'Team BDS', 'Team Vitality']
const lcsTeams = ['100 Thieves', 'CLG', 'Cloud9', 'Dignitas', 'Evil Geniuses', 'FlyQuest', 'Golden Guardians', 'Immortals', 'Team Liquid', 'TSM']
const lckTeams = ['DRX', 'DWG KIA', 'Fredit BRION', 'Gen.G eSports', 'Hanwha Life eSports', 'KT Rolster', 'Kwangdong Freecs', 'Liiv SANDBOX', 'Nongshim RedForce', 'T1']

const Predictor = (props) => {
  let teams = {
    team1: props.team1,
    team2: props.team2,
    region: props.region
  }
  const [team1Probability, setTeam1Probability] = useState(0);
  const [team2Probability, setTeam2Probability] = useState(0);

  const [team1IsDisabled, setTeam1IsDisabled] = useState("hidden");
  const [team2IsDisabled, setTeam2IsDisabled] = useState("hidden");

  let images;
  if (props.region === "LEC") {
    images = importAll(require.context('../img/LEC', false, /\.(png|jpe?g|svg)$/));
  } else if (props.region === "LCK") {
    images = importAll(require.context('../img/LCK', false, /\.(png|jpe?g|svg)$/));
  } else {
    images = importAll(require.context('../img/LCS', false, /\.(png|jpe?g|svg)$/));
  }

function importAll(r) {
    let images = {};
    r.keys().map((item, index) => { images[item.replace('./', '')] = r(item); });
    return images;
  }

  function checkForms() {
    if (teams.region === "LEC" && lecTeams.includes(teams.team1) && lecTeams.includes(teams.team2) && (teams.team2 !== teams.team1)) {
      return true
    } else if (teams.region === "LCS" && lcsTeams.includes(teams.team1) && lcsTeams.includes(teams.team2) && (teams.team2 !== teams.team1)) {
      return true
    } else if (teams.region === "LCK" && lckTeams.includes(teams.team1) && lckTeams.includes(teams.team2) && (teams.team2 !== teams.team1)) {
      return true
    } else {
      return false
    }
  }

  let options = []
    if (props.region == "LEC") {
        options = lecTeams
    } else if (props.region == "LCS") {
        options = lcsTeams
    } else if (props.region == "LCK") {
        options = lckTeams
    } else {
        options = []
    }

function handleRegionChange(event) {
    props.setRegion(event.value)
    setTeam1IsDisabled("visible")
    setTeam2IsDisabled("visible")
}

const animatedNumbers = (value) => {
  return (
    <AnimatedNumber value={value} formatValue={value => `${value.toFixed(2)}`} duration={1000}/>
  )
}

const errorMessages = () => {
  let dropDownsFilled = (props.team1 !== null && props.team2 !== null && props.region !== null)
  let sameTeam = (!checkForms() && dropDownsFilled && teams.team2 === teams.team1)
  let crossRegionAttempt = (!checkForms() && dropDownsFilled && (!options.includes(teams.team1) || !options.includes(teams.team2)))

  if (sameTeam) {
    return  <h2 style={{color: "white", marginTop: "5%"}}>Teams must be different to predict</h2>
  } else if (crossRegionAttempt) {
    return <h2 style={{color: "white", marginTop: "5%"}}>Select teams from {props.region}</h2>
  } else {
    return <h2 style={{color: "white", marginTop: "5%"}}>Select region, blue team and red team to get a prediction</h2>
  }
}

function renderPredictions() {
  if ((props.region != null && props.team1 != null && props.team2 != null) && checkForms()) {
      axios.post('/api', teams)
              .then(function(response){
                  setTeam1Probability(response.data[teams.team1] * 100)
                  setTeam2Probability(response.data[teams.team2] * 100)
          })
          .catch(function(error){
              console.log(error);
          });
          let team1Color, team2Color
          if (team1Probability > team2Probability) {
            team1Color = "green"
            team2Color = "red"
          } else {
            team2Color = "green"
            team1Color = "red"
          }
          return (
            <div id="teams" style={{display: "flex", justifyContent: "center"}}>
              <div>
              <div id="dropdown"><Dropdown options={options} onChange={event => props.setTeam1Name(event.value)} placeholder="Select blue team" /></div>
                <img src={images[`${teams.team1}.png`]}></img>
                <h1 style={{color: team1Color}}> { animatedNumbers(team1Probability) }% </h1><h1 style={{color: "white"}}>{teams.team1}</h1>
              </div>

              <div id="region">
                <div id="dropdown"><Dropdown options={regions} onChange={event => handleRegionChange(event)} placeholder="Select region" /></div>
                <img src={images[`${teams.region}.png`]} style={{marginTop: "50px"}}></img>
              </div>

              <div>
              <div id="dropdown"><Dropdown options={options} onChange={event => props.setTeam2Name(event.value)} placeholder="Select red team" /></div>
                <img src={images[`${teams.team2}.png`]}></img>
                <h1 style={{color: team2Color}}> { animatedNumbers(team2Probability) }% </h1><h1 style={{color: "white"}}>{teams.team2}</h1>
              </div>
            </div>
          )
  } else {
    return (
      <>
      <div id="teams" style={{display: "flex", justifyContent: "center"}}>
              <div id="teamOne">
              <div id="dropdown" style={{ visibility: team1IsDisabled}}><Dropdown options={options} onChange={event => props.setTeam1Name(event.value)} placeholder="Select blue team" /></div>
              </div>

              <div id="region">
                <div id="dropdown"><Dropdown options={regions} onChange={event => handleRegionChange(event)} placeholder="Select region" /></div>
              </div>

              <div id="teamTwo">
              <div id="dropdown" style={{ visibility: team2IsDisabled}}><Dropdown options={options} onChange={event => props.setTeam2Name(event.value)} placeholder="Select red team" /></div>
              </div>
          </div>
        { errorMessages() }
        </>
    )
  }
}

  return (
    <div className="App">
        { renderPredictions() }
    </div>
  );
}

export default Predictor;