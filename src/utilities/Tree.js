let memArr = []
module.exports = class Tree{
    constructor(root){
        this.root = root
    }
    
     static getNode(treeRoot,uniqueID){
        memArr[treeRoot.id] = treeRoot
        if(treeRoot.id === uniqueID){
            return treeRoot;
        }
        let res = -1
        if(memArr[uniqueID] === undefined){
        for(let i= 0 ; i < treeRoot.descendants.length ; i++){
                res = this.getNode(treeRoot.descendants[i],uniqueID)
            }
        }else{
            res = memArr[uniqueID]
        }
        return res;
    }
}



