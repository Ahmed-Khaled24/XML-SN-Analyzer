 module.exports = class treeNode{
    constructor(name ){
        this.name = name;
        this.value = ""
        this.descendants = []
        this.parent = null
        // this.id =id
        this.id = Math.floor(Math.random()*100000000)
         //this.id = Date.now()
    }
    

}




