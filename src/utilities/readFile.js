/*
    This utility function is used across the whole project,
    readFile() takes the absolute path to the file and returns 
    array of strings representing the lines of the provided file.
*/

const { open } = require("node:fs/promises");

async function readFile(absolutePath) {
    const lines = []
	const file = await open(absolutePath);
	for await (const line of file.readLines()) {
		lines.push(line);
	}
    return lines;
}

module.exports = readFile;