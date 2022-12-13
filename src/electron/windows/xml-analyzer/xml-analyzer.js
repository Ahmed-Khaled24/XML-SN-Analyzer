const { ipcRenderer } = require("electron");


const inputTextArea = document.querySelector('.input-window textarea');
const openFileBtn = document.querySelector('.open-file-btn');
inputTextArea.focus();


inputTextArea.addEventListener('keydown', (event) => {
    if(event.keyCode == 9){
        event.preventDefault();
        inputTextArea.value += '    ';
    }    
});

openFileBtn.addEventListener('click', (e) => {
    ipcRenderer.send('command', 'openFile');
    ipcRenderer.on('commandResponse', (event, fileText) => {
        inputTextArea.value = fileText;
    });
})