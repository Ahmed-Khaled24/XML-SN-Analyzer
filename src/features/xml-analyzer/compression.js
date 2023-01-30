const {  huffmanNode} = require('../../utilities/treeNode')
const {  binaryHuffmanTree} = require('../../utilities/Tree')

//-------------------------------------------------Decompression Helper Functions----------------------------------------//

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

function insertSort(objArr,node){
    let i=0 ,findSortedPlace=0
    while(i<objArr.length){
        if(node.freq < objArr[i].freq){
            findSortedPlace=1
            break
        }
        i++
    }
    if(findSortedPlace){
        return objArr.length
    }
    return i
}

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

function encodeH(xmlFileMin,referenceTable){
    let encodedFile=''
    for(let i=0;i<xmlFileMin.length;i++){
        encodedFile += referenceTable[xmlFileMin[i]]
    }
    return encodedFile
}

function binary2ASCII(binary){
    while(binary.length %16 !==0){
        binary = '0' + binary;
    }
    let base32 ='';
    let counter =0
    let fourbits =''
    for(let i = 0; i<binary.length; i++ ){
         fourbits += binary[i]
         counter++;
         if(fourbits.length === 16){
            fourbits = parseInt(fourbits,2)
            fourbits = String.fromCharCode(fourbits)
            base32 += fourbits
            counter=0
            fourbits=''
         }

    }
    return base32
  }




//-------------------------------------------------Decompression Helper Functions----------------------------------------//

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

function ASCII2Binary(letters){
    let res=''
    for(let i=0 ; i<letters.length ;i++){
        if(i!=0){
            res+=letters[i].charCodeAt(0).toString(2).padStart(16,"0")
        }else{
            res+=letters[i].charCodeAt(0).toString(2)
        }
    }
    return res
}



//-------------------------------------------------Compression Main Function----------------------------------------//

function huffManCompress(xmlFileMin){

    if(xmlFileMin.length ===1) xmlFileMin = xmlFileMin[0]

    let huffmanTree = constructHuffmanTree(xmlFileMin)
    getFinalTable(huffmanTree)
    let referenceTable = huffmanTree.codeTable
    let encodedFile = encodeH(xmlFileMin,referenceTable)
    encodedFile = binary2ASCII(encodedFile)
    encodedFile = encodedFile + '@js@' + JSON.stringify(referenceTable)

    return encodedFile
}


//-------------------------------------------------Decompression Main Function----------------------------------------//

function huffManDecompress(compressedXmlFile){
    compressedXmlFile = compressedXmlFile.split("@js@")
    let encoding = ASCII2Binary(compressedXmlFile[0])

    let referenceTable = getDecodeTable(JSON.parse(compressedXmlFile[1]))
    let decodedFile =decodeH(encoding,referenceTable)

    return decodedFile
}

//-------------------------------------------------Exported Object ------------------------------------------------//
module.exports = {
    huffManCompress:huffManCompress,
    huffManDecompress:huffManDecompress
}