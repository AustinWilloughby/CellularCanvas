const STAR_CHANCE = 0.0000025;
const MIN_STAR_LIFETIME = 2000;
const MAX_STAR_LIFETIME = 10000;

const MINIMUM_RED = 16;
const MINIMUM_GREEN = 25;
const MINIMUM_BLUE = 40;

let lastFrame = Date.now();

// Used to setup the base state of information for the ruleset. May do nothing.
const rulesetSetup = (pixelGrid, xSize, ySize) => {
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            pixelGrid[x][y].updateCellRGBA(MINIMUM_RED, MINIMUM_GREEN, MINIMUM_BLUE, 1);
        }
    }
};

const ruleset = (pixelGrid, xSize, ySize) => {
    let date = Date.now();
    let frameTime = date - lastFrame;
    let cell;

    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            cell = pixelGrid[x][y];

            if (Math.random() < STAR_CHANCE) {
                limitedRGBA(cell, randNum(150, 255), randNum(150, 255), randNum(150, 255), 1);
                cell.lifetime = date + randNum(MIN_STAR_LIFETIME, MAX_STAR_LIFETIME);
                cell.living = true;
            } else if (cell.living && date > cell.lifetime) {
                limitedRGBA(cell, 16, 25, 40, 1);
                cell.living = false;
            }


            //If it isn't alive, blur
            if (!cell.living) {
                if (x > 0 && x + 1 < xSize && y > 0 && y + 1 < ySize) {
                    let up = pixelGrid[x][y + 1];
                    let down = pixelGrid[x][y - 1];
                    let left = pixelGrid[x + 1][y];
                    let right = pixelGrid[x - 1][y];

                    limitedRGBA(cell, 
                        (up.red + down.red + left.red + right.red) / 4.001,
                        (up.green + down.green + left.green + right.green) / 4.001,
                        (up.blue + down.blue + left.blue + right.blue) / 4.001, 1);
                } else {
                    //Special case for edge cells. Slower, but needed for correct effect
                    let redAverage = 0;
                    let greenAverage = 0;
                    let blueAverage = 0;
                    let neighbors = 0;
                    let checkCell;

                    if (x > 0) {
                        checkCell = pixelGrid[x - 1][y];
                        redAverage += checkCell.red;
                        greenAverage += checkCell.green;
                        blueAverage += checkCell.blue;
                        neighbors++;
                    }

                    if (x < xSize - 1) {
                        checkCell = pixelGrid[x + 1][y];
                        redAverage += checkCell.red;
                        greenAverage += checkCell.green;
                        blueAverage += checkCell.blue;
                        neighbors++;
                    }

                    if (y > 0) {
                        checkCell = pixelGrid[x][y - 1];
                        redAverage += checkCell.red;
                        greenAverage += checkCell.green;
                        blueAverage += checkCell.blue;
                        neighbors++;
                    }

                    if (y < ySize - 1) {
                        checkCell = pixelGrid[x][y + 1];
                        redAverage += checkCell.red;
                        greenAverage += checkCell.green;
                        blueAverage += checkCell.blue;
                        neighbors++;
                    }

                    redAverage = redAverage / neighbors;
                    greenAverage = greenAverage / neighbors;
                    blueAverage = blueAverage / neighbors;

                    //cell.updateCellRGBA(redAverage, greenAverage, blueAverage, 1);
                    limitedRGBA(cell, redAverage, greenAverage, blueAverage, 1);
                }
            }
        }
    }
};

const limitedRGBA = (cell, r, g, b, a) => {
    if(r < MINIMUM_RED && g < MINIMUM_GREEN && b < MINIMUM_BLUE){
        r = MINIMUM_RED;
        g = MINIMUM_GREEN;
        b = MINIMUM_BLUE;
    }
    
    if (cell.red < MINIMUM_RED && cell.green < MINIMUM_RED && cell.blue < MINIMUM_BLUE) {
        cell.updateCellRGBA(16, 25, 40, 1);
    } else {
        cell.updateCellRGBA(r, g, b, a);
    } 
}
