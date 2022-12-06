const readFile = require('../utilities/readFile.js');
const Stack = require('stack-lifo');
const treeNode = require('../utilities/treeNode.js');
const  getNode  = require('../utilities/searchTree.js');







async function main() {
    let testPath = "D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/src/features/test.xml";
    let samplePath ="D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/sample.xml";
    const file =  await readFile(testPath);
 
    converToJSON(file);

}


function converToJSON (xmlFile){
    let openingRegex = /<[a-zA-z0-9]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    let counter = -1;
    var openedTag = 1;
    var closedTag =2;
    var currentRoot=null , oldRoot = [];
    var flag =-1
    var root

    let stack = new Stack();


    let tagNode;

    xmlFile.forEach((line) => {
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
            console.log('opened tag =>',openedTag);
            console.log('closed tag =>',closedTag);

            // console.log(openTagName);
            openedTag = openTagName
            counter++;
            //console.log(root);
            stack.push(openTagName)
        }
        if(closingRegex.test(line)){
            // let temp2 = line.replace(/\// , "");
            // console.log(stack.peek().match(openingRegex)[0]);
            // console.log(line.match(closingRegex)[0].replace(/\// , ""));
            var closeTagName = line.match(closingRegex)[0].replace(/[<>\/]/g , "")
            // console.log('test =>',closeTagName);
            if(stack.peek().match(closeTagName) == closeTagName ){
                closedTag = closeTagName;
                let temp = getNode(root , tagNode.parent)
                tagNode = temp

                // console.log("CLOSING => " , temp2);
               stack.pop()

            }

        }

        
    })

    console.log(stack.isEmpty());
    console.log(root);


}



 main();




                // / if(openedTag === closedTag ) {
                //     let temp =new treeNode(closeTagName)
                //    // if(tagNode.parent != null)
                //    temp.parent = tagNode.parent
                //      getNode(root,tagNode.parent).descendants.push(temp)
                //      tagNode = temp