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

// Input Toggle
const input = exampleInput;

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

// STRATEGY:
// Any time tail moves, it replaces where head just was
// So we really only need to track where head is
// Any time it makes a move that should move tail, we add head's CURRENT pos to set
// So final question is how to cleanly determine if head should move
// SOLUTION:
// always track distance between Tail and Head, using Xdistance and Ydistance
// don't worry about cords for this, we'll just update this easily every time head moves

// Summary
// track where head is
// track how far away tail is
// when head would move too far from tail, record its location into set
// update head, then put tail where head just was

// end of instructions, return out set

const dirs = {
  U: [-1, 0],
  D: [1, 0],
  L: [0, -1],
  R: [0, 1],
};

let headPos = [0, 0];
let dist = [0, 0];
const visited = new Set(['0.0']);

for (let move of records) {
  let [dir, count] = move.split(' ');
  dir = dirs[dir];
  count = Number(count);

  for (let i = 0; i < count; i++) {
    // simulate move by increasing distance
    dist[0] += dir[0];
    dist[1] += dir[1];

    // if either new dist is 2, too far. tail needs to move
    // if tail moves, we reset dist to be what it will be after head moves
    if (dist.indexOf(2) >= 0 || dist.indexOf(-2) >= 0) {
      visited.add(`${headPos.join('.')}`);
      dist = [...dir];
    }

    // move head
    headPos[0] += dir[0];
    headPos[1] += dir[1];
  }
}

console.log(visited);
