const formatGraph = require('../../../../features/visualizationFormatter');

function visualizationHandler(event, outList) {
	const graphData = formatGraph(outList);
	event.sender.send('visualizeRes', JSON.stringify(graphData));
}

module.exports = visualizationHandler;