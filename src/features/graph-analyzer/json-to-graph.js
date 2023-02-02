
function getInList(input, adjList){
    input.users.forEach(user => {
        let InList = [];
        if(user.followers !== undefined){
            user.followers.forEach(follower => {
                InList.push(follower.id);
            })
        }
        adjList[user.id] = InList;
    });
    return adjList;
}

function getOutList(input , adjList){
    let outList = {}
    // Fill outlist Keys
    Object.keys(adjList).forEach(key => {
        outList[key] = []
    });
    // fill outlist values
    Object.keys(adjList).forEach(key =>{
        adjList[key].forEach(id =>{
            outList[id].push(key);
        })
    })
    return outList;

}


module.exports = function CreateGraphAdjList(json){
    let input = JSON.parse(json);
    let inList ={};
    inList = getInList(input,inList);
    let outList = getOutList(input , inList);



    return {inList,outList};

}