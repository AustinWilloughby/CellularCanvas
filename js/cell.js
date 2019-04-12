// Cell Class: a cell is the atomic unit of the system.
// Each cell will keep track of where it is, and all the
// information needed to draw it to the canvas.
class Cell {
    constructor(x, y, pixelSize) {
        this.xCoord = x;
        this.yCoord = y;

        this.drawXPosition = x * pixelSize;
        this.drawYPosition = y * pixelSize;

        this.drawColor = "black";
        this.redraw = true;
    }
}
