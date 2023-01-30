
const getMostInfluencer = require('../../../../features/graph-analyzer/mostInfluencer');

function mostInfluencerHandler (event, ALGraph){
    let mostInfluencer = getMostInfluencer(ALGraph);
	event.sender.send('mostInfluencerRes', mostInfluencer);
}

module.exports = mostInfluencerHandler;