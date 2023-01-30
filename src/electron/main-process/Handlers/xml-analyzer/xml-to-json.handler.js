const convertToJSON = require('../../../../features/xml-analyzer/xml-to-json')
const prettify = require('../../../../features/xml-analyzer/prettify')

function xmlToJSONHandler(event, data) {
    const prettifiedData =  prettify(data);
    const json = convertToJSON(prettifiedData ,{compact:true , spacing:3});
    event.sender.send('xmlToJSONResponse', json);
}

module.exports = xmlToJSONHandler;