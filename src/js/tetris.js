//constants
var gamePieces = {
    'L' : [ [0,0],[0,1],[0,2],[1,2] ],
    'Z' : [ [0,0],[1,0],[1,1],[2,1] ],
    'S' : [ [0,1],[1,0],[1,1],[2,0] ],
    'T' : [ [0,0],[1,0],[1,1],[2,0] ],
    'O' : [ [0,0],[0,1],[1,0],[1,1] ],
    'I' : [ [0,0],[0,1],[0,2],[0,3] ]
};
var gameChars = ['L', 'Z', 'S', 'T', 'O', 'I'];
var pieceColours = {
    'L' : 'Orange',
    'Z' : 'Red',
    'S' : 'Green',
    'T' : 'Magenta',
    'O' : 'Yellow',
    'I' : '#00ffff'
}
var myInterval;
var pause = false;

//functions
function createGB() {
    var gameBoard = [];
    for (column = 0; column < 10; column++) {
        boardCol = [];
        for (row=0; row < 20; row++) {
            //adds a row to the game board
            //each location contains the object of a square object if it is there or null
            boardCol.push(null);
        }      
        gameBoard.push(boardCol);
    }
    return gameBoard;
}

function setSquareCoordinate(startID, vectorTranslation) {
    startRowNum = Number(startID.substring(1, 3));
    startColNum = Number(startID.substring(3, 5));

    rowNum = '0' + (startRowNum + vectorTranslation[0]).toString();
    colNum = '0' + (startColNum + vectorTranslation[1]).toString();
    
    return '_' + rowNum +colNum;
}
function getIntSquareCoordinate(stringCoordinate) {
    var x = Number(stringCoordinate.substring(1, 3));
    var y = Number(stringCoordinate.substring(3, 5));
    var coordinate = [x, y];
    return coordinate;
}
function moveDown() {
    if (!GB.isGameOver()) {
        if (!pause) {
            GB.moveDown();
        }
    } else {
        clearInterval(myInterval);
    }
}
function sendScore() {
    var form = document.createElement("form");
    var score = document.createElement("input");

    form.method = "POST";
    form.action = "leaderboard.php";

    score.value = GB.getScore();
    score.name = "score";
    form.appendChild(score);

    document.body.appendChild(form);

    form.submit();
}

//main code
function main() {
    var audio = new Audio("src/audio/bangerang.mp3");
    audio.play();
    GB = new GameBoard();
    GB.newGamePiece(); 
    myInterval = setInterval(moveDown, 1000);
}

document.onkeydown = function(e) {
    switch (e.keyCode) {
        case 37: //left arrow
            GB.moveLeft();
            break;
        case 39: // right arrow
            GB.moveRight();
            break;
        case 40: // down arrow
            GB.moveDown();
            break;
        case 38: // up arrow
            GB.rotate();
            break;
        case 32: //space bar
            var currentPiece = GB.getCurrentPiece();
            var gameOver = GB.isGameOver();
            while (GB.getCurrentPiece() == currentPiece && !gameOver) {
                GB.moveDown();
            }
            break;
    }
};


//"j.hu@exeter.ac.uk"