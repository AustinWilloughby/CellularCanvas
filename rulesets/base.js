// Used to setup the base state of information for the ruleset. May do nothing.
(pixelGrid, xSize, ySize) => {
  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      //pixelGrid[x][y].updateCellRGBA(25 + Math.random() * 5, 34 + Math.random() * 5, 52 + Math.random() * 5, 1);
    }
  }

  const ruleset = (pixelGrid, xSize, ySize) => {
    let date = Date.now();
    let cell;

    for (let x = 0; x < xSize; x++) {
      for (let y = 0; y < ySize; y++) {
        cell = pixelGrid[x][y];
      }
    }
  };
