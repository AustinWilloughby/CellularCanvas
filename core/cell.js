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
        this.hue = 0;
        this.saturation = 0;
        this.lightness = 0;

        this.canvas = parentCanvas;
    }

//  updateCellRGBA(r, g, b, a) {
//      if (this.red != r || this.green != g || this.blue != b || this.alpha != a) {
//          this.red = r;
//          this.green = g;
//          this.blue = b;
//          this.alpha = a;

//          this.drawColor = `rgba(${r}, ${g}, ${b}, ${a})`;
//          
//          this.canvas.flaggedPixels.push(this);
//      }
//  }
    
    updateCellRGBA(r, g, b, a) {
        let roundR = Math.round(r);
        let roundG = Math.round(g);
        let roundB = Math.round(b);
        
        if (this.red != roundR || this.green != roundG || this.blue != roundB || this.alpha != a) {
            this.red = roundR;
            this.green = roundG;
            this.blue = roundB;
            this.alpha = a;

            this.drawColor = `rgba(${roundR}, ${roundG}, ${roundB}, ${a})`;
            this.canvas.flaggedPixels.push(this);
        }
    }
    
    updateCellHSLA(h, s, l, a) {
        if (this.hue != h || this.saturation != s || this.lightness != l || this.alpha != a) {
            this.hue = h;
            this.saturation = s;
            this.lightness = l;
            this.alpha = a;

            this.drawColor = hslaStringified(h, s, l, a);
            this.canvas.flaggedPixels.push(this);
        }
    }
}
