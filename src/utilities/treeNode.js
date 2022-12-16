let counter=0
  class treeNode{
    constructor(name){
        this.name = name;
        this.value = "";
        this.attributes = {};
        this.descendants = [];
        this.parent = null;
        this.id = counter++;

    }
    

}

class huffmanNode{
    constructor(name){
        this.name = name;
        this.freq = 0;
        this.descendants =[]

    }
}



module.exports ={
    treeNode:treeNode,
    huffmanNode:huffmanNode
}
