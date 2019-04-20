// Cell Class: a cell is the atomic unit of the system.
// Each cell will keep track of where it is, and all the
// information needed to draw it to the canvas.
class Cell {
    constructor(x, y, pixelSize, parentCanvas) {
        this.xCoord = x;
        this.yCoord = y;

        this.drawXPosition = x * pixelSize;
        this.drawYPosition = y * pixelSize;

        this.drawColor = "black";
        this.red = 0;
        this.green = 0;
        this.blue = 0;
        this.alpha = 1;
        
        this.canvas = parentCanvas;
    }
    
    updateCell(r, g, b, a) {
        this.red = r;
        this.green = g;
        this.blue = b;
        this.alpha = a;
        
        this.drawColor = `rgba(${r}, ${g}, ${b}, ${a})`;
        this.canvas.flaggedPixels.push(this);
    }
}
