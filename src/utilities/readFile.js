/*
    This utility function is used across the whole project,
    readFile() takes the absolute path to the file and returns 
    array of strings representing the lines of the provided file.
*/

const fs = require("fs");
const NReadLines = require('n-readlines');

function readFile(absolutePath) {
	const fileString = fs.readFileSync(absolutePath, 'utf8');
    const lines = fileString.split('\n');
    return lines;
}

function readFileElectron(absolutePath){
    const lines = [];
    const lineReader = new NReadLines(absolutePath);
    let currentLine = null;
    while(currentLine = lineReader.next()){
        lines.push(currentLine.toString('utf-8').replace('\r', ''));
    }
    return lines;
}

module.exports = {readFile, readFileElectron};