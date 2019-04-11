// Cell Class: a cell is the atomic unit of the system.
// Each cell will keep track of where it is, and all the
// information needed to draw it to the canvas.
class Cell {
    constructor(x, y, pixelSize) {
        this.xCoord = x;
        this.yCoord = y;

        this.topLeftX = x * pixelSize;
        this.topLeftY = y * pixelSize;

        this.bottomRightX = (x + 1) * pixelSize;
        this.bottomRightY = (y + 1) * pixelSize;

        this.drawColor = "black";
        this.redraw = true;
    }
}
