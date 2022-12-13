const { dialog } = require("electron");
const validateXML = require("../../../features/validation");

async function correctHandler(event, data) {
	data = data.split("\n");
	const { lines } = validateXML(data, true);
	event.sender.send("correctResponse", lines);
}

module.exports = correctHandler;
