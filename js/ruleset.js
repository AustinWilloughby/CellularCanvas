const ruleset = (pixelGrid, xSize, ySize) => {
    for (let x = 0; x < xSize; x++) {
        for (let y = 0; y < ySize; y++) {
            let cell = pixelGrid[x][y];
            if (x + 1 === xSize || y + 1 === ySize) {
                cell.updateCell(cell.red + (Math.random() * 40 - 20), cell.green + (Math.random() * 40 - 20), cell.blue + (Math.random() * 40 - 20), Math.random());
            } else {
                let rightCell = pixelGrid[x + 1][y+1];
                cell.updateCell(rightCell.red, rightCell.green, rightCell.blue, 1);

            }
        }
    }
};
