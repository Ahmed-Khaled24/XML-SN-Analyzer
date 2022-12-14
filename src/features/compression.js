const fs = require('fs')

//  function compressAndSave(root , filePath){
//     root = JSON.parse(root)
//     let file = [["id","name","posts(body,topic)","followers(id)"]]
//     for(let i=0 ; i<root.descendants.length ; i++){
//         let subFile = []
//         let userFieldsLength = root.descendants[i].descendants.length
//         for(let n=0 ; n<userFieldsLength ; n++){

//         let userField =root.descendants[i].descendants[n].name

//         if(userField ==="id") {
//             subFile.push(userField.value)
//         }

//         if(userField ==="name"){
//             subFile.push(root.descendants[i].descendants[n].value)
//         } 

//         if(userField ==="posts") {
//             let postArr =[]
//             let postsLength = root.descendants[i].descendants[n].descendants.length
//             for(let k=0 ; k< postsLength ; k++){
//                 let postBodyArr=[]
//                 let singlePostLength =root.descendants[i].descendants[n].descendants[k].descendants.length
//                 for(let h=0 ; h < singlePostLength; h++){
//                 let singlePostField =root.descendants[i].descendants[n].descendants[k].descendants[h]
//                 if(singlePostField.name === "body"){
//                     postBodyArr.push(root.descendants[i].descendants[n].descendants[k].descendants[h].value)
//                 }
//                 if(singlePostField.name === "topics"){
//                     let topncsPostSubArr = []
//                     let topicsLength =  root.descendants[i].descendants[n].descendants[k].descendants[h].descendants.length
//                     for(let j=0 ; j < topicsLength ; j++){
//                         let topic = root.descendants[i].descendants[n].descendants[k].descendants[h].descendants[j].value
//                         topncsPostSubArr.push(topic)
//                     }
//                     let wholePostArr = [postBodyArr , topncsPostSubArr]
//                     postArr.push(wholePostArr)
//                 }
//             }
//         }
//             subFile.push(postArr)
//         }

//         if(userField === "followers"){
//             let followersArr =[]
//             let followersLength =root.descendants[i].descendants[n].descendants.length
//             for(let k=0 ; k< followersLength; k++){
//                 let followerID = root.descendants[i].descendants[n].descendants[k].descendants[0].value
//                followersArr.push(followerID)
//             }
//             subFile.push(followersArr)
//         }

//     }
//     file.push(subFile)

//     }

//     content = JSON.stringify(file);
    
//     SaveFile(content ,filePath , 'compressed' )
//     return file
// }



// function decompressAndSave(file , filePath){
//     let lines= ['<users>']
//     for(let i=1 ; i< file.length ; i++ ){
//         lines.push('\t<user>')
//         // id value
//         let id = file[i][0]
//         lines.push(`\t\t<id>${id}</id>`)

    
//         // name value
//         let name = file[i][1]
//         lines.push(`\t\t<name>${name}</name>`)


//         lines.push('\t\t<posts>')
//         let postsLength = file[i][2].length
//         for(let k=0 ; k< postsLength  ; k++){
//             let postBody = file[i][2][k][0]
//             lines.push(`\t\t\t<post>`)
//             lines.push(`\t\t\t\t<body>`)
//             lines.push('\t\t\t\t\t'+postBody)
//             lines.push(`\t\t\t\t</body>`)

//             let topicsLength = file[i][2][k][1].length
//             lines.push(`\t\t\t\t<topics>`)
//             for(let j=0 ; j<topicsLength ; j++){
//                 lines.push(`\t\t\t\t\t<topic>`)
//                 let topic = file[i][2][k][1][j]
//                 lines.push('\t\t\t\t\t\t'+topic)
//                 lines.push(`\t\t\t\t\t</topic>`)
//             }
//             lines.push(`\t\t\t\t</topics>`)
//             lines.push(`\t\t\t</post>`)
//         }
//         lines.push('\t\t</posts>')

//         lines.push(`\t\t<followers>`)
//         let followersLength = file[i][3].length
//         for(let h=0 ; h<followersLength ; h++){
//             let followerID = file[i][3][h]
//             lines.push(`\t\t\t<follower>`)
//             lines.push(`\t\t\t\t<id>${followerID}</id>`)
//             lines.push(`\t\t\t</follower>`)

//         }
//         lines.push(`\t\t</followers>`)

//         lines.push(`\t</user>`)
        

//     }
//     lines.push(`</users>`)

//     SaveFile(lines, filePath , 'Decompressed')
//     return lines
// }

function compressAndSaveLZW(file){
    let dictionary = generateDic()
    let result = []
    let ASCII = Object.keys(dictionary).length - 1
    let i=0
    let lastChecked
    let string = ''
    let letter
    let test = [...file]
    while( i !== test.length){
        letter = test[i]
        string += letter
        if(dictionary[string] !== undefined ){
            lastChecked = string
        }else{
            ASCII++
            dictionary[string] = ASCII
            string =''
            result.push(dictionary[lastChecked])
            i--
        }
        i++
    }
    result.push(dictionary[lastChecked])

    return result
}
console.log(compressAndSaveLZW('geekific'));
function decompressAndSaveLZW(file){
    let dictionary = generateDic()
    let result = []
    let ASCII = Object.keys(dictionary).length - 1

    let i=0
    let lastChecked
    let string = ''
    let letter
    while( i !== file.length){
        test =  file[i]
        letter = getDicKey(dictionary,file[i])
        if(letter === undefined){
            letter =  string[0]
        }
        string += letter
        if(dictionary[string] !== undefined ){
            lastChecked = string
        }else{
            ASCII++
            dictionary[string] = ASCII
            string =''
            result.push(lastChecked)
            i--
        }
        i++
    }
    result.push(lastChecked)

    return result.join('')
}
function getDicKey(dictionary , ASCII){
    return Object.keys(dictionary).find(key => dictionary[key] === ASCII)
}

function generateDic(){
    let dictionary = {}
    for( let ASCII = 0;ASCII<256 ; ASCII++){
        dictionary[String.fromCharCode(ASCII)] = ASCII
    }
    return dictionary
}

//console.log(decompressAndSaveLZW(compressAndSaveLZW('geekificAllTheWay for me tooooo')));

async function SaveFile(lines , filePath , control){

    if(control === 'Decompressed'){
        let logger = fs.createWriteStream(filePath, {
            flags : 'a'
        })
    lines.forEach(line => {
        line = line + '\n'
        logger.write(line)
    });
}else {
    let logger = fs.createWriteStream(filePath)
    logger.write(lines)
}
    logger.end()

    
}



module.exports = {
    compressAndSaveLZW : compressAndSaveLZW,
    decompressAndSaveLZW : decompressAndSaveLZW
}