module.exports = function getNode( root ,uniqueID){
    if(root.id === uniqueID){
        return root;
    }

    let res = -1
    for(let i= 0 ; res===-1 && i < root.descendants.length ; i++){
         res =getNode(root.descendants[i],uniqueID)
    }
    return res;
}