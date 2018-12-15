class Canvas {
    constructor(canvasId, pixelSize) {
        this.canvas = document.getElementById(canvasId);
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;

        this.ctx = this.canvas.getContext("2d");

        this.horizontalPixelCount = Math.trunc(this.canvas.width / pixelSize);
        this.verticalPixelCount = Math.trunc(this.canvas.height / pixelSize);

        this.pixelGrid = new Array(this.horizontalPixelCount);

        for (let x = 0; x < this.horizontalPixelCount; x++) {
            this.pixelGrid[x] = new Array(this.verticalPixelCount);
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.pixelGrid[x][y] = new Cell(x, y, pixelSize);
            }
        }

        this.draw();
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
        this.draw();
    }

    draw() {
        for (let x = 0; x < this.horizontalPixelCount; x++) {
            for (let y = 0; y < this.verticalPixelCount; y++) {
                this.drawSinglePixel(x, y);
            }
        }
    }

    drawSinglePixel(x, y) {
        this.ctx.save();

        let pixel = this.pixelGrid[x][y];
        this.ctx.fillStyle = pixel.drawColor;
        this.ctx.fillRect(pixel.topLeftX,
            pixel.topLeftY,
            pixel.bottomRightX,
            pixel.bottomRightY);

        this.ctx.restore();
    }
};
