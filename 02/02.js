"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var fs_1 = require("fs");
var maxCubes = {
    red: 12,
    green: 13,
    blue: 14
};
var file = (0, fs_1.readFileSync)('02/input.txt', 'utf-8');
var lines = file.split(/\r?\n/);
function isColor(input) {
    return input === "blue" || input === "red" || input === "green";
}
var prepareInput = function (line) {
    var _a;
    var index = line.split(":")[0];
    var cubes = line.split(":")[1].split(";").map(function (draw) {
        var entries = draw.trim().split(',').map(function (item) { return item.trim().split(' '); });
        var obj = {
            blue: 0,
            red: 0,
            green: 0
        };
        entries.forEach(function (entry) {
            if (isColor(entry[1])) {
                obj[entry[1]] = +entry[0];
            }
        });
        return obj;
    });
    return _a = {}, _a[index] = cubes, _a;
};
var isGameValid = function (game) {
    var gameStates = Object.values(game)[0].every(function (draw) {
        if (draw.blue > maxCubes.blue || draw.red > maxCubes.red || draw.green > maxCubes.green) {
            return false;
        }
        return true;
    });
    return gameStates;
};
var getMaxCubesPossiblePerGame = function (game) {
    var red = 0;
    var blue = 0;
    var green = 0;
    Object.values(game)[0].forEach(function (draw) {
        if (draw.red > red)
            red = draw.red;
        if (draw.blue > blue)
            blue = draw.blue;
        if (draw.green > green)
            green = draw.green;
    });
    return red * blue * green;
};
var sum = 0;
var power = 0;
lines.forEach(function (line) {
    var data = prepareInput(line);
    if (isGameValid(data)) {
        sum += +Object.keys(data)[0].match(/\d+/g)[0];
    }
    power += getMaxCubesPossiblePerGame(data);
});
console.log("sum: ", sum);
console.log("power: ", power);
