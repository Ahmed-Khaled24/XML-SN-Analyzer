const Stack = require('stack-lifo');
const {treeNode} = require('../utilities/treeNode.js');
const {Tree} = require('../utilities/Tree')


function nonCompactJSON (xmlFile ,spacing){
    let openingRegex = /<[a-zA-z0-9'"=\s-]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;

    // xml file wrapper
    let obj ={};

    // previous objects stack
    let tags = [];
    let root;

    let content= "";
    xmlFile.forEach((line) => {
        line = line.trim()
        content += line
        if(openingRegex.test(line)){
            let openTagName = line.match(openingRegex)[0].split(" ")[0].replace(/[><]/g,"").trim();
            tags.push(openTagName)
        }
        content = content.replace(openingRegex,"").trim()
        content = content.replace(closingRegex,"").trim();




        if(closingRegex.test(line)){
            let currentTag = tags[tags.length - 1];
            let parentTag = tags[tags.length - 2];

            if(tags.length === 1){
                root = currentTag;
            }else
            if(content === "" && tags.length !== 1){
                 if(typeof currentTag === "object" && typeof parentTag =="object"){
                    let updatedEntry;
                    let keys = Object.keys(parentTag);
                    let lastKey = keys[keys.length - 1];
                    if(Array.isArray(Object.entries(parentTag).pop()[1]) && Array.isArray(Object.entries(currentTag).pop()[1]) ){
                        updatedEntry = {...parentTag , ...currentTag}
                        tags[tags.length - 2] = updatedEntry
                    }else if(Array.isArray(Object.entries(parentTag).pop()[1]) ){
                        updatedEntry = tags[tags.length - 2][lastKey].push(currentTag)
                        }else{
                            updatedEntry = {...parentTag[lastKey] , ...currentTag}
                        tags[tags.length - 2] = updatedEntry
                    }

                 }else if(!Array.isArray(parentTag)){
                    tags[tags.length - 2] = {};
                    tags[tags.length - 2][parentTag] = [];
                    tags[tags.length - 2][parentTag].push(currentTag);
                }else if(Array.isArray(parentTag)){
                    tags[tags.length - 2][parentTag].push(currentTag);
                }
            }else{
                if(typeof parentTag !== "object"){
                    tags[tags.length - 2] = {[parentTag] : {}};
               }
               let keys = Object.keys(tags[tags.length - 2]);
               let lastKey = keys[keys.length - 1];
                if( tags[tags.length - 2][lastKey][currentTag] !== undefined){
                    tags[tags.length - 2][lastKey][currentTag] += ", " + content;

                }else{
                    tags[tags.length - 2][lastKey][currentTag] = content;

                }

            }
            content = ""
            tags.pop();
        }


        
    })

    return JSON.stringify(root,null,spacing);

}


function compactJSON (xmlFile , spacing){
    let openingRegex = /<[a-zA-z0-9'"=\s-]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    // First opening tag flag
    let firstIteration =-1
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
            if(firstIteration === -1){
                tagNode = new treeNode(openTagName)
                tree.root = tagNode
                firstIteration++
            }
            else{
                let currentNode =new treeNode(openTagName)
                currentNode.parent = tagNode.id
                tagNode.descendants.push(currentNode)
                tagNode=currentNode
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
                let currentNode = Tree.getNode(tree.root , tagNode.parent)
                recentNode = tagNode
                tagNode = currentNode
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


    return (JSON.stringify(tree.root , null ,spacing)) 
}


module.exports = function converToJSON(xmlFile , {compact , spacing}){
    return compact === true? compactJSON(xmlFile,spacing) : nonCompactJSON(xmlFile,spacing);
}


