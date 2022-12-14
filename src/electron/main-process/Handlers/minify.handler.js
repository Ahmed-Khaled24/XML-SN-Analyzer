const minify = require('../../../features/minify');

function minifyHandler(event, data){
    const lines = data.split('\n');
    const minified = minify(lines);
    event.sender.send('minifyResponse', minified);
}

module.exports = minifyHandler;