const CreateGraphAdjList = require('../../../../features/graph-analyzer/json-to-graph');
const prettify = require('../../../../features/xml-analyzer/prettify');
const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json');

function gotoGraphHandler(data) {
	let json = convertToJSON( prettify(data), { compact: true, spacing: 3 } );
	let ALGraph = CreateGraphAdjList(json);

	return{json , ALGraph}
};

module.exports = gotoGraphHandler;
