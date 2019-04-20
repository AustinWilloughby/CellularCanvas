// Generates a random number between min and max
const randNum = (min, max) => {
    return Math.random() * (max - min) + min;
}

const randInt = (min, max) => {
    return Math.round(randNum(min, max));
}

// Calculate a random HSL color
const randHSLColor = (minH, maxH, minS, maxS, minL, maxL) => {
    return {
        h: minH + (Math.random() * (maxH - minH)),
        s: minS + (Math.random() * (maxS - minS)),
        l: minL + (Math.random() * (maxL - minL))
    };
}


// Calculate a complimentary color based on imput parameters
const getHSLComplement = (baseHue, numSegments, segmentNum, minS, maxS, minL, maxL) => {
    return {
        h: ((baseHue + ((360 / numSegments) * segmentNum)) % 360),
        s: minS + (Math.random() * (maxS - minS)),
        l: minL + (Math.random() * (maxL - minL))
    }
}

const hslaStringified = (h, s, l, a) => {
  return `hsl(${h}, ${s}%, ${l}%, ${a})`;  
};