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
5-7,3-4
5-7,3-5
5-7,3-6
5-7,3-7
5-7,3-8
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

  // if endA is before startB or startA is after endB
  if (ranges[1] < ranges[2] || ranges[0] > ranges[3]) continue;

  counter++;
}
console.log(counter);
