

module.exports =class Tree{
    constructor(root){
        this.root = root
    }
    
     static getNode(treeRoot,uniqueID){
        if(treeRoot.id === uniqueID){
            return treeRoot;
        }
    
        let res = -1
        for(let i= 0 ; res===-1 && i < treeRoot.descendants.length ; i++){
             res = this.getNode(treeRoot.descendants[i],uniqueID)
        }
        return res;
    }
}