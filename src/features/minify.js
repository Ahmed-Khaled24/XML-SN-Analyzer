const readFile = require('../utilities/readFile');


async function minify(){
    const lines = await readFile ("C:/Users/MAlek/OneDrive/Desktop/XML-Analyzer/sample.xml");
    let size = lines.length;
    for(let i =0 ;i < size;i++){
        lines[i] = lines[i].trim().replace('\n', '');
    }
console.log(lines.join(''));
}

minify();