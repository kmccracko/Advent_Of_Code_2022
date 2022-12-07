// https://adventofcode.com/2022/day/6

// Import input
const fullInput = require('../input/InputD6');

// Example input
const exampleInput = `
zcfzfwzzqfrljwzlrfnpqdbhtmscgvjw
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

let records = input.trim();

for (let i = 0; i < records.length; i++) {
  if (new Set(records.slice(i, i + 14)).size === 14) {
    console.log(i + 14);
    return;
  }
}
