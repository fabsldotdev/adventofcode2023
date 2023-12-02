import { readFileSync } from 'fs';

type Colors = "blue" | "red" | "green";

// type GameInput = {
//     string: {Colors: number}[]
// }

// type GameInput = Record<[key: string],Record<Colors, number>>;
type GameInput = {
    [x: string]: Record<Colors, number>[];
  };

const maxCubes: Record<Colors, number> = {
    red: 12,
    green: 13,
    blue: 14
}

const file = readFileSync('02/input.txt', 'utf-8');
const lines = file.split(/\r?\n/);

function isColor(input: string): input is Colors {
    return (input as Colors) === "blue" || (input as Colors) === "red" || (input as Colors) === "green";
}


const prepareInput:(line: string) => GameInput = (line: string) => {
    const index = line.split(":")[0];

    const cubes = line.split(":")[1].split(";").map(draw=>{
        const entries = draw.trim().split(',').map((item) => item.trim().split(' '));
        let obj: Record<Colors, number> = {
            blue: 0,
            red: 0,
            green: 0
        };
     
        entries.forEach(entry => {
            if (isColor(entry[1])) {
                obj[entry[1]] = +entry[0];
            }
        })
        return obj
     })

     return {[index]: cubes}
}

const isGameValid:(game:GameInput)=>boolean = (game:GameInput) => {
    const gameStates = Object.values(game)[0].every(draw => {
        if(draw.blue > maxCubes.blue || draw.red > maxCubes.red || draw.green > maxCubes.green){
            return false
        }
        return true
    })
    return gameStates
}

const getMaxCubesPossiblePerGame:(game:GameInput) => number = (game:GameInput) => {
    let red=0;
    let blue=0;
    let green=0;
    Object.values(game)[0].forEach(draw => {
        if (draw.red > red) red = draw.red;
        if (draw.blue > blue) blue = draw.blue;
        if (draw.green > green) green = draw.green;
    })
    return red*blue*green
}

let sum=0;
let power=0;
lines.forEach(line => {
    const data = prepareInput(line);
    if(isGameValid(data)){
        sum += +Object.keys(data)[0].match(/\d+/g)![0]
    }
    power+=getMaxCubesPossiblePerGame(data);
})
console.log("sum: ",sum);
console.log("power: ",power);