const STAR_CHANCE = 0.0000002;
const MIN_STAR_LIFETIME = 5000;
const MAX_STAR_LIFETIME = 20000;

const MINIMUM_RED = 16;
const MINIMUM_GREEN = 25;
const MINIMUM_BLUE = 40;

let possibleNotes = ['C', 'D', 'E', 'F', 'G'];

let audioCtx = new AudioContext();
let synth;

let lastFrame = Date.now();
let audioStopped = true;

// Used to setup the base state of information for the ruleset. May do nothing.
const rulesetSetup = (pixelGrid, xSize, ySize) => {
  document.querySelector('#mainCanvas').addEventListener('click', function (evt) {
    if (audioStopped) {
      audioCtx.resume().then(() => {
        let freeverb = new Tone.Freeverb().toMaster();
        
        synth = new Tone.PolySynth(24, Tone.AMSynth, {
          envelope: {
            attack: 0.25,
            decay: 0.1,
            sustain: 0.3,
            release: 2.5,
          }
        }).connect(freeverb)
        audioStopped = false;
        console.log("Audio Resumed");
      });
    }
  });
  
  regularlyChangeScale();

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      pixelGrid[x][y].updateCellRGBAFast(MINIMUM_RED, MINIMUM_GREEN, MINIMUM_BLUE, 1);
    }
  }
};

const ruleset = (pixelGrid, xSize, ySize) => {
  let currentTime = Date.now();
  let frameTime = currentTime - lastFrame;
  let cell;

  for (let x = 0; x < xSize; x++) {
    for (let y = 0; y < ySize; y++) {
      cell = pixelGrid[x][y];

      if (Math.random() < STAR_CHANCE) {
        limitedRGBA(cell, randNum(150, 255), randNum(150, 255), randNum(150, 255), 1);
        let lifeTime = randNum(MIN_STAR_LIFETIME, MAX_STAR_LIFETIME);
        cell.timeOfDeath = currentTime + lifeTime;
        cell.living = true;

        if (!audioStopped) {
          synth.triggerAttackRelease(selectRandomNote(2,5), lifeTime / 1000);
        }
      } else if (cell.living && currentTime > cell.timeOfDeath) {
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
            (up.red + down.red + left.red + right.red) / 4.00001,
            (up.green + down.green + left.green + right.green) / 4.00001,
            (up.blue + down.blue + left.blue + right.blue) / 4.00001, 1);
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

          limitedRGBA(cell, redAverage, greenAverage, blueAverage, 1);
        }
      }
    }
  }
};

const limitedRGBA = (cell, r, g, b, a) => {
  if (r < MINIMUM_RED && g < MINIMUM_GREEN && b < MINIMUM_BLUE) {
    r = MINIMUM_RED;
    g = MINIMUM_GREEN;
    b = MINIMUM_BLUE;
  }

  if (cell.red < MINIMUM_RED && cell.green < MINIMUM_RED && cell.blue < MINIMUM_BLUE) {
    cell.updateCellRGBAFast(16, 25, 40, 1);
  } else {
    cell.updateCellRGBAFast(r, g, b, a);
  }
}

const mutatePossibleNotes = () => {
  let intPossibleNotes = [0, 0, 0, 0, 0];
  let letterPossibleNotes = ['A', 'B', 'C', 'D', 'E', 'F', 'G'];
  let totalIncreases = 0;

  for (let i = 0; i < intPossibleNotes.length; i++) {
    if (i === 0) {
      intPossibleNotes[i] = randInt(0, 6);
    } else if (totalIncreases < 4) {
      let increase = randInt(1, 2);
      totalIncreases += increase;
      intPossibleNotes[i] = (intPossibleNotes[i - 1] + increase) % 7;
    } else {
      intPossibleNotes[i] = (intPossibleNotes[i - 1] + 1) % 7;
    }
    possibleNotes[i] = letterPossibleNotes[intPossibleNotes[i]];
  }
}

const selectRandomNote = (lowOctave, highOctave) => {
  return `${possibleNotes[randInt(0, possibleNotes.length - 1)]}${randInt(lowOctave, highOctave)}`; 
}

const regularlyChangeScale = () => {
  mutatePossibleNotes();
  window.setTimeout (regularlyChangeScale, randInt(10000, 30000));
}

