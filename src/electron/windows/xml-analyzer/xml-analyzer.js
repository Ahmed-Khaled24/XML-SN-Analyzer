const { ipcRenderer } = require("electron");


const inputTextArea = document.querySelector('.input-window textarea');
const outputConsole = document.querySelector('.output-console textarea');
const openFileBtn = document.querySelector('.open-file-btn');
const validateBtn = document.querySelector('.validate-btn');
const correctBtn = document.querySelector('.correct-btn');
inputTextArea.focus();


inputTextArea.addEventListener('keydown', (event) => {
    if(event.keyCode == 9){
        event.preventDefault();
        inputTextArea.value += '    ';
    }    
});

openFileBtn.addEventListener('click', (e) => {
    ipcRenderer.send('command', 'openFile');
    ipcRenderer.on('openFileResponse', (event, fileText) => {
        inputTextArea.value = fileText;
    });
});

validateBtn.addEventListener('click', (e) => {
    ipcRenderer.send('command', 'validate', inputTextArea.value);
    ipcRenderer.on('validateResponse', (event, feedback) => {
        outputConsole.value = `${feedback.length} error(s) found! \n` + feedback.join('\n');
    })
});

correctBtn.addEventListener('click', (e) => {
    ipcRenderer.send('command', 'correct', inputTextArea.value);
    ipcRenderer.on('correctResponse', (event, lines) => {
        inputTextArea.value = lines.join('\n');
    })
})