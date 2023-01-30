const { dialog } = require('electron');
const {huffManCompress , huffManDecompress} = require('../../../../features/compression');
const minify = require('../../../../features/minify');

function compressionHandler(event, data) {
    try{
        data = data.split("\n")
        const fileMin = minify(data);
        const compressedFile= huffManCompress(fileMin);
        event.sender.send('compressResponse', compressedFile);
    }catch(err){
        dialog.showErrorBox('Error' , 'Cannot compress a minified file')
    }

}

module.exports = compressionHandler;