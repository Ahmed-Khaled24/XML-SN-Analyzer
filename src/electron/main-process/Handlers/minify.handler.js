const { dialog } = require("electron");
const minify = require("../../../features/minify")

function minifyHandler(event, data){
    const lines = data.split("\n");
    const minifiedString = minify(lines)
    event.sender.send('minifyResponse', minifiedString)

}

module.exports = minifyHandler;
