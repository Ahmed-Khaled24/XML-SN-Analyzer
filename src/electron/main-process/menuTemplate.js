const openFileHandler =require('./Handlers/xml-analyzer/openFile.handler');
const saveFileHandler = require('./Handlers/xml-analyzer/saveFile.handler');

module.exports = [
    {
        label: 'open',
        submenu: [
            {
                label: 'XML file',
                click: openFileHandler,
                accelerator: 'CommandOrControl+O',
            },
            {
                label: 'Compressed file',
                click: openFileHandler,
            },
        ],
    },
    {
        label: 'save',
        submenu: [
            {
                label: 'save as',
                click: saveFileHandler,
                accelerator: "CommandOrControl+s"
            }
        ]
    }	
]