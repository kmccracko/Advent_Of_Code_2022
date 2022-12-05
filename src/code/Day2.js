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
  X: 'A',
  Y: 'B',
  Z: 'C',
};
const points = {
  X: 1,
  Y: 2,
  Z: 3,
};

const getOutcome = (them, me) => {
  let winLoseDraw = 0;
  if (them === trans[me]) winLoseDraw = 3;
  else if (them === 'A') winLoseDraw = trans[me] === 'B' ? 6 : 0;
  else if (them === 'B') winLoseDraw = trans[me] === 'C' ? 6 : 0;
  else if (them === 'C') winLoseDraw = trans[me] === 'A' ? 6 : 0;
  return winLoseDraw + points[me];
};

let totalScore = 0;
for (let pair of records) {
  totalScore += getOutcome(pair[0], pair[2]);
}
console.log(totalScore);
