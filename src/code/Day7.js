// https://adventofcode.com/2022/day/7

// Import input
const fullInput = require('../input/InputD7');

// Example input
const exampleInput = `
$ cd /
$ ls
dir a
14848514 b.txt
8504156 c.dat
dir d
$ cd a
$ ls
dir e
29116 f
2557 g
62596 h.lst
$ cd e
$ ls
584 i
$ cd ..
$ cd ..
$ cd d
$ ls
4060174 j
8033020 d.log
5626152 d.ext
7214296 k
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

class treeNode {
  constructor(folderName) {
    this.folderName = folderName; // node
  }
  folderSize = 0;
  // children = []; // node arr
}
const treeTop = new treeNode('/');

// allNodes will be filled with all unique nodes
// every time we encounter a dir, we'll add it here
const allNodes = { '/': treeTop };

// breadcrumbs will be filled with nodes
// every time we encounter a file, we'll loop through breadcrumbs and increase each node's size
const breadCrumbs = [treeTop];
const breadCrumbsStrings = ['/'];

// loop through directions
let currentNode = treeTop;
for (let cmd of records) {
  // if user-executed command
  if (cmd[0] === '$') {
    // cd .. : current = breadcrumbs.pop
    if (cmd === '$ cd ..') {
      breadCrumbsStrings.pop();
      currentNode = breadCrumbs.pop();
    }
    // cd / : we can ignore
    else if (cmd === '$ cd /') {
    }
    // ignore ls
    else if (cmd === '$ ls') {
    }
    // cd x : push current to breadcrumbs, make x current
    else {
      const dirName = cmd.slice(5);
      breadCrumbs.push(currentNode);
      breadCrumbsStrings.push(dirName);
      currentNode = allNodes[breadCrumbsStrings.join('🔥')];
    }
  }
  // if result of ls
  else {
    // dir x : add node to allNodes
    if (cmd.slice(0, 4) === 'dir ') {
      const dirName = cmd.slice(4);
      const newDir = new treeNode(dirName);

      if (allNodes[breadCrumbsStrings.join('🔥') + '🔥' + dirName])
        console.log('TRUE :(');

      // BAD: if we see the EXACT same dir more than once, we can overwrite its size

      // ls -> create dir
      // cd dir
      // ls -> get inner filenames, add to dir size
      // cd ..
      // ls -> REcreate dir, dir size wrongly 0

      // BAD2: if we see a dir with a name we've already recorded, we can overwrite the existing one which exists in a different, already discovered location

      // dir A
      //   dir b
      //   file 10
      // dir c
      //   dir A

      allNodes[breadCrumbsStrings.join('🔥') + '🔥' + dirName] = newDir;
      // currentNode.children.push(newDir);
    }
    // 12345... : add size to current, add to everything in breadcrumbs
    else {
      const fileSize = Number(cmd.split(' ')[0]);
      currentNode.folderSize += fileSize;
      breadCrumbs.forEach((node) => {
        node.folderSize += fileSize;
      });
    }
  }
}

// at the end of the input file, we can simply loop through all nodes
// OR we could do it each time we increment a file, but EH
// console.log(allNodes);
console.log(
  Object.values(allNodes).reduce((sum, node) => {
    return node.folderSize <= 100000 ? sum + node.folderSize : sum;
  }, 0)
);

// what could be wrong ? 🤔
