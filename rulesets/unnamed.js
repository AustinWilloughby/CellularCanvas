const NUM_COLORS = 4;

let colors = [];

// Used to setup the base state of information for the ruleset. May do nothing.
const rulesetSetup = (pixelGrid, xSize, ySize) => {
  let starterHue = Math.random() * 360;
  for (var i = 0; i < NUM_COLORS; i++) {
    if (i === 0) {
      let startingHue = randInt(0, 360);
      colors[i] = randHSLColor(startingHue, startingHue, 26, 26, 5, 5); // -- Fixed Background Color
    } else {
      colors[i] = getHSLComplement(colors[0].h, NUM_COLORS, i, 50, 70, 50, 50);
    }
  }

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      starterHue = colors[0];
      pixelGrid[x][y].updateCellHSLA(starterHue.h + randInt(0, 10), starterHue.s, starterHue.l + randInt(0, 3), 1);
    }
  }
};

// Used to setup the base state of information for the ruleset. May do nothing.
const ruleset = (pixelGrid, xSize, ySize) => {
  let date = Date.now();
  let cell;

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      cell = pixelGrid[x][y];

      if (cell.living) {

      }
    }
  }
};
