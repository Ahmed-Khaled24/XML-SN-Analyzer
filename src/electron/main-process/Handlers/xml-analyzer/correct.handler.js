const { dialog } = require("electron");
const validateXML = require("../../../../features/validation");
const prettify = require('../../../../features/prettify')


async function correctHandler(event, data) {
    let prettifiedData = prettify(data);
	const { lines } = validateXML(prettifiedData, true);
	event.sender.send("correctResponse", lines);
}

module.exports = correctHandler;
