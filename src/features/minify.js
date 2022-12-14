const findFirstDiff = (str1, str2) =>
  str2[[...str1].findIndex((el, index) => el !== str2[index])];

  module.exports = function minify(file){

    return terminateWhiteSpace(combine(file))
}

function combine(file){
    for(let i=0 ; i<file.length ;i++){
        file[i] = file[i].trim()
    }

return file.join('').replace('\n',"");
}
function terminateWhiteSpace(combinedFile){
    let size = combinedFile.length;
    let openingRegex = /<[a-zA-z0-9"=\s-]+>/ ;
    let closingRegex = /<\/[a-zA-z0-9]+>/;
    let openAndCloseRegex = /^(?=.*<\/[a-zA-z0-9]+>)(?=.*<[a-zA-z0-9"=\s-]+>).*$/;

        let tags = ['>' ,'<']
        let spaceFreeLines = combinedFile
        // Remove space at right and left by splitting at both tags
        tags.forEach(tag => {
            let splitLines = spaceFreeLines.match(openAndCloseRegex)[0].split(tag)
            spaceFreeLines = splitLines.map(splitLine => {
                let res
                let shifted
                if(tag === '<'){
                    splitLine = splitLine.trim()
                res = splitLine.slice(1) 
                res.trim()
                shifted = findFirstDiff(res,splitLine)
                res = '<' + shifted + res.trim()

            }else{
                res = splitLine.trim() + '>'
            } 
            return res
            
            })
            // after each split there is an undefined space either at front or end so i remove it depending on case
            tag === '>'? spaceFreeLines.pop() : spaceFreeLines.shift()
            spaceFreeLines =spaceFreeLines.join('')



    });

    return spaceFreeLines


}
