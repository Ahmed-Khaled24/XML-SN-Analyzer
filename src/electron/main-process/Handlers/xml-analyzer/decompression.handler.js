const { dialog } = require('electron');
const {huffManCompress , huffManDecompress} = require('../../../../features/xml-analyzer/compression');
const prettify = require('../../../../features/xml-analyzer/prettify');

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