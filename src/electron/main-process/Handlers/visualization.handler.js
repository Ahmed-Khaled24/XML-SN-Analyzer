const CreateGraphAdjList = require("../../../features/json-to-graph");
const convertToJSON = require('../../../features/xml-to-json')
const formatGraph = require('../../../features/visualizationFormatter')
const prettify = require('../../../features/prettify')


function visualizationHandler(event , data){
  const prettifiedData =  prettify(data);
  const json = convertToJSON(prettifiedData , {compact: true , spacing : 3})
  const graphAdjList = CreateGraphAdjList(json);
  const graphData = formatGraph(graphAdjList.outList)

    // let graph = {
    //     nodes: [
    //       { id: "n0", label: "A node", x: Math.floor(Math.random() * 1000) + 1,y:Math.floor(Math.random() * 1000) + 1 , size: 20 },
    //       { id: "n1", label: "Another node", x: Math.floor(Math.random() * 1000) + 1, y:Math.floor(Math.random() * 1000) + 1  ,size: 20 },
    //       { id: "n2", label: "And a last one", x: Math.floor(Math.random() * 1000) + 1, y:Math.floor(Math.random() * 1000) + 1 , size: 20 }
    //     ],
    //     edges: [
    //       { id: "e0", source: "n0", target: "n1", type:'arrow', size:10 },
    //       { id: "e1", source: "n1", target: "n2", type:'arrow', size:10},
    //       { id: "e2", source: "n2", target: "n0", type:'arrow', size:10}
    //     ]
    //   }
  event.sender.send('visualizeReponse',JSON.stringify(graphData));

}

module.exports = visualizationHandler;