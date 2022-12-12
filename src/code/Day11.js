// https://adventofcode.com/2022/day/11

// Import input
const fullInput = require('../input/InputD11');

// Example input
const exampleInput = `
Monkey 0:
  Starting items: 79, 98
  Operation: new = old * 19
  Test: divisible by 23
    If true: throw to monkey 2
    If false: throw to monkey 3

Monkey 1:
  Starting items: 54, 65, 75, 74
  Operation: new = old + 6
  Test: divisible by 19
    If true: throw to monkey 2
    If false: throw to monkey 0

Monkey 2:
  Starting items: 79, 60, 97
  Operation: new = old * old
  Test: divisible by 13
    If true: throw to monkey 1
    If false: throw to monkey 3

Monkey 3:
  Starting items: 74
  Operation: new = old + 3
  Test: divisible by 17
    If true: throw to monkey 0
    If false: throw to monkey 1
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

let records = input.trim().split('\n\n');

const monkeys = [];

class Monkey {
  constructor(monkeyStr) {
    const lines = monkeyStr.split('\n');

    this.id = Number(lines[0].slice(0, lines[0].length - 1).split(' ')[1]);

    this.items = lines[1]
      .split(': ')[1]
      .split(', ')
      .map((el) => Number(el));

    this.operation = new Function('old', 'return ' + lines[2].split(' = ')[1]);

    const testNum = Number(lines[3].split('divisible by ')[1]);
    const caseT = Number(lines[4].split(' monkey ')[1]);
    const caseF = Number(lines[5].split(' monkey ')[1]);

    this.testFunc = (worry) => {
      let throwToMonkey;
      if (worry % testNum === 0) throwToMonkey = caseT;
      else throwToMonkey = caseF;

      monkeys[throwToMonkey].items.push(this.items.shift());
    };

    monkeys.push(this);
  }
  inspections = 0;
}

// create monkeys using input
for (let el of records) {
  new Monkey(el);
}

// all monkeys will go one at a time and inspect/throw all items
for (let round = 0; round < 20; round++) {
  for (let monkey of monkeys) {
    monkey.inspections += monkey.items.length;
    while (monkey.items.length) {
      monkey.items[0] = monkey.operation(monkey.items[0]);
      monkey.items[0] = Math.floor(monkey.items[0] / 3);
      monkey.testFunc(monkey.items[0]);
    }
  }
}

// console.log(monkeys);
console.log(
  monkeys
    .map((monkey) => monkey.inspections)
    .sort((a, b) => b - a)
    .slice(0, 2)
    .reduce((prod, factor) => prod * factor, 1)
);
