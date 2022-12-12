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

const directions = [
  [0, 1],
  [1, 0],
  [0, -1],
  [-1, 0],
];

let maxScenicScore = 0;

for (let row = 0; row < grid.length; row++) {
  for (let col = 0; col < grid.length; col++) {
    const treeHouseHeight = grid[row][col];
    let scenicScore = 1;

    for (lookDir of directions) {
      let [lookR, lookC] = lookDir;
      let [newR, newC] = [row + lookR, col + lookC];
      let visibleCount = 0;

      // check if dir hits out of bounds
      if (!grid[newR] || !grid[newR][newC]) {
        // exit with 0 because factor 0 makes product 0
        scenicScore = 0;
        break;
      }

      const lookAround = (location) => {
        let [tempR, tempC] = location;

        // exit if next value unreachable
        if (!grid[tempR] || !grid[tempR][tempC]) return;

        // increment count
        const curTree = grid[tempR][tempC];
        ++visibleCount;

        // exit cases: break
        if (curTree >= treeHouseHeight) return;
        lookAround([tempR + lookR, tempC + lookC]);
      };

      lookAround([newR, newC]);

      if (visibleCount === 0) {
        scenicScore = 0;
        break;
      } // we know product would be 0
      scenicScore *= visibleCount;
    }
    maxScenicScore = Math.max(maxScenicScore, scenicScore);
  }
}
console.log(maxScenicScore);
