const prettifyObj = require('../../../features/prettify');

function prettifyHandler(event, data){
    let prettifiedData = (prettifyObj.xml(data))
    .split('\n')
    .filter(line => line.trim() !== '')
    .join('\n');
    event.sender.send('prettifyResponse', prettifiedData);
}

module.exports = prettifyHandler;