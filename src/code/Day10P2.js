// https://adventofcode.com/2022/day/10

// Import input
const fullInput = require('../input/InputD10');

// Example input
const exampleInput = `
noop
addx 3
addx -5
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

//? operations:
// addx - takes 2 cycles to complete, adds to x
// addx, num
// noop - takes 1 cycle to complete, does nothing

//? needs:
// need to keep track of cycle number and X value

//? X is now the MIDDLE of a 3px wide sprite

//? CRT is 40 wide and 6 high
// drawn left-right, top-bottom
// ONE pixel will be drawn EVERY cycle

//* What 8 letters render on the CRT?

// init total, the sum of interesting cycle signal strengths
let cycle = 1;
let x = 1;
const crt = Array.from(Array(6), () => new Array(40).fill('.'));

// loop through commands
for (const cmd of records) {
  // get addX value OR noop
  const addAmt = Number(cmd.split(' ')[1]) || undefined;

  // loop through potential stages of command
  for (const round of [1, 2]) {
    // draw pixel
    if (cycle % 40 >= x - 1 && cycle % 40 <= x + 1) {
      crt[Math.floor(cycle / 40)][cycle % 40] = '#';
    }
    // inc cycle
    cycle++;
    // end if this was a noop
    if (addAmt === undefined) break;
    // else add
    if (round === 2) x += addAmt;
  }
}
cycle--;

// if things are still in queue

console.log('============================== RESULT');
for (line of crt) {
  console.log(line.join(''));
}

// check if there's an op to perform, perform if so
// we'll need to be queueing ops, probably with time till op execution. queue of objs?
// I also like the idea of having a var called "execute" that will be marked true at the end of an iteration in the case the current iteration is an "addx"... That way next iteration if execute is true we can look at i-1's command and execute it
// because right now, at least, it's a fixed 2 cycles of waiting time

// if current cycle is last ind of checks, pop it off and add add (cur X * cycle) to total
