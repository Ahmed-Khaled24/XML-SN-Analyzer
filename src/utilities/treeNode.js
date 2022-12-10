let counter=0
 module.exports = class treeNode{
    constructor(name){
        this.name = name;
        this.value = ""
        this.descendants = []
        this.parent = null
        this.id = counter++

    }
    

}




