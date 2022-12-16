const fs = require('fs')
const {  huffmanNode} = require('../utilities/treeNode')
const {  binaryHuffmanTree} = require('../utilities/Tree')
const { log } = require('console')
const { encode, decode } = require('punycode')



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
// console.log(compressAndSaveLZW('geekific'));
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


function convert2Binary(file){
    let binaryFile = ''
    for(let i=0 ; i< file.length ;i++){
        binaryFile += Number(file.charCodeAt(i)).toString(2).padStart(8,'0') 

    }
    return binaryFile
}

function getFreqTable(xmlFileMin){
    let freqTable= {}
    if(xmlFileMin.length ===1) xmlFileMin = xmlFileMin[0]

    for(let i=0 ; i< xmlFileMin.length ;i++){

            letter = xmlFileMin[i]
        
        if(freqTable[letter] === undefined){
            freqTable[letter] = 1
        }else{
            freqTable[letter]++

        }
    }
    return freqTable
}

function getNodeArr(freqTable){
    let result =[]
    for(const key in freqTable){
        let temp = new huffmanNode(key)
        temp.freq = freqTable[key]
        result.push(temp)
    }
    result.sort((a,b)=>{
        if(a.freq < b.freq) return -1
        else return 1
    })
    return result
}

// function findLeastPair(freqTable){
//     let min = Number.MAX_SAFE_INTEGER
//     let secondMin = 0
//     for(const key in freqTable){
//         test1 = freqTable[key]
//         test2 = freqTable[min]
//         if (freqTable[key] <= freqTable[min] || freqTable[min] === undefined){
//             secondMin = min
//             min = key ;
//         }else if((freqTable[key] > freqTable[min] && freqTable[key] < freqTable[secondMin] ) || freqTable[secondMin] === undefined){
//             secondMin = key
//         }
//     }

//     return [min,secondMin]
// }

function getKey(value , table){
    for(const key in table){
        if(table[key] == value )return key
    }
    return -1

}

function insertSort(objArr,node){
    let i=0 ,flag=1
    while(i<objArr.length){
        if(node.freq < objArr[i].freq){
            flag=0
            break
        }
        i++
    }
    if(flag){
        return objArr.length
    }
    return i
}
// }
// let arr =[
//     {freq:3  },
//     {freq:4 },
//     {freq:5  },
//     {freq:7  },
//     {freq:9  }


// ]
// arr.shift()
// console.log(arr);
// let node = {freq:2 }

// console.log(insertSort(arr,node));
// arr.splice(insertSort(arr,node),0,node)
// console.log(arr);
function constructHuffmanTree(xmlFileMin){
    if(xmlFileMin.length ===1) xmlFileMin = xmlFileMin[0]
    let nodeArr = getNodeArr(getFreqTable(xmlFileMin))
    while(nodeArr.length !== 1){
        let temp = new huffmanNode('')
        temp.freq = nodeArr[0].freq + nodeArr[1].freq
        temp.descendants = [nodeArr[0],nodeArr[1]]
        nodeArr.shift()
        nodeArr.shift()
        let index = insertSort(nodeArr,temp);
        if(index ===0 ){
            nodeArr[0] = temp
        }else{
            nodeArr.splice(index,0,temp)
        }
    }
    let huffmanTree = new binaryHuffmanTree(nodeArr[0])
    return huffmanTree
}

function getFinalTable(huffmanTree){
   
      huffmanTree.getCodes(huffmanTree.root)
      return huffmanTree.codeTable
}
// let node1 = new huffmanNode('')
// let node2 = new huffmanNode('')
// let node3 = new huffmanNode('')
// let node9 = new huffmanNode('')
// let node4 = new huffmanNode('a')
// let node5 = new huffmanNode('b')
// let node6 = new huffmanNode('c')
// let node7 = new huffmanNode('d')
// let node8 = new huffmanNode('e')

// node1.descendants = [node2,node3]
// node2.descendants = [node4,node9]
// node3.descendants = [node7,node8]
// node9.descendants = [node5,node6]

// //console.log(node1);
// let testTree = new binaryHuffmanTree(node1)
// console.log(getFinalTable(testTree));
// let nodei1 = new huffmanNode('')
// let nodei2 = new huffmanNode('')
// let nodei3 = new huffmanNode('')
// let nodei9 = new huffmanNode('')
// let nodei4 = new huffmanNode('f')
// let nodei5 = new huffmanNode('g')
// let nodei6 = new huffmanNode('h')
// let nodei7 = new huffmanNode('j')
// let nodei8 = new huffmanNode('k')

// nodei1.descendants = [nodei2,nodei3]
// nodei2.descendants = [nodei4,nodei9]
// nodei3.descendants = [nodei7,nodei8]
// nodei9.descendants = [nodei5,nodei6]
// testTree = new binaryHuffmanTree(nodei1)

// console.log(getFinalTable(testTree));


// console.log(binaryHuffmanTree.codeTable);


// takes the string that comes off the minify function
function encodeH(xmlFileMin,referenceTable){
    let encodedFile=''
    for(let i=0;i<xmlFileMin.length;i++){
        encodedFile += referenceTable[xmlFileMin[i]]
    }
    return encodedFile
}
function huffManCompress(xmlFileMin){
    if(xmlFileMin.length ===1) xmlFileMin = xmlFileMin[0]
    let huffmanTree = constructHuffmanTree(xmlFileMin)
    getFinalTable(huffmanTree)
    let referenceTable = binaryHuffmanTree.codeTable
    let encodedFile = encodeH(xmlFileMin,referenceTable)
    encodedFile = encodedFile + '\n' + JSON.stringify(referenceTable)
    return encodedFile
}
function getDecodeTable(encodeTable){
    let decodeTable = {}
    for(const key in encodeTable){
        decodeTable[encodeTable[key]] = key
    }
    return decodeTable
}
function decodeH(encoding,referenceTable){
    let decodedFile =''
    let code =''
    for(let i=0 ; i<encoding.length ;i++){
        code += encoding[i]
        if(referenceTable[code] !== undefined){
            decodedFile += referenceTable[code]
            code =''
        }
    }
    return decodedFile
}
// takes the string that comes off the huffman compress function
function huffManDecompress(compressedXmlFile){
    let encoding = compressedXmlFile[0]
    let referenceTable = getDecodeTable(JSON.parse(compressedXmlFile[1]))
    let decodedFile =decodeH(encoding,referenceTable)
    return decodedFile
}






module.exports = {
    huffManCompress:huffManCompress,
    huffManDecompress:huffManDecompress
}


    