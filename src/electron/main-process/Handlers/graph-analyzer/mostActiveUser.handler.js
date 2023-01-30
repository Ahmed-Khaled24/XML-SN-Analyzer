const getMostConnected = require('../../../../features/graph-analyzer/maxConnectionsAnalysis');

function getMostActiveUser(event, ALGraph) {
	const mostConnectedUser = getMostConnected(ALGraph);
	event.sender.send('mostActiveUserResponse', mostConnectedUser);
}

module.exports = getMostActiveUser;