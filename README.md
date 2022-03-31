# Tetris Project
## Introduction
As part of the 2021 ECM1400 Computer Science course at University of Exeter, I have been tasked with creating a tetris game using various web technologies.

## Controls
**Left Arrow :** Move Left
**Right Arrow:** Move Right
**Down Arrow:** Move Down
**Space Bar:** Move to bottom

## Links
**Link to VM:** [Welcome to Tetris (azure.com)](http://ml-lab-4d78f073-aa49-4f0e-bce2-31e5254052c7.ukwest.cloudapp.azure.com:65116/)

## Other Resources
**SQL to create the database:**
CREATE DATABASE tetris;
USE tetris;
CREATE TABLE Users (
 UserName varchar(255) NOT NULL UNIQUE,
 FirstName varchar(255),
 LastName varchar(255),
 Password varchar(255),
 Display int,
 PRIMARY KEY (Username)
);
  
CREATE TABLE Scores (
 Scoreid int NOT NULL AUTO_INCREMENT,
 Username varchar(255),
 Score int,
 PRIMARY KEY (Scoreid),
 FOREIGN KEY (Username) REFERENCES Users(Username)
);

### Author: Oscar Norris

## GitHub: oscarhfnorris/tetris-game-ECM1417