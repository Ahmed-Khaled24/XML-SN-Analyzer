const { dialog } = require('electron');
const {huffManCompress , huffManDecompress} = require('../../../../features/xml-analyzer/compression');
const minify = require('../../../../features/xml-analyzer/minify');

function compressionHandler(event, data) {
        data = data.split("\n")
        const fileMin = minify(data);
        const compressedFile= huffManCompress(fileMin);
        event.sender.send('compressResponse', compressedFile);
}

module.exports = compressionHandler;