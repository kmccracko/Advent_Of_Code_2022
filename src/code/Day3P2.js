// https://adventofcode.com/2022/day/3

// Import input
const fullInput = require('../input/InputD3');

// Example input
const exampleInput = `
vJrwpWtwJgWrhcsFMMfFFhFp
jqHRNqRjqzjGDLGLrsFMfFZSrLrFZsSL
PmmdzqPrVvPwwTWBwg
wMqvLMZHhHMvwLHjbvcjnnSBnvTQFn
ttgJtRGJQctTZtZT
CrZsJsPPZsGzwwsLwLmpwMDw
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

let allRucksacks = input.trim().split('\n');
const key = ' abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ';
let totalPriority = 0;

for (let i = 0; i < allRucksacks.length; i++) {
  // if we've seen 3
  if ((i + 1) % 3 === 0) {
    const first = new Set(allRucksacks[i - 2]);
    const second = allRucksacks[i - 1];
    const third = allRucksacks[i];
    const firstAndSecond = new Set();

    // compare 1 v 2, then 2 v 3
    for (let item of second) {
      if (first.has(item)) {
        firstAndSecond.add(item);
      }
    }
    for (let item of third) {
      if (firstAndSecond.has(item)) {
        totalPriority += key.indexOf(item);
        break;
      }
    }
  }
}
console.log(totalPriority);
