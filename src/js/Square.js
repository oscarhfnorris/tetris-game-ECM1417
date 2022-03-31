class Square{
    squareID;
    parentID;
    coordinate;
    colour;
    div;
    squareNum;
    x;
    y;

    constructor(coordinate, colour, pieceID, squareNum) {
        this.squareID = pieceID.toString() + "_" + squareNum.toString();
        this.coordinate = coordinate;
        this.colour = colour;
        this.parentID = pieceID;

        var intCoordinates = getIntSquareCoordinate(coordinate);
        this.x = intCoordinates[0] * 3.8 + 3.8;
        this.y = intCoordinates[1] * 3.8;

        //create the div and move it to the right location
        this.div = document.createElement("div");
        this.div.style.margin = "0";
        this.div.style.padding = "0";
        this.div.style.height = "3.8vh";
        this.div.style.width = "3.8vh";
        this.div.style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
        this.div.style.backgroundColor = this.colour.toString();
        this.div.style.boxShadow = "inset 0.1vh 0.1vh 0 0, inset -0.1vh -0.1vh 0vh 0.1vh black";
        this.div.style.position = "absolute";
        this.div.id = this.squareID;
        document.getElementById("tetris-bg").appendChild(this.div);
    }

    moveUp() {
        this.y = this.y - 3.8;
        document.getElementById(this.squareID).style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
    }
    moveDown() {
        this.y = this.y + 3.8;
        document.getElementById(this.squareID).style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
    }
    moveLeft() {
        this.x = this.x - 3.8;
        document.getElementById(this.squareID).style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
    }
    moveRight() {
        this.x = this.x + 3.8;
        document.getElementById(this.squareID).style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
    }

    changeColour(colour, invisible) {
        this.colour = colour;
        document.getElementById(this.squareID).style.backgroundColor = this.colour.toString();
        if (invisible) {
            document.getElementById(this.squareID).style.boxShadow = "0";
        }
    }
    remove() {
        var div = document.getElementById(this.squareID);
        div.remove();
    }
    
    getID() {
        return this.squareID;
    }
    getCoordinates() {
        return this.coordinate;
    }
    getX() {
        return Math.round(this.x / 3.8);
    }
    getY() {
        return Math.round(this.y / 3.8);
    }
    getParentID() {
        return this.parentID;
    }
    setXY(x, y) {
        this.x = 3.8 * x;
        this.y = 3.8 * y;
        document.getElementById(this.squareID).style.transform = "translate(" + this.x + "vh," + this.y + "vh)";
    }
}