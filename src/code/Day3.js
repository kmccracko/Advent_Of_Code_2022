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
for (const rucksack of allRucksacks) {
  // take first half, put into a set
  const firstCompartment = new Set(rucksack.slice(0, rucksack.length / 2));
  const secondCompartment = rucksack.slice(rucksack.length / 2);
  // loop through second half, ask set if it contains the item
  for (const item of secondCompartment) {
    // if contains, calculate priority and add to totalPriority
    if (firstCompartment.has(item)) {
      totalPriority += key.indexOf(item);
      break;
    }
  }
}
console.log(totalPriority);
