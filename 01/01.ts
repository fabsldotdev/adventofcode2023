import { readFileSync } from 'fs';

const file = readFileSync('01/input.txt', 'utf-8');
const lines = file.split(/\r?\n/);

// PART 1
const regex: RegExp = /\d/g;

let part1Sum = 0;
lines.forEach(line => {
    const numbers = line.match(regex);
    if (numbers){
        part1Sum += Number(numbers[0]+numbers[numbers.length -1]);
    }
});

console.log("part1Sum: ", part1Sum);

// PART 2
let part2Sum = 0;
lines.forEach(line => {
    line = line.replace(/one/g, "o1e");
    line = line.replace(/two/g,"t2o");
    line = line.replace(/three/g,"t3e");
    line = line.replace(/four/g,"f4r");
    line = line.replace(/five/g,"f5e");
    line = line.replace(/six/g,"s6x");
    line = line.replace(/seven/g,"s7n");
    line = line.replace(/eight/g,"e8t");
    line = line.replace(/nine/g,"n9e");

    const numbers = line.match(regex);
    if (numbers){
        part2Sum += Number(numbers[0]+numbers[numbers.length -1]);
    }

});

console.log("part2Sum: ", part2Sum);