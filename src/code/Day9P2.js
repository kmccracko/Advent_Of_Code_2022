// https://adventofcode.com/2022/day/9

// Import input
const fullInput = require('../input/InputD9');

// Example input
const exampleInput = `
R 4
U 4
L 3
D 1
R 4
D 1
L 5
R 2
`;
const exampleInput2 = `
R 5
U 8
L 8
D 3
R 17
D 10
L 25
U 20
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

// ISSUE: no grid to traverse
// SOLUTION: simulate one using Y and X, just boundless and abstract
// We don't need to ever look at values in cells, so we don't need a grid
// We only need a count of unique spots the tail visited
// so we can use whatever arbitrary number system of a virtual grid
// and store those strings in a set

// ISSUE: need to track more nodes And tail, can't just use distance
// SOLUTION: use an arr to track nodes
// every time head moves, ripple down until one node doesn't have to move
// then break that loop and make next head move

// Summary
// track where all nodes are in an array
// ISSUE: need a system to determine dist from one node to next
// SOLUTION: compare current against node before it
// when 9 moves, record its new pos into a set

const dirs = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

const start = [0, 0];
const nodeArr = Array.from(Array(10), () => [start[0], start[1]]);
const visited = new Set([`${start[0]}.${start[1]}`]);

for (let move of records) {
  let [dir, amount] = move.split(' ');
  dir = dirs[dir];

  for (let i = 0; i < amount; i++) {
    // move the head
    nodeArr[0][0] += dir[0];
    nodeArr[0][1] += dir[1];

    // move the rest of the rope
    for (let j = 1; j < nodeArr.length; j++) {
      // is distance great enough?
      if (
        Math.max(nodeArr[j][0], nodeArr[j - 1][0]) -
          Math.min(nodeArr[j][0], nodeArr[j - 1][0]) >=
          2 ||
        Math.max(nodeArr[j][1], nodeArr[j - 1][1]) -
          Math.min(nodeArr[j][1], nodeArr[j - 1][1]) >=
          2
      ) {
        // MAGIC HAPPENS HERE
        // identify if we need to move L/R, and how much
        const directionX = nodeArr[j - 1][0] - nodeArr[j][0];
        nodeArr[j][0] +=
          Math.abs(directionX) === 2 ? directionX / 2 : directionX;

        // identify if we need to move U/D, and how much
        const directionY = nodeArr[j - 1][1] - nodeArr[j][1];
        nodeArr[j][1] +=
          Math.abs(directionY) === 2 ? directionY / 2 : directionY;
      }

      // if we don't move the current node, we won't move any after it, so we break
      else break;

      // if tail, add pos to set
      if (j === nodeArr.length - 1) {
        visited.add(nodeArr[j].join('.'));
      }
    }
    //? update Graphsy with new set each movement
    // await updateScreen({
    //   discovered: [resetKey, new Set(nodeArr.map((el) => el.join('.')))],
    // });
  }
}

console.log(visited.size);

//? code to generate grid for Graphsy, use start of 18, 12
//? don't forget to bring in exampleinput, input, and records vars
// const demo = Array.from(Array(30), () => new Array(30).fill(' '));
// JSON.stringify(demo)
