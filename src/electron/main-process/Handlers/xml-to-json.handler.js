const convertToJSON = require('../../../features/xml-to-json')
const prettify = require('../../../features/prettify')

function xmlToJSONHandler(event, data) {
    const prettifiedData =  prettify(data);
    const json = convertToJSON(prettifiedData);
    event.sender.send('xmlToJSONResponse', json);
}

module.exports = xmlToJSONHandler;