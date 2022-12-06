 module.exports = class treeNode{
    constructor(value ){
        this.value = value;
        this.content = ""
        this.descendants = []
        this.parent = null
        // this.id =id
        this.id = Math.floor(Math.random()*100000000)
        // this.id = Date.now()
    }
    

}




