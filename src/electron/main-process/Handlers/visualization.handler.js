const CreateGraphAdjList = require("../../../features/json-to-graph");
const convertToJSON = require('../../../features/xml-to-json')
const formatGraph = require('../../../features/visualizationFormatter')
const prettify = require('../../../features/prettify')


function visualizationHandler(event , data){
  const prettifiedData =  prettify(data);
  const json = convertToJSON(prettifiedData , {compact: true , spacing : 3})
  const graphAdjList = CreateGraphAdjList(json);
  const graphData = formatGraph(graphAdjList.outList)

  event.sender.send('visualizeReponse',JSON.stringify(graphData));

}

module.exports = visualizationHandler;