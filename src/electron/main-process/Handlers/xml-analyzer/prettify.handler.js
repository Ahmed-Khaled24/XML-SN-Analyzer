const prettify = require('../../../../features/prettify');

function prettifyHandler(event, data){
    let prettifiedData = prettify(data);
    event.sender.send('prettifyResponse', prettifiedData);
}

module.exports = prettifyHandler;