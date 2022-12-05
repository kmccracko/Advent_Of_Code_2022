// https://adventofcode.com/2022/day/2

// Import input
const fullInput = require('../input/InputD2');

// Example input
const exampleInput = `
A Y
B X
C Z
`;

// Input Toggle
const input = fullInput;

//
//
//
//       Begin!
//
//
//

let records = input.trim().split('\n');

const trans = {
  A: 1,
  B: 2,
  C: 3,
};
const points = {
  X: 0,
  Y: 3,
  Z: 6,
};

const getOutcome = (theirChoice, outcome) => {
  let myChoice = '';
  if (outcome === 'Y') myChoice = theirChoice;
  else if (theirChoice === 'A') myChoice = outcome === 'Z' ? 'B' : 'C';
  else if (theirChoice === 'B') myChoice = outcome === 'Z' ? 'C' : 'A';
  else if (theirChoice === 'C') myChoice = outcome === 'Z' ? 'A' : 'B';
  return trans[myChoice] + points[outcome];
};

let totalScore = 0;
for (let pair of records) {
  totalScore += getOutcome(pair[0], pair[2]);
}
console.log(totalScore);
