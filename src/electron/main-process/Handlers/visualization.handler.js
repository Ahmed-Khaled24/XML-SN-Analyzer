// const graph = require("../../../features/json-to-graph");
const convertToJSON = require('../../../features/xml-to-json')

function visualizationHandler(event , data){
    // const json = convertToJSON(data , {compact: true , spacing : 3})
    // get graph using json
    let graph = {
        nodes: [
          { id: "n0", label: "A node", x: Math.floor(Math.random() * 1000) + 1,y:Math.floor(Math.random() * 1000) + 1 , size: 20 },
          { id: "n1", label: "Another node", x: Math.floor(Math.random() * 1000) + 1, y:Math.floor(Math.random() * 1000) + 1  ,size: 20 },
          { id: "n2", label: "And a last one", x: Math.floor(Math.random() * 1000) + 1, y:Math.floor(Math.random() * 1000) + 1 , size: 20 }
        ],
        edges: [
          { id: "e0", source: "n0", target: "n1", type:'arrow', size:10 },
          { id: "e1", source: "n1", target: "n2", type:'arrow', size:10},
          { id: "e2", source: "n2", target: "n0", type:'arrow', size:10}
        ]
      }
    event.sender.send('visualizeReponse',JSON.stringify(graph));

}

module.exports = visualizationHandler;