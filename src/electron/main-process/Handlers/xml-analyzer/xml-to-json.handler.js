const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json');
const prettify = require('../../../../features/xml-analyzer/prettify');
const validateXML = require('../../../../features/xml-analyzer/validation');
const { dialog } = require('electron');

function xmlToJSONHandler(event, data, type) {
	const { valid } = validateXML(data.split('\n'), false);
	if (!valid) {
		dialog.showErrorBox(
			'Invalid operation',
			'Invalid XML data \nuse correct button then try again'
		);
		return;
	}
	const prettifiedData = prettify(data);
	const json = convertToJSON(prettifiedData, {
		compact: type === 'compact',
		spacing: 3,
	});
	event.sender.send('xmlToJSONResponse', json);
}

module.exports = xmlToJSONHandler;
