
const getMostInfluencer = require('../../../../features/graph-analyzer/mostInfluencer');

module.exports = function mostInfluencerHandler (event, ALGraph){
    let mostInfluencer = getMostInfluencer(ALGraph);
	event.sender.send('mostInfluencerRes', mostInfluencer);
}