/*
    This utility function is used across the whole project,
    saveFile() takes the string structure you want to save and the absolute
    path you want to save it in thus creating a new file with the saved 
    data or overwriting an old file if one with the same name existed before
    saving. 
*/
async function saveFile(lines , filePath ){
    let logger = fs.createWriteStream(filePath)
    logger.write(lines)
    logger.end()
    
}

module.exports = saveFile;