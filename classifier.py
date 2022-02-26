import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow.keras.models import load_model
import pandas as pd
import requests
import os

def get_sec(time_str):
    m, s = time_str.split(':')
    return float(3600 + int(m) * 60 + int(s))

def predict(team1, team2, region):
    model = load_model("model")
    url=''
    if region == "LEC":
        url = 'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LEC%20Spring%202022/'
    if region == "LCS":
        url = 'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCS%20Spring%202022/'
    if region == "LCK":
        url = 'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCK%20Spring%202022/'

    data = pd.read_html(requests.get(url, headers={'User-agent': 'your bot 0.1'}).text)[1]

    data["FT%"] = data["FT%"].replace('-', float(0)).astype(float)
    data["Win rate"] = data["Win rate"].apply(lambda x: float(x.replace("%", "")))
    data["Game duration"] = data["Game duration"].apply(lambda x: get_sec(x))
    data["FB%"] = data["FB%"].replace('-', float(0)).astype(float)
    data["Season"] = data["Season"].apply(lambda x: str(x).replace('S', '')).astype(float)
    data = data.reindex(sorted(data.columns), axis=1)

    teamOne = data[data["Name"] == team1]
    teamTwo = data[data["Name"] == team2]

    predictionsData = pd.merge(teamOne, teamTwo, left_on="Region", right_on="Region")
    predictionsData = predictionsData.drop(columns=['Name_x', 'Name_y', 'Region'])
    predictionsData = predictionsData.astype(float)

    predictions = model.predict(predictionsData)
    result = {
        team1: str(predictions[0][0]),
        team2: str(predictions[0][1]),
    }

    return result

