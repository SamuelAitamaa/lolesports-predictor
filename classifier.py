import os
os.environ['TF_CPP_MIN_LOG_LEVEL'] = '3'
from tensorflow.keras.models import load_model
import pandas as pd
import requests
import urllib
import urllib.request
from http.cookiejar import CookieJar
import bs4
import os

model = load_model("model")

def getYearAndSplit():
    try:
        req=urllib.request.Request("https://gol.gg/esports/home/", None, {'User-Agent': 'your bot 0.1'})
        cj = CookieJar()
        opener = urllib.request.build_opener(urllib.request.HTTPCookieProcessor(cj))
        response = opener.open(req)
        raw_response = response.read().decode('utf8', errors='ignore')
        soup = bs4.BeautifulSoup(raw_response)
        for a in soup.find_all('a', string="Teams", href=True):
            url = a['href']
        response.close()
    except urllib.request.HTTPError as inst:
        output = format(inst)
        print(output)

    splittedUrl = url.split('/')
    season = splittedUrl[3]
    split = splittedUrl[4]

    year = int(season.split('-')[1][1:]) + 10
    split = split.split('-')[1]

    return year, split

year, split = getYearAndSplit()

def get_sec(time_str):
    m, s = time_str.split(':')
    return float(60 * int(m) + int(s))

def predict(team1, team2, region):
    url=''
    if region == "LEC":
        url = f'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LEC%20{split}%2020{year}/'
    if region == "LCS":
        url = f'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCS%20{split}%2020{year}/'
    if region == "LCK":
        url = f'https://gol.gg/teams/list/season-ALL/split-ALL/tournament-LCK%20{split}%2020{year}/'

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
    team1Result = predictions[0][0]
    team2Result = (1 -predictions[0][0])

    result = {
        team1: str(team1Result),
        team2: str(team2Result),
    }

    return result

