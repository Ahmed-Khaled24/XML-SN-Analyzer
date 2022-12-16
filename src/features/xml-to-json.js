const Stack = require('stack-lifo');
const {treeNode} = require('../utilities/treeNode.js');
const {Tree} = require('../utilities/Tree')





module.exports = function converToJSON (xmlFile){
    let openingRegex = /<[a-zA-z0-9'"=\s-]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    // First opening tag flag
    let flag =-1
    // Tree root
    let tree = new Tree()
    // Current tree node scope
    let tagNode;

    xmlFile.forEach((line) => {
        line = line.trim()
        let content = line
        let recentNode = ""

        if(openingRegex.test(line)){
            let test = line.match(openingRegex)[0].split(" ")

            let openTagName = test[0].replace(/[><]/g,"").trim()
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
            for(let i=1 ; i<test.length ; i++){
                let pair = test[i].split("=")
                let key = pair[0]
                let value = pair[1].replace(/[\"'>]/g,"")
                console.log(`pair =>${value}`);
                tagNode['attributes'][key] = value

            }
            content = content.replace(openingRegex,"").trim()
        }




        if(closingRegex.test(line)){
            content =  content.replace(closingRegex, "").trim()
                let temp = Tree.getNode(tree.root , tagNode.parent)
                recentNode = tagNode
                tagNode = temp
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



