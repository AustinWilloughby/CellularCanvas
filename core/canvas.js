const TARGET_FPS = 60;
let fpsInterval = 0;
let currentTime = 0;
let elapsedTime = 0;
let thenTime = 0;

let startTime = Date.now();
let frameCount = 0;


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

    fpsInterval = TARGET_FPS / 1000;

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
    this.horizontalPixelCount = Math.trunc((this.canvas.width / this.pixelSize) + 0.5);
    this.verticalPixelCount = Math.trunc((this.canvas.height / this.pixelSize) + 0.5);

    // Setup our array of "flagged pixels". This will be used internally
    // to keep track of all pixels that have been updated since the last
    // draw call. We can use it to optimally redraw only the pixels that
    // have changed to cutdown on draw time.
    this.flaggedPixels = [];


    let count = 0;
    // Create our 2d array to hold our cells and populate it.
    this.pixelGrid = new Array(this.horizontalPixelCount);
    for (let x = 0; x < this.horizontalPixelCount; x++) {
      this.pixelGrid[x] = new Array(this.verticalPixelCount);
      for (let y = 0; y < this.verticalPixelCount; y++) {
        this.pixelGrid[x][y] = new Cell(x, y, this.pixelSize, this);
        count = count + 1;
      }
    }

    rulesetSetup(this.pixelGrid, this.horizontalPixelCount, this.verticalPixelCount);

    // Draw all the cells to the canvas
    this.drawFlagged();
  }

  updateLoop() {
    // Request the next update frame.
    requestAnimationFrame(this.updateLoop);

    // Keep track of the timestep since the last animation frame.
    currentTime = Date.now();
    elapsedTime = currentTime - thenTime;

    // Prevent the framerate from going too high. Try to force 60fps.
    if (elapsedTime > fpsInterval) {
      thenTime = currentTime - (elapsedTime % fpsInterval);
      
      ruleset(this.pixelGrid, this.horizontalPixelCount, this.verticalPixelCount);
      this.drawFlagged();
    }
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
    this.flaggedPixels.length = 0;
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

    this.flaggedPixels.length = 0;
  }


  // Helper function for redrawing a single cell to the canvas.
  drawSinglePixel(x, y) {

    let pixel = this.pixelGrid[x][y];
    this.ctx.fillStyle = pixel.drawColor;
    this.ctx.fillRect(
      pixel.drawXPosition,
      pixel.drawYPosition,
      this.pixelSize,
      this.pixelSize);
  }
};
