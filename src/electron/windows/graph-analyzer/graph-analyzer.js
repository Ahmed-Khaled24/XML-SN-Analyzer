const {ipcRenderer} = require('electron');
const outputConsole = document.querySelector('.output-console textarea');
document.querySelector('.xml-btn').addEventListener('click', () => {
    ipcRenderer.send('command', 'gotoXMLAnalyzer');
});

document.querySelector('.most-influencer').addEventListener('click', () => {
    // Main process analyzer ALGraph and send the result
    ipcRenderer.send('command', 'getMostInfluencer');
    ipcRenderer.on('mostInfluencerRes', (event, mostInfluencer) => {
        outputConsole.value = mostInfluencer;
    })
})

