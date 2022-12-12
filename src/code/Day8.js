// https://adventofcode.com/2022/day/8

// Import input
const fullInput = require('../input/InputD8');

// Example input
const exampleInput = `
30373
25512
65332
33549
35390
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
let grid = records.map((el) => el.split(''));

// look from outside-in
// stop if you hit a 9
// otherwise, mark things as visible by adding cord string to a set

const directions = [
  [
    [0, 1],
    [1, 0],
  ],
  [
    [1, 0],
    [0, -1],
  ],
  [
    [0, -1],
    [-1, 0],
  ],
  [
    [-1, 0],
    [0, 1],
  ],
];

let r = 0;
let c = 0;
const discovered = new Set();

for (let change of directions) {
  const [moveDir, lookDir] = change;
  let [moveR, moveC] = moveDir;

  // skip corner
  r += moveR;
  c += moveC;

  while (grid[r + moveR] && grid[r + moveR][c + moveC]) {
    // look inside func
    const lookTraverse = (r, c, lookDir, maxVal = -1) => {
      let [lookR, lookC] = lookDir;

      // if we reach the end of a line, return out before counting it
      if (lookR !== 0 && maxVal !== -1 && (r === 0 || r === grid[0].length))
        return;
      if (lookC !== 0 && maxVal !== -1 && (c === 0 || c === grid.length))
        return;

      const curValue = Number(grid[r][c]);
      // if larger than pervious, add
      if (curValue > maxVal) {
        discovered.add(`${r},${c}`);
      }

      // if 9, return
      if (curValue === 9) return;

      // look deeper in look direction
      const newR = r + lookR;
      const newC = c + lookC;

      // recurse
      lookTraverse(newR, newC, lookDir, Math.max(curValue, maxVal));
    };

    // traverse
    lookTraverse(r, c, lookDir);

    // move in move direction
    r += moveR;
    c += moveC;
  }
}
// add corners now
console.log(discovered.size + 4);
