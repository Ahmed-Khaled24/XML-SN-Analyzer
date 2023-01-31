
module.exports = function getMostConnected(adjList){
    let mostConnected= 0;
    let maxConnections = -1;

    Object.keys(adjList.inList).forEach(key =>{
        let entry = adjList.outList[key].length;
        if(entry > maxConnections) {
            maxConnections= entry;
            mostConnected = key;
        }
    })

    return mostConnected;
}