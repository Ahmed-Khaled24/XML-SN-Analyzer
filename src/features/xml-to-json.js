const Stack = require('stack-lifo');
const treeNode = require('../utilities/treeNode.js');
const  getNode  = require('../utilities/Tree.js');
const Tree = require('../utilities/Tree')





module.exports = function converToJSON (xmlFile){
    let openingRegex = /<[a-zA-z0-9]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    // First traversion flag
    let flag =-1
    // Tree root
    let tree = new Tree()
    
    let stack = new Stack();
    // Current tree node scope
    let tagNode;

    xmlFile.forEach((line) => {
        let content = line
        let recentNode = ""

        if(openingRegex.test(line)){
            
            let openTagName = line.match(openingRegex)[0].replace(/[><]/g,"").trim()
            if(flag === -1){
                tagNode = new treeNode(openTagName)
                tree.root = tagNode
                flag++
            }
            
            else{
                let temp2 =new treeNode(openTagName)
                temp2.parent = tagNode.id
                tagNode.descendants.push(temp2)
                tagNode=temp2
            }
            content = content.replace(openingRegex,"")
            stack.push(openTagName)
        }




        if(closingRegex.test(line)){

            content =  content.replace(closingRegex, "").trim()
                let temp = Tree.getNode(tree.root , tagNode.parent)
                recentNode = tagNode
                tagNode = temp

               stack.pop()


        }



        //Checking if content is empty in certain line (and whether that line has a closing statement or not to use recent node instead of current node)
        if(content.length != 0 && (closingRegex.test(line)===false)){
            content = content.trim()
            tagNode.value += content
        }else if (content.length != 0 && (closingRegex.test(line)===true)){
            content = content.trim()
            recentNode.value += content
        }


        
    })


    return (JSON.stringify(tree.root)) 
}



