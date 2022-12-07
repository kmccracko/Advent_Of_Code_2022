// https://adventofcode.com/2022/day/4

// Import input
const fullInput = require('../input/InputD4');

// Example input
const exampleInput = `
3-4,5-7
3-5,5-7
3-6,5-7
3-7,5-7
3-8,5-7
3-8,5-7
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

let counter = 0;
for (const record of records) {
  // split into pairs, and split the pairs
  // we know where each start and end is, so we just use indexes
  const ranges = record.split(/[-,]+/).map((el) => Number(el));

  // if ranges share a start OR end, it's guaranteed that one inclues the other
  if (ranges[0] === ranges[2] || ranges[1] === ranges[3]) {
    counter++;
    continue;
  }
  // if no start or end is shared, one can still be completely within the other
  // so if startA is within startB, endA MUST be within endB -- (TRUE vs TRUE)
  // OR, if B is within A, then we have (FALSE vs FALSE)
  // so we can compare the start comparison to the end comparison to
  // be sure that they're BOTH indicating either inside or outside
  if (ranges[0] > ranges[2] === ranges[1] < ranges[3]) {
    counter++;
    continue;
  }
}
console.log(counter);
