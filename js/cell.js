class Cell {
    constructor(x, y, pixelSize) {
        this.xCoord = x;
        this.yCoord = y;

        this.topLeftX = x * pixelSize;
        this.topLeftY = y * pixelSize;

        this.bottomRightX = (x + 1) * pixelSize;
        this.bottomRightY = (y + 1) * pixelSize;

        this.drawColor = "black";
    }
}
