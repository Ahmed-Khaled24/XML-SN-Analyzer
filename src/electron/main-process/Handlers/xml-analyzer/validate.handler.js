const {dialog} = require('electron');
const validateXML = require('../../../../features/xml-analyzer/validation')

function validateHandler(event, data) {
    const lines = data.split('\n');
    const {feedback} = validateXML(lines, false);
    event.sender.send('validateResponse', feedback);
}

module.exports = validateHandler;
