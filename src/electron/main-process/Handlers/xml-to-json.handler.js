const convertToJSON = require('../../../features/xml-to-json')

function xmlToJSONHandler(event, data) {
    const lines = data.split('\n');
    const json = convertToJSON(lines);
    event.sender.send('xmlToJSONResponse', json);
}

module.exports = xmlToJSONHandler;