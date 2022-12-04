const readFile = require('../utilities/readFile.js');
const Stack = require('stack-lifo');








async function main() {
    let testPath = "D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/src/features/test.xml";
    let samplePath ="D:/Kollya/Senior/Senior 1/term awl/Data Structure/project/XML-Analyzer/sample.xml";
    const file =  await readFile(samplePath);
 
    converToJSON(file);

}

function converToJSON (xmlFile){
    let openingRegex = /<[a-zA-z0-9]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;

    let stack = new Stack();


    xmlFile.forEach((line) => {
        if(openingRegex.test(line)){
            // console.log("OPENING => ",line);
            
            stack.push(line)
        }
        if(closingRegex.test(line)){
            let temp2 = line.replace(/\// , "");
            // console.log(stack.peek().match(openingRegex)[0]);
            // console.log(line.match(closingRegex)[0].replace(/\// , ""));

            if(stack.peek().match(openingRegex) == line.match(closingRegex)[0].replace(/\// , "")){
                console.log("CLOSING => " , temp2);
                stack.pop();
            }

        }

        
    })

    console.log(stack.isEmpty());



}



main();


