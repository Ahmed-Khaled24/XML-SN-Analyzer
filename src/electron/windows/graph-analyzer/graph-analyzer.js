const {ipcRenderer} = require('electron');
document.querySelector('.xml-btn').addEventListener('click', () => {
    ipcRenderer.send('command', 'gotoXMLAnalyzer');
})