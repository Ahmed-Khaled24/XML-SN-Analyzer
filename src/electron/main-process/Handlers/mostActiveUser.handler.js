const getMostConnected = require('../../../features/maxConnectionsAnalysis');

function getMostActiveUser(event, ALGraph) {
	const mostConnectedUser = getMostConnected(ALGraph);
	event.sender.send('mostActiveUserResponse', mostConnectedUser);
}

module.exports = getMostActiveUser;