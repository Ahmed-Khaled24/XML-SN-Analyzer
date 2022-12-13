/*
    This utility function is used across the whole project,
    readFile() takes the absolute path to the file and returns 
    array of strings representing the lines of the provided file.
*/

const { open } = require("node:fs/promises");
const NReadLines = require('n-readlines');

async function readFile(absolutePath) {
    const lines = []
	const file = await open(absolutePath);
	for await (const line of file.readLines()) {
		lines.push(line);
	}
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