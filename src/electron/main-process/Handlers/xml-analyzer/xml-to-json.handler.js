const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json');
const prettify = require('../../../../features/xml-analyzer/prettify');
const validateXML = require('../../../../features/xml-analyzer/validation');
const { errorWithLink } = require('../../../../utilities/showError');

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
	try {
		
		const prettifiedData = prettify(data);
		const json = convertToJSON(prettifiedData, {
			compact: type === 'compact',
			spacing: 3,
		});
		event.sender.send('xmlToJSONResponse', json);
	} catch (error) {
		errorWithLink(
			'Invalid data',
			`Invalid xml format
		fix the data then try again`,
			'https://github.com/Ahmed-Khaled24/XML-SN-Analyzer/tree/electron#remarks'  
		);
		event.sender.send('xmlToJSONResponse', null);
	}
}

module.exports = xmlToJSONHandler;
