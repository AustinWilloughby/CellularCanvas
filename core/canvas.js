// Canvas Class: this will take care of managing the canvas.
// The idea is that we can break the canvas into "cells", which
// are essentially large pixels (something like 10px by 10px).
// These cells can also compute extra data, such as change
// based on their neighbors.
class Canvas {

    // Setup some starter values here, and get context with the canvas.
    constructor(canvasId, pxSize) {
        this.canvas = document.getElementById(canvasId);
        this.pixelSize = pxSize;
        this.ctx = this.canvas.getContext("2d");

        this.resizeCanvas();

        //this.lastFrameTime = Date.now();
        
        this.updateLoop = this.updateLoop.bind(this);
        window.requestAnimationFrame(this.updateLoop);

        window.addEventListener('resize', () => {
            this.resizeCanvas();
        });
    }

    // Function for handing canvas resizing.
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        // Figure out how many cells wide and tall we want the canvas to be.
        this.horizontalPixelCount = Math.trunc(this.canvas.width / this.pixelSize) + 1;
        this.verticalPixelCount = Math.trunc(this.canvas.height / this.pixelSize) + 1;

        // Setup our array of "flagged pixels". This will be used internally
        // to keep track of all pixels that have been updated since the last
        // draw call. We can use it to optimally redraw only the pixels that
        // have changed to cutdown on draw time.
        this.flaggedPixels = [];

        // Create our 2d array to hold our cells and populate it.
        this.pixelGrid = new Array(this.horizontalPixelCount);
        for (let x = 0; x < this.horizontalPixelCount; x++) {
            this.pixelGrid[x] = new Array(this.verticalPixelCount);
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.pixelGrid[x][y] = new Cell(x, y, this.pixelSize, this);
            }
        }
        
        rulesetSetup(this.pixelGrid, this.horizontalPixelCount, this.verticalPixelCount);

        // Draw all the cells to the canvas
        this.drawFlagged();
    }

    updateLoop() {

        //const deltaTime = Date.now() - this.lastFrameTime;
        //this.lastFrameTime = Date.now();

        ruleset(this.pixelGrid, this.horizontalPixelCount, this.verticalPixelCount);
        this.drawFlagged();

        requestAnimationFrame(this.updateLoop);
    }

    // Redraw all of the cells in our cell array.
    drawAll() {
        for (let x = 0; x < this.horizontalPixelCount; x++) {
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.drawSinglePixel(x, y);
            }
        }

        // If the entire canvas has been redrawn, then there is
        // no point to keeping a backlog of the pixels that had
        // been previously flagged.
        this.flaggedPixels = [];
    }

    // Redraw all of the "flagged" cells.
    // A flagged cell is one that has been changed since the last
    // draw call. By only redrawing the ones that have changed, a
    // lot of time can be saved on drawing.
    drawFlagged() {

        //for (var i = 0, len = this.flaggedPixels.length; i < len; i++) {
        //    let pixel = this.flaggedPixels[i];
        //    this.drawSinglePixel(pixel.xCoord, pixel.yCoord);
        //}

        this.flaggedPixels.forEach((pixel) => {
            this.drawSinglePixel(pixel.xCoord, pixel.yCoord);
        });

        this.flaggedPixels = [];
    }


    // Helper function for redrawing a single cell to the canvas.
    drawSinglePixel(x, y) {
        //this.ctx.save();

        let pixel = this.pixelGrid[x][y];
        this.ctx.fillStyle = pixel.drawColor;
        this.ctx.fillRect(
            pixel.drawXPosition,
            pixel.drawYPosition,
            this.pixelSize,
            this.pixelSize);

        //this.ctx.restore();
    }

    // Updates a single pixel
    updatePixel(x, y, color) {
        this.pixelGrid[x][y].drawColor = color;
        this.flaggedPixels.push(this.pixelGrid[x][y]);
    }
};
