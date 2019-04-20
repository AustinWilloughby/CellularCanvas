const STAR_CHANCE = 0.00000025;
const MIN_STAR_LIFETIME = 2000;
const MAX_STAR_LIFETIME = 10000;

// Used to setup the base state of information for the ruleset. May do nothing.
const rulesetSetup = (pixelGrid, xSize, ySize) => {
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            pixelGrid[x][y].updateCellRGBA(25 + Math.random() * 5, 34 + Math.random() * 5, 52 + Math.random() * 5, 1);
        }
    }
};

const ruleset = (pixelGrid, xSize, ySize) => {
    let date = Date.now();
    let cell;

    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            cell = pixelGrid[x][y];

            if (Math.random() < STAR_CHANCE) {
                cell.updateCellRGBA(randNum(150, 255), randNum(150, 255), randNum(150, 255), 1);
                cell.lifetime = date + randNum(MIN_STAR_LIFETIME, MAX_STAR_LIFETIME);
                cell.living = true;
            } else if (cell.living && date > cell.lifetime) {
                cell.updateCellRGBA(randNum(25, 30), randNum(34, 39), randNum(52, 57), 1);
                cell.living = false;
            }

            if (!cell.living && x > 0 && x + 1 < xSize && y > 0 && y + 1 < ySize) {
                let up = pixelGrid[x][y + 1];
                let down = pixelGrid[x][y - 1];
                let left = pixelGrid[x + 1][y];
                let right = pixelGrid[x - 1][y];

                cell.updateCellRGBA((up.red + down.red + left.red + right.red) / 4,
                    (up.green + down.green + left.green + right.green) / 4,
                    (up.blue + down.blue + left.blue + right.blue) / 4, 1)
            }

            
            //If it isn't alive, blur
            if (!cell.living) {
                if (x > 0 && x + 1 < xSize && y > 0 && y + 1 < ySize) {
                    let up = pixelGrid[x][y + 1];
                    let down = pixelGrid[x][y - 1];
                    let left = pixelGrid[x + 1][y];
                    let right = pixelGrid[x - 1][y];

                    cell.updateCellRGBA((up.red + down.red + left.red + right.red) / 4,
                        (up.green + down.green + left.green + right.green) / 4,
                        (up.blue + down.blue + left.blue + right.blue) / 4, 1);
                } else { //Special case for edge cells. Slower, but needed for correct effect
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

                    redAverage = redAverage / neighbors * 4;
                    greenAverage = greenAverage / neighbors * 4;
                    blueAverage = blueAverage / neighbors * 4;

                    cell.updateCellRGBA(redAverage / 4, greenAverage / 4, blueAverage / 4, 1);
                }
            }



        }
    }
};
