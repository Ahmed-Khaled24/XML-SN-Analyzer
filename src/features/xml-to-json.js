const readFile = require('../utilities/readFile.js');
const Stack = require('stack-lifo');
const treeNode = require('../utilities/treeNode.js');
const  getNode  = require('../utilities/searchTree.js');







async function main() {
    let testPath = "D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/src/features/test.xml";
    let samplePath ="D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/sample.xml";
    const file =  await readFile(samplePath);
 
    const fileJSON = converToJSON(file);

}


function converToJSON (xmlFile){
    let openingRegex = /<[a-zA-z0-9]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    // First traversion flag
    let flag =-1
    // Tree root
    let root
    
    let stack = new Stack();
    // Current tree node scope
    let tagNode;

    xmlFile.forEach((line) => {
        let content = line
        let recentNode = ""

        if(openingRegex.test(line)){
            // console.log("OPENING => ",line);
            let openTagName = line.match(openingRegex)[0].replace(/[><]/g,"")
            if(flag === -1){
                tagNode = new treeNode(openTagName)
                root = tagNode
                flag++
            }
            
            else{
                let temp2 =new treeNode(openTagName)
                temp2.parent = tagNode.id
                tagNode.descendants.push(temp2)
                tagNode=temp2
                console.log(root);
            }
            content = content.replace(openingRegex,"")
            stack.push(openTagName)
        }




        if(closingRegex.test(line)){

            // var closeTagName = line.match(closingRegex)[0].replace(/[<>\/]/g , "")
            content =  content.replace(closingRegex, "")
            // if(stack.peek().match(closeTagName) == closeTagName ){
                let temp = getNode(root , tagNode.parent)
                recentNode = tagNode
                tagNode = temp

               stack.pop()

            //}

        }

        //Checking if content is empty in certain line (and whether that line has a closing statement or not to use recent node instead of current node)
        if(content.length != 0 && (closingRegex.test(line)===false)){
            if(content[0] == ' ') content.trim()
            tagNode.value += content
        }else if (content.length != 0 && (closingRegex.test(line)===true)){
            if(content[0] == ' ') content.trim()
            recentNode.value += content
        }
        
    })


    return JSON.stringify(root) 
}


// Made like that because await can only be used inside async Functions
 main();
