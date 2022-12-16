let memArr = []
let i=1;
let binary =''
// let codeTable={}



class Tree{
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

class binaryHuffmanTree{
    static codeTable = {}
    constructor(root){
        this.root = root
        this.codeTable ={}
    }
    //note that binaryCode is a string and is treated as such
    // while root is a huffman node or a huffman leaf
    static getLeaf(root,binaryCode){
        let res = -1
        if(binaryCode !== '' && root.descendants.length === 0){
            return res
        }else
        if(binaryCode == '' && root.value !== ''){
            return root
        }
        let currentBinary = binaryCode[0]
        binaryCode = binaryCode.slice(1)
        if(currentBinary == 1){
            res =this.getLeaf(root.descendants[1] , binaryCode)
        }else if(currentBinary == 0){
           res= this.getLeaf(root.descendants[0] ,binaryCode)
        }
        return res
    
        
    }

    getCodes(root , string){
        if(string === 'left'){
            binary += '0'
        }
        if(string ==='right'){
            binary += '1'

        }
        if(root.name !== '' ){
            this.codeTable[root.name]=binary
        }
        if(root.descendants.length === 0){
            binary = binary.slice(0,-1)
            return
        }


        this.getCodes(root.descendants[0] , 'left')
        this.getCodes(root.descendants[1],'right')
        binary = binary.slice(0,-1)

        // let res =binaryHuffmanTree.codeTable
        // binaryHuffmanTree.codeTable =''
        // return res

    }
    

}

module.exports = {
    Tree : Tree,
    binaryHuffmanTree : binaryHuffmanTree
}


