# Hello!

http://www.lolesports-predictor.com/

## Introduction

This repository is my personal project to predict a winner between two LoL esports teams. At first I wanted to try to predict a professional game's winner based on champion selection, only to come to a dissapointing conclusion that it is almost impossible, resulting close to a 50-50 guess.

I then decided to move my goal to simply predict games based on who's playing who and on which side of the map. I gathered all my data from [gol.gg](https://gol.gg/esports/home/) and preprocessed it. I tried a bunch of different algorithms and models, evaluated them and came to a conclusion which of them is the best. I then created a demo section to predict your own games.

## About the model

The model was taught with all the regular season games from 2020 to February 2022 in *LEC*, *LCS* and *LCK*, as well as some *LPL* (all the LPL data between 2020-2022 was not usable) with a total amount of 1477 games. The model would most likely benefit from adding more games to reach atleast 2000 games.

The predictor uses team strenghts as an average of their whole splits and does not take into account variables such as individual players statistics, teams head-to-head records, or team's current situation (such as an ongoing win or losing streaks). For these reasons the model will also make more reliable predictions towards the end of the season. It does not know if any sudden roster swaps or other outside of the game events occur.

I managed to get a good 70% accuracy and 80% recall without overfitting, which is around the same what an average active watcher and some professional analysts get, based on [IWDominate's](https://www.twitch.tv/iwilldominate) and his viewers predictions.

More detailed descriptions of the machine learning you can find in my [Notebook](https://github.com/SamuelAitamaa/lolesports-predictor/blob/main/model-notebook/modelNotebook.ipynb)

## Project aims

The aim of this project was not only to predict the winners but also strenghten my own data preprocessing and machine learning skills with Python, as well as learning how to deploy and manage apps with Heroku and Flask.

I do not recommend to use the model for betting, but if you decided to do so let me know how you did!
