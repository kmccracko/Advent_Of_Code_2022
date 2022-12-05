// https://adventofcode.com/2022/day/1

// Import input
const fullInput = require('../input/InputD1');

// Example input
const exampleInput = `
1000
2000
3000

4000

5000
6000

7000
8000
9000

10000`;

// Input Toggle
const input = fullInput;

//
//
//
//       Begin!
//
//
//

let records = input
  .split('\n')
  .map((el) => (el === '' ? undefined : Number(el)));

let mostCalories = 0;
let elfCalories = 0;
for (let el of records) {
  if (el) elfCalories += el;
  else {
    mostCalories = Math.max(mostCalories, elfCalories);
    elfCalories = 0;
  }
}
console.log(mostCalories);
