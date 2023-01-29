
function getInList(input, adjList){
    input.users.forEach(user => {
        let InList = [];
        user.followers.forEach(follower => {
            InList.push(follower.id);
        })
        adjList[user.id] = InList;
    });
    return adjList;
}

function getOutList(input , adjList){
    let outList = {}
    Object.keys(adjList).forEach(key =>{
        adjList[key].forEach(id =>{
            if(!Array.isArray(outList[id])){
                outList[id] = [];
            }
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