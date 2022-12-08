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
    this.folderSize = 0;
  }
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
      currentNode = breadCrumbs[breadCrumbs.length - 1];
      if (currentNode !== treeTop) currentNode = breadCrumbs.pop();
      breadCrumbsStrings.pop();
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
      if (currentNode !== treeTop) breadCrumbs.push(currentNode); // Past
      breadCrumbsStrings.push(dirName); // Present
      currentNode = allNodes[breadCrumbsStrings.join('🔥')]; // Past that's trying to be the present?
    }
  }
  // if result of ls
  else {
    // dir x : add node to allNodes
    if (cmd.slice(0, 4) === 'dir ') {
      const dirName = cmd.slice(4);
      const newDir = new treeNode(dirName);

      allNodes[breadCrumbsStrings.join('🔥') + '🔥' + dirName] = newDir;
    }
    // 12345... : add size to current, add to everything in breadcrumbs
    else {
      const fileSize = Number(cmd.split(' ')[0]);

      if (currentNode !== treeTop) {
        currentNode.folderSize += fileSize;
      }

      breadCrumbs.forEach((node) => {
        node.folderSize += fileSize;
      });
    }
  }
}

const systemSpace = 70000000;
const updateSpace = 30000000;
const usedSpace = allNodes['/'].folderSize;
const unusedSpace = systemSpace - usedSpace;
const spaceNeeded = updateSpace - unusedSpace;

let smallestFileSpace = Infinity;
for (let folder of Object.values(allNodes)) {
  if (folder.folderSize >= spaceNeeded)
    smallestFileSpace = Math.min(smallestFileSpace, folder.folderSize);
}
console.log(smallestFileSpace);
