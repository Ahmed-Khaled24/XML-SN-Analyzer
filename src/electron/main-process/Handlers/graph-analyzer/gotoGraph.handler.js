const CreateGraphAdjList = require('../../../../features/graph-analyzer/json-to-graph');
const prettify = require('../../../../features/xml-analyzer/prettify');
const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json');
const { errorWithLink } = require('../../../../utilities/showError');

function gotoGraphHandler(data) {
	try {
		let json = convertToJSON(prettify(data), { compact: true, spacing: 3 });
		let ALGraph = CreateGraphAdjList(json);
		return { json, ALGraph };
	} catch (err) {
		errorWithLink(
			'Invalid data',
			`Invalid Social Network Data
		fix the data then try again`,
			'https://github.com/Ahmed-Khaled24/XML-SN-Analyzer/tree/electron#remarks'  
		);
		return {json: null, ALGraph: null};
	}
}

module.exports = gotoGraphHandler;
