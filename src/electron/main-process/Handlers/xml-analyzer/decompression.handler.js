const { dialog } = require('electron');
const {huffManCompress , huffManDecompress} = require('../../../../features/compression');
const prettify = require('../../../../features/prettify');

function decompressionHandler(event, data) {
    try{
        const decompressedFile= huffManDecompress(data);
        const prettifiedData = prettify(decompressedFile).join("\n");
        event.sender.send('decompressResponse', prettifiedData);
    }catch(err){
        dialog.showErrorBox('Error' , err.message)
    }

}

module.exports = decompressionHandler;