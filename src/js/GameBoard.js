class GameBoard{
    gameBoard;
    pieces;
    currentPiece;
    gameOver;
    score;

    constructor() {
        this.gameBoard = createGB();
        this.pieces = [];
        this.currentPiece = null;
        this.gameOver = false;
        this.score;
    }

    newGamePiece() {
        //select random game piece
        var chosenPiece = gameChars[Math.floor(Math.random() * gameChars.length)];
        var shapeCoordinates = gamePieces[chosenPiece];

        //insert game piece if top row is unoccupied
        for (var i = 0; i < 10; i++) {
            if (this.gameBoard[i][0] instanceof Square) {
                this.gameOver = true;
                break
            }
        }
        
        //insert new piece
        if (!this.gameOver) {
            // update the score at the top of the page
            this.score = this.pieces.length;
            let ele = document.getElementById('score');
            ele.innerHTML = this.score.toString();

            // selects random location on top row to start
            if (chosenPiece == 'I') {
                var colNum = Math.floor(Math.random() * (-1 - 10 + 1) + 10);
                var locationID = "_0" + colNum.toString() + "00"; 
            }
            else if (chosenPiece == 'L' || chosenPiece == 'O') {
                var colNum = Math.floor(Math.random() * (-1 - 9 + 1) + 9);
                var locationID = "_0" + colNum.toString() + "00"; 
            }
            else if (chosenPiece == 'S' || chosenPiece == 'T' || chosenPiece == 'Z') {
                var colNum = Math.floor(Math.random() * (-1 - 8 + 1) + 8);
                var locationID = "_0" + colNum.toString() + "00";
            }

            // checks there won't be a collision with an existing piece
            // if there is the game is over
            var collision = false;

            var x = colNum;
            var y = 0;

            for (var i = 0; i < 4; i++) {
                var checkSquare = shapeCoordinates[i];
                if (this.gameBoard[x + checkSquare[0]][y + checkSquare[1]] instanceof Square) {
                    collision = true;
                    this.gameOver = true;
                    this.newGamePiece();
                }
            }
            
            if (!collision) {
                var gamePiece = new GamePiece(shapeCoordinates, chosenPiece, this.pieces.length, locationID);
            
                //set new game pieces squares to occupied
                for (var i = 0; i < gamePiece.getShapeSquares().length; i++) {
                    this.setPositionOccupied(gamePiece.getShapeSquares()[i].getCoordinates(), gamePiece.getShapeSquares()[i]);
                }
                this.pieces.push(gamePiece);
                this.currentPiece = this.pieces[this.pieces.length - 1];

                this.currentPiece.moveLeft();
            }       
        } else{
            // gets ride of the current piece   
            this.currentPiece = null;
            // game  over so sends score to leaderboard.php
            sendScore();
        }
    }

    checkRow() {
        for (var y = 0; y < 20; y++) {
            var rowNum = 0;
            for (var x = 0; x < 10; x++) {
                if (this.gameBoard[x][y] instanceof Square){
                    rowNum++;
                }
                if (rowNum == 10) {
                    // remove full row
                    for (var i = 0; i < 10; i++) {
                        //remove div
                        if (this.gameBoard[i][y] instanceof Square) {
                            this.gameBoard[i][y].remove();
                        }

                        // remove array position
                        this.gameBoard[i][y] = null;
                    }

                    // move everything above the full row down by 1
                    for (var i = y - 1; i >= 0; i--){
                        for (var j = 0; j < 10; j++) {
                            if (this.gameBoard[j][i] instanceof Square) {
                                // move div
                                this.gameBoard[j][i].moveDown();

                                // move array item
                                this.gameBoard[j][i + 1] = this.gameBoard[j][i];
                                this.gameBoard[j][i] = null;
                            }
                        }
                    }
                }
            }
        }
    }

    moveDown() {
        if (!this.gameOver) {
            //see if there is a free block down
            var moveDown = true;
            for(var i = 0; i < this.currentPiece.getShapeSquares().length; i++) {
                var x = this.currentPiece.getShapeSquares()[i].getX();
                var y = this.currentPiece.getShapeSquares()[i].getY();
                if (this.gameBoard[x][y + 1] instanceof Square && this.gameBoard[x][y + 1].getParentID() != this.currentPiece.getShapeSquares()[i].getParentID()) {
                    moveDown = false;          
                    break;
                }
            }
            if (this.currentPiece.getLowestSquare()[0] == 19 || !moveDown) {
                this.newGamePiece();
                this.checkRow();
            } else{       
                this.currentPiece.moveDown();
                //change the position of div in gameBoard
                for(var i = 0; i < 2 * this.currentPiece.getShapeSquares().length; i++) {
                    if (i > 3) {
                        //add new
                        var newX = this.currentPiece.getShapeSquares()[i - 4].getX();
                        var newY = this.currentPiece.getShapeSquares()[i - 4].getY();
                        
                        this.gameBoard[newX][newY] = this.currentPiece.getShapeSquares()[i - 4];
                    } else{
                        //set old to null
                        var oldX = this.currentPiece.getShapeSquares()[i].getX();
                        var oldY = this.currentPiece.getShapeSquares()[i].getY() - 1;
                        
                        this.gameBoard[oldX][oldY] = null;
                    }
                }
            }
        }
    }
    moveLeft() {
        if (!this.gameOver) {
            //see if there is a free block left
            var moveLeft = true;
            for(var i = 0; i < this.currentPiece.getShapeSquares().length; i++) {
                var x = this.currentPiece.getShapeSquares()[i].getX();
                var y = this.currentPiece.getShapeSquares()[i].getY();
                if (x > 0) {
                    if (
                        this.gameBoard[x - 1][y] instanceof Square && 
                        this.gameBoard[x - 1][y].getParentID() != this.currentPiece.getShapeSquares()[i].getParentID()
                        ) {
                        moveLeft = false;
                        break;
                    }
                }
            }
            var leftest = null;
            for(var i = 0; i < this.currentPiece.getSquareX().length; i++) {
                if (leftest == null) {
                    leftest = this.currentPiece.getSquareX()[i][1];
                } else {
                    if (leftest > this.currentPiece.getSquareX()[i][1]) {
                        leftest = this.currentPiece.getSquareX()[i][1];
                    }
                }
            }
            if (
                (leftest > 0 && moveLeft && ( // normal
                    (this.currentPiece.getPieceType() == 'L' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2)) ||
                    (this.currentPiece.getPieceType() == 'Z' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2)) ||
                    (this.currentPiece.getPieceType() == 'S' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 4)) ||
                    (this.currentPiece.getPieceType() == 'T' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2)) ||
                    (this.currentPiece.getPieceType() == 'I' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2 || this.currentPiece.getRotationPos() == 3)) ||
                    this.currentPiece.getPieceType() == 'O'
                ))
                ||
                (leftest > 1 && moveLeft && ( // 1 too far
                    (this.currentPiece.getPieceType() == 'L' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'Z' && this.currentPiece.getRotationPos() == 4) ||
                    (this.currentPiece.getPieceType() == 'S' && this.currentPiece.getRotationPos() == 2) ||
                    (this.currentPiece.getPieceType() == 'T' && this.currentPiece.getRotationPos() == 4)
                ))
                ||
                (leftest > 2 && moveLeft && ( // 2 too far
                    (this.currentPiece.getPieceType() == 'L' && this.currentPiece.getRotationPos() == 4) ||
                    (this.currentPiece.getPieceType() == 'Z' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'S' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'T' && this.currentPiece.getRotationPos() == 3)
                ))
                ||
                (leftest > 3 && moveLeft && ( // 3 too far
                    (this.currentPiece.getPieceType() == 'I' && this.currentPiece.getRotationPos() == 4)
                ))
            ) {
                this.currentPiece.moveLeft();

                //change the position of div in gameBoard
                for(var i = 0; i < 2 * this.currentPiece.getShapeSquares().length; i++) {
                    if (i > 3) {
                        //add new
                        var newX = this.currentPiece.getShapeSquares()[i - 4].getX();
                        var newY = this.currentPiece.getShapeSquares()[i - 4].getY();

                        this.gameBoard[newX][newY] = this.currentPiece.getShapeSquares()[i - 4];
                    } else{
                        //set old to null
                        var oldX = this.currentPiece.getShapeSquares()[i].getX() + 1;
                        var oldY = this.currentPiece.getShapeSquares()[i].getY();

                        this.gameBoard[oldX][oldY] = null;
                    }
                }
            }
        }
    }
    moveRight() {
        if (!this.gameOver) {
            //see if there is a free block right
            var moveRight = true;
            for(var i = 0; i < this.currentPiece.getShapeSquares().length; i++) {
                var x = this.currentPiece.getShapeSquares()[i].getX();
                var y = this.currentPiece.getShapeSquares()[i].getY();
                if (x < 9) {
                    if (
                        this.gameBoard[x + 1][y] instanceof Square && 
                        this.gameBoard[x + 1][y].getParentID() != this.currentPiece.getShapeSquares()[i].getParentID()
                    ) {
                        moveRight = false;
                        break;
                    }
                }
            }
            var rightest = null;
            for(var i = 0; i < this.currentPiece.getSquareX().length; i++) {
                if (rightest == null) {
                    rightest = this.currentPiece.getSquareX()[i][1];
                } else {
                    if (rightest < this.currentPiece.getSquareX()[i][1]) {
                        rightest = this.currentPiece.getSquareX()[i][1];
                    }
                }
            }
            if (
                (rightest < 12 && moveRight && ( // normal
                    (this.currentPiece.getPieceType() == 'L' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2)) ||
                    (this.currentPiece.getPieceType() == 'Z' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2)) ||
                    (this.currentPiece.getPieceType() == 'S' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 4)) ||
                    (this.currentPiece.getPieceType() == 'T' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 4)) ||
                    (this.currentPiece.getPieceType() == 'I' && (this.currentPiece.getRotationPos() == 0 || this.currentPiece.getRotationPos() == 1 || this.currentPiece.getRotationPos() == 2 || this.currentPiece.getRotationPos() == 3)) ||
                    this.currentPiece.getPieceType() == 'O'
                ))
                ||
                (rightest < 11 && moveRight && ( // 1 too far
                    (this.currentPiece.getPieceType() == 'L' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'Z' && this.currentPiece.getRotationPos() == 4) ||
                    (this.currentPiece.getPieceType() == 'S' && this.currentPiece.getRotationPos() == 2) ||
                    (this.currentPiece.getPieceType() == 'T' && this.currentPiece.getRotationPos() == 2)
                ))
                ||
                (rightest < 10 && moveRight && ( // 2 too far
                    (this.currentPiece.getPieceType() == 'L' && this.currentPiece.getRotationPos() == 4) ||
                    (this.currentPiece.getPieceType() == 'Z' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'S' && this.currentPiece.getRotationPos() == 3) ||
                    (this.currentPiece.getPieceType() == 'T' && this.currentPiece.getRotationPos() == 3)
                ))
                ||
                (rightest < 9 && moveRight && ( // 3 too far
                    (this.currentPiece.getPieceType() == 'I' && this.currentPiece.getRotationPos() == 4)
                ))
            ) {
                this.currentPiece.moveRight();

                // change the position of div in gameBoard
                for(var i = 0; i < 2 * this.currentPiece.getShapeSquares().length; i++) {
                    if (i > 3) {
                        // add new   
                        var newX = this.currentPiece.getShapeSquares()[i - 4].getX();
                        var newY = this.currentPiece.getShapeSquares()[i - 4].getY();
                        
                        this.gameBoard[newX][newY] = this.currentPiece.getShapeSquares()[i - 4];
                    } else{
                        // set old to null
                        var oldX = this.currentPiece.getShapeSquares()[i].getX() - 1;
                        var oldY = this.currentPiece.getShapeSquares()[i].getY();

                        this.gameBoard[oldX][oldY] = null;
                    }
                }
            }
        }
    }
    rotate() {        
        var square1 = [this.currentPiece.getShapeSquares()[0].getX(), this.currentPiece.getShapeSquares()[0].getY()];
        var square2 = [this.currentPiece.getShapeSquares()[1].getX(), this.currentPiece.getShapeSquares()[1].getY()];
        var square3 = [this.currentPiece.getShapeSquares()[2].getX(), this.currentPiece.getShapeSquares()[2].getY()];
        var square4 = [this.currentPiece.getShapeSquares()[3].getX(), this.currentPiece.getShapeSquares()[3].getY()];

        var collision = false;
        var outOfBounds = false;
        if (this.currentPiece.getPieceType() == 'O') {
            //does nothing
        } else if (this.currentPiece.getPieceType() == 'I') {
            // newX = (y - b) + a   x,y original points of a square
            // newY = -(x - a) + b  a,b fixed point (square 3)

            var square1X = (square1[1] - square3[1]) + square3[0];
            var square1Y = -(square1[0] - square3[0]) + square3[1];

            var square2X = (square2[1] - square3[1]) + square3[0];
            var square2Y = -(square2[0] - square3[0]) + square3[1];

            var square4X = (square4[1] - square3[1]) + square3[0];
            var square4Y = -(square4[0] - square3[0]) + square3[1];

            //checks to see if it is possible to rotate the shape
            // if the shape rotates to out of bounds
            if (
                square1X < 0 || square2X < 0 || square4X < 0 ||
                square1X > 9 || square2X > 9 || square4X > 9 ||
                square1Y > 19 || square2Y > 19 || square4Y > 19 ||
                square1Y < 0 || square2Y < 0 || square4Y < 0 ||
                typeof this.gameBoard[square1X][square1Y] === "undefined" ||
                typeof this.gameBoard[square2X][square2Y] === "undefined" ||
                typeof this.gameBoard[square4X][square4Y] === "undefined"
                ) {
                outOfBounds = true;
            }
            if (!outOfBounds) {
                // if the shape rotates into another shape
                if (
                    (this.gameBoard[square1X][square1Y] != null && this.gameBoard[square1X][square1Y].getParentID() != this.currentPiece.getID()) 
                    || 
                    (this.gameBoard[square2X][square2Y] != null && this.gameBoard[square2X][square2Y].getParentID() != this.currentPiece.getID())
                    || 
                    (this.gameBoard[square4X][square4Y] != null && this.gameBoard[square4X][square4Y].getParentID() != this.currentPiece.getID())
                ) {
                    collision = true;
                }
                if (!collision) {
                    // moves divs
                    this.currentPiece.getShapeSquares()[0].setXY(square1X, square1Y);
                    this.currentPiece.getShapeSquares()[1].setXY(square2X, square2Y);
                    this.currentPiece.getShapeSquares()[3].setXY(square4X, square4Y);

                    // change coordinates in array
                    this.gameBoard[square1[0]][square1[1]] = null;
                    this.gameBoard[square1X][square1Y] = this.currentPiece.getShapeSquares()[0];
                    this.gameBoard[square2[0]][square2[1]] = null;
                    this.gameBoard[square2X][square2Y] = this.currentPiece.getShapeSquares()[1];
                    this.gameBoard[square4[0]][square4[1]] = null;
                    this.gameBoard[square4X][square4Y] = this.currentPiece.getShapeSquares()[3];

                    // sets rotation position of the piece, used for calculating boundaries
                    if (this.currentPiece.getRotationPos() == 0) {
                        this.currentPiece.setRotationPos(2);
                    } else if (this.currentPiece.getRotationPos() == 4) {
                        this.currentPiece.setRotationPos(1);
                    } else {
                        var pos = this.currentPiece.getRotationPos() + 1;
                        this.currentPiece.setRotationPos(pos);
                    }
                }
            }
        } else {
            // newX = (y - b) + a   x,y original points of a square
            // newY = -(x - a) + b  a,b fixed point (square 2)

            var square1X = (square1[1] - square2[1]) + square2[0];
            var square1Y = -(square1[0] - square2[0]) + square2[1];

            var square3X = (square3[1] - square2[1]) + square2[0];
            var square3Y = -(square3[0] - square2[0]) + square2[1];

            var square4X = (square4[1] - square2[1]) + square2[0];
            var square4Y = -(square4[0] - square2[0]) + square2[1];

            //checks to see if it is possible to rotate the shape
            // if the shape rotates to out of bounds
            if (
                square1X < 0 || square3X < 0 || square4X < 0 ||
                square1X > 9 || square3X > 9 || square4X > 9 ||
                square1Y > 19 || square3Y > 19 || square4Y > 19 ||
                square1Y < 0 || square3Y < 0 || square4Y < 0 ||
                typeof this.gameBoard[square1X][square1Y] === "undefined" ||
                typeof this.gameBoard[square3X][square3Y] === "undefined" ||
                typeof this.gameBoard[square4X][square4Y] === "undefined"
                ) {
                outOfBounds = true;
            }
            if (!outOfBounds) {
                // if the shape rotates into another shape
                if (
                    (this.gameBoard[square1X][square1Y] != null && this.gameBoard[square1X][square1Y].getParentID() != this.currentPiece.getID()) 
                    || 
                    (this.gameBoard[square3X][square3Y] != null && this.gameBoard[square3X][square3Y].getParentID() != this.currentPiece.getID())
                    || 
                    (this.gameBoard[square4X][square4Y] != null && this.gameBoard[square4X][square4Y].getParentID() != this.currentPiece.getID())
                ) {
                    collision = true;
                }
                if (!collision) {
                    // moves divs
                    this.currentPiece.getShapeSquares()[0].setXY(square1X, square1Y);
                    this.currentPiece.getShapeSquares()[2].setXY(square3X, square3Y);
                    this.currentPiece.getShapeSquares()[3].setXY(square4X, square4Y);

                    // change coordinates in array
                    this.gameBoard[square1[0]][square1[1]] = null;
                    this.gameBoard[square1X][square1Y] = this.currentPiece.getShapeSquares()[0];
                    this.gameBoard[square3[0]][square3[1]] = null;
                    this.gameBoard[square3X][square3Y] = this.currentPiece.getShapeSquares()[2];
                    this.gameBoard[square4[0]][square4[1]] = null;
                    this.gameBoard[square4X][square4Y] = this.currentPiece.getShapeSquares()[3];

                    // sets rotation position of the piece, used for calculating boundaries
                    if (this.currentPiece.getRotationPos() == 0) {
                        this.currentPiece.setRotationPos(2);
                    } else if (this.currentPiece.getRotationPos() == 4) {
                        this.currentPiece.setRotationPos(1);
                    } else {
                        var pos = this.currentPiece.getRotationPos() + 1;
                        this.currentPiece.setRotationPos(pos);
                    }
                }
            }
        }
    }
    
    getGameBoard() {
        return this.gameBoard;
    }
    getCurrentPiece() {
        return this.currentPiece;
    }
    isGameOver() {
        return this.gameOver;
    }
    getScore() {
        return this.score;
    }

    setPositionOccupied(coordinate, squareObject) {
        var x = Number(coordinate.substring(1, 3));
        var y = Number(coordinate.substring(3, 5));
        this.gameBoard[x][y] = squareObject;
    }
    setPositionEmpty(x, y) {
        this.gameBoard[x][y] = null;
    }
}