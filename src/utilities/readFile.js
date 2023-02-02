/*
    This utility function is used across the whole project,
    readFile() takes the absolute path to the file and returns 
    array of strings representing the lines of the provided file.
*/

const fs = require("fs");

function readFile(absolutePath) {
	const fileString = fs.readFileSync(absolutePath, 'utf8');
    const lines = fileString.split('\n');
    return lines;
}

module.exports = {readFile};