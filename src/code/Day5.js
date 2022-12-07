// https://adventofcode.com/2022/day/5

// Import input
const fullInput = require('../input/InputD5');

// Example input
const exampleInput = `
    [D]    
[N] [C]    
[Z] [M] [P]
 1   2   3 

move 1 from 2 to 1
move 3 from 1 to 3
move 2 from 2 to 1
move 1 from 1 to 2
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

let records = input.trimEnd().split(' 1   2   3   4   5   6   7   8   9 \n\n');
const crates = records[0].split('\n');
const instructions = records[1].trim().split('\n');

function parseCrates(crates) {
  const stacks = {};
  // crates are 3char long
  // between every crate is one space
  // if a crate is absent, it's still 3 spaces
  // we should check every 4 chars for a [
  for (level of crates) {
    // declare position and loop until pos not accessible
    let i = 0;
    let crateCol = 1;
    while (i < level.length) {
      // if we see a [, we've hit a crate
      if (level[i] === '[') {
        // add to crateCol key if it exists, else create it
        if (stacks[crateCol]) stacks[crateCol].unshift(level[i + 1]);
        else stacks[crateCol] = [level[i + 1]];
      }
      // increment pos and crateCol
      i += 4;
      crateCol++;
    }
  }
  return stacks;
}

const crateStacks = parseCrates(crates);

// loop through instructions, move crates one at a time from source to destination
for (let step of instructions) {
  const [amount, source, destination] = step
    .slice(5)
    .split(/move | from | to /);

  let count = 0;
  while (count++ < Number(amount)) {
    crateStacks[destination].push(crateStacks[source].pop());
  }
}

console.log(
  Object.values(crateStacks).reduce((str, el) => {
    return str + el[el.length - 1];
  }, '')
);
