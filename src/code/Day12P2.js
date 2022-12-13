// https://adventofcode.com/2022/day/12

// Import input
const fullInput = require('../input/InputD12');

// Example input
const exampleInput = `
Sabqponm
abcryxxl
accszExk
acctuvwj
abdefghi
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

let grid = input
  .trim()
  .split('\n')
  .map((line) => line.split(''));

//* find shortest path - BFS traversal

// init queue for BFS
let queue = [];
// init visited
const visited = new Set();

// add start to queue and visited
for (let i = 0; i < grid.length; i++) {
  for (let j = 0; j < grid[i].length; j++) {
    if (grid[i][j] === 'E') {
      queue.push({ coord: [i, j], level: 0 });
      visited.add(`${i}.${j}`);
      break;
    }
  }
}

const hillKey = 'abcdefghijklmnopqrstuvwxyz'.split('').reduce((obj, el, i) => {
  obj[el] = i;
  return obj;
}, {});
hillKey.S = 0;
hillKey.E = 25;

const canTraverse = (curVal, destVal) => {
  return hillKey[curVal] - 1 <= hillKey[destVal];
};

// loop through queue
while (queue.length) {
  const curNode = queue.pop();
  const curRow = curNode.coord[0];
  const curCol = curNode.coord[1];

  // loop through U,D,L,R
  for (let dir of [
    [-1, 0],
    [1, 0],
    [0, -1],
    [0, 1],
  ]) {
    // get potential coordinates
    const destRow = curRow + dir[0];
    const destCol = curCol + dir[1];

    // if it exists, and it isn't visited,
    if (
      grid[destRow] &&
      grid[destRow][destCol] &&
      !visited.has(`${destRow}.${destCol}`)
    ) {
      if (canTraverse(grid[curRow][curCol], grid[destRow][destCol])) {
        if (['a', 'S'].includes(grid[destRow][destCol])) {
          queue = [];
          console.log('found START');
          console.log('============== FINISHED');
          console.log(curNode.level + 1);
          break;
        }
        // mark visited
        visited.add(`${destRow}.${destCol}`);
        // enqueue if we can go there
        queue.unshift({
          coord: [destRow, destCol],
          level: curNode.level + 1,
        });
      }
    }
  }
}

// code for graphsy grid
// let griddy = input
//   .trim()
//   .split('\n')
//   .map((line) => line.split(''));
// JSON.stringify(griddy);

// add after after canTraverse check
// await updateScreen({
//   discovered: `${curRow}.${curCol}`,
//   visited: `${destRow}.${destCol}`,
// });
