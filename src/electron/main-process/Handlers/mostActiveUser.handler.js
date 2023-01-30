const CreateGraphAdjList = require("../../../features/json-to-graph");
const convertToJSON = require('../../../features/xml-to-json')
const prettify = require('../../../features/prettify')
const getMostConnected = require('../../../features/maxConnectionsAnalysis')


function getMostActiveUser(event,data){
    const prettifiedData =  prettify(data);
    const json = convertToJSON(prettifiedData , {compact: true , spacing : 3})
    const graphAdjList = CreateGraphAdjList(json);
    const mostConnectedUser = getMostConnected(graphAdjList);

    event.sender.send('mostActiveUserResponse',mostConnectedUser);
}

module.exports = getMostActiveUser;