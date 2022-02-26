import Header from './Header'

const About = () => {
    return (
    <>
    <div id="mainContainer">
        <div id="aboutContainer" style={{color: "white"}}>
            <h2 style={{ color: "white", textAlign: "center"}}>Hello!</h2>
            This website is my personal project and a graphical interface for my lolesports predictor machine learning project.
            It uses a <code>TensorFlow Keras Sequential</code> artificial neural network to predict a winner between two LoL esports teams.
            All the data has been gathered from <a href="https://gol.gg/esports/home/" target="_blank">gol.gg</a>. For now it supports three regions: <i>LEC</i>, <i>LCS</i> and <i>LCK</i>.<br></br><br></br>

            The model took each teams' strenghts based on 25 different statistics, such as <i>Win rate</i>, <i>CS per minute</i> and <i>Tower Differential @ 15</i>.
            It then learned what kind of statistics led to wins and losses based on their 
            match history results against different teams. The model was taught with all the regular season games from 2020 to 2022 February in <i>LEC</i>, <i>LCS</i> and <i>LCK</i>, as well as some <i>LPL</i> games.
            For more in-depth information about the model you can check out the Jupyter Notebook on my <a href="https://github.com/SamuelAitamaa/lolesports-predictor/blob/main/model-notebook/modelNotebook.ipynb" target="_blank">Github</a>.
            <br></br><br></br>
            The predictor then takes the teams' current strenghts and applies the learned methods to predict probabilities
            between two teams. It works based on the averages of the whole split and does not take into account
            variables such as individual players statistics, teams head-to-head records, or team's current situation (such as an ongoing win or losing streaks). For these reasons
            the model will also make more reliable predictions towards the end of the season. It does not know if any sudden roster swaps or other outside of the game
            events occur.<br></br><br></br>

            The predictor needs to be manually updated every split to use the team data for the ongoing split. I will update on the bottom of this page whenever I have updated
            it.<br></br><br></br>

            The model gives around 70% accuracy and 70% recall without overfitting, being pretty much the same what an average active watcher gets
            (based on <a href="https://www.twitch.tv/iwilldominate" target="_blank">IWDominate's</a> and his viewers' predictions).
            It could most likely be improved by adding more information, but I decided to leave it as such for now.<br></br><br></br>

            I do not recommend to use the model for betting, but if you decided to do so let me know how you did!<br></br><br></br>

            Updated: <u>Spring 2022</u>
        </div>
        <Header />
    </div>
    </>
    )
  }

  export default About