const { dialog } = require("electron");
const minify = require("../../../../features/minify")

function minifyHandler(event, data){
    try{
        const lines = data.split("\n");
        const minifiedString = minify(lines)
        event.sender.send('minifyResponse', minifiedString)
    }catch(err){
        dialog.showErrorBox('Error' , 'Cannot minify a minified file')
    }


}

module.exports = minifyHandler;
