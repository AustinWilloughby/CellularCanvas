// Canvas Class: this will take care of managing the canvas.
// The idea is that we can break the canvas into "cells", which
// are essentially large pixels (something like 10px by 10px).
// These cells can also compute extra data, such as change
// based on their neighbors.
class Canvas {

    // Setup some starter values here, and get context with the canvas.
    constructor(canvasId, pixelSize) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext("2d");

        // Figure out how many cells wide and tall we want the canvas to be.
        this.horizontalPixelCount = Math.trunc(this.canvas.width / pixelSize);
        this.verticalPixelCount = Math.trunc(this.canvas.height / pixelSize);

        // Create our 2d array to hold our cells and populate it.
        this.pixelGrid = new Array(this.horizontalPixelCount);
        for (let x = 0; x < this.horizontalPixelCount; x++) {
            this.pixelGrid[x] = new Array(this.verticalPixelCount);
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.pixelGrid[x][y] = new Cell(x, y, pixelSize);
                this.pixelGrid[x][y].drawColor = `rgb(255, ${x}, ${y})`;
            }
        }

        this.flaggedPixels = [];

        // Draw all the cells to the canvas
        this.drawAll();
        
        this.updatePixel(4, 3, "green");
        this.drawFlagged();


    }

    // Function for handing canvas resizing.
    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.drawAll();
    }

    // Redraw all of the cells in our cell array.
    drawAll() {
        for (let x = 0; x < this.horizontalPixelCount; x++) {
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.drawSinglePixel(x, y);
            }
        }
    }

    drawFlagged() {
        this.flaggedPixels.forEach((pixel) => {
            this.drawSinglePixel(pixel.xCoord, pixel.yCoord);
        });

        this.flaggedPixels = [];
    }


    // Helper function for redrawing a single cell to the canvas.
    drawSinglePixel(x, y) {
        this.ctx.save();

        let pixel = this.pixelGrid[x][y];
        this.ctx.fillStyle = pixel.drawColor;
        this.ctx.fillRect(pixel.topLeftX,
            pixel.topLeftY,
            pixel.bottomRightX,
            pixel.bottomRightY);
            console.dir("drawing " + pixel.topLeftX + " " + pixel.topLeftY);
            console.dir(pixel.bottomRightX + " " + pixel.bottomRightY);

        this.ctx.restore();
    }

    updatePixel(x, y, color) {
        this.pixelGrid[x][y].drawColor = color;
        this.flaggedPixels.push(this.pixelGrid[x][y]);
    }
};
