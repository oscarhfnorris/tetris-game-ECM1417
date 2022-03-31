class GamePiece{
    pieceID;
    pieceType;
    pieceColour;
    shapeCoordinates;
    shapeSquares = [];
    rotationPos;
    locationID;

    constructor(shapeCoordinates, chosenPiece, pieceID, locationID) {
        this.pieceID = pieceID;
        this.pieceType = chosenPiece;
        this.pieceColour = pieceColours[chosenPiece];
        this.shapeCoordinates = shapeCoordinates;
        this.rotationPos = 0;
        this.locationID = locationID;

        //add piece Squares
        var squareNum = 0;
        for (var x = 0; x < shapeCoordinates.length; x++) {
            var square = new Square(setSquareCoordinate(this.locationID, shapeCoordinates[x]), this.pieceColour, this.pieceID, squareNum);
            this.shapeSquares.push(square);
            squareNum++;
        }
    }

    moveDown() {
        for (var i = 0; i < this.shapeSquares.length; i++) {
            this.shapeSquares[i].moveDown();
        }
    }
    moveLeft() {
        for (var i = 0; i < this.shapeSquares.length; i++) {
            this.shapeSquares[i].moveLeft();
        }
    }
    moveRight() {
        for (var i = 0; i < this.shapeSquares.length; i++) {
            this.shapeSquares[i].moveRight();
        }
    }

    getLowestSquare() {
        var lowest = [];
        for (var i = 0; i < this.shapeSquares.length; i++) {
            var y = this.shapeSquares[i].getY();
            var squareID = this.shapeSquares[i].getID();
            if (lowest.length == 0) {
                lowest.push(y);
                lowest.push(squareID);
            } else {
                if (lowest[0] < y) {
                    lowest = [];
                    lowest.push(y);
                    lowest.push(squareID);
                }
            }
        }
        return lowest;
    }
    getSquareX() {
        var squareNum = 0;
        var xPositions = [];
        for (var i = 0; i < this.shapeSquares.length; i++) {
            var squareID = this.shapeSquares[i].getID();
            var x = this.shapeSquares[i].getX() + squareNum;
            xPositions.push([squareID, x])
            squareNum++;
        }
        return xPositions;
    }
    getShapeSquares() {
        return this.shapeSquares;
    }
    getID() {
        return this.pieceID;
    }
    getPieceType() {
        return this.pieceType;
    }
    getRotationPos() {
        return this.rotationPos;
    }

    setRotationPos(pos) {
        this.rotationPos = pos;
    }
}