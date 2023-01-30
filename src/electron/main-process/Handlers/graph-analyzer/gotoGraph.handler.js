const CreateGraphAdjList = require('../../../../features/graph-analyzer/json-to-graph');
const prettify = require('../../../../features/xml-analyzer/prettify');
const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json');

function gotoGraphHandler(data) {
	return CreateGraphAdjList(
		convertToJSON( prettify(data), { compact: true, spacing: 3 } )
	);
};

module.exports = gotoGraphHandler;
