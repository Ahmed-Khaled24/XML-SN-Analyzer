const { ipcRenderer } = require("electron");


const inputTextArea = document.querySelector('.input-window textarea');
const outputConsole = document.querySelector('.output-console textarea');
const graphBtn = document.querySelector('.graph-btn');
const validateBtn = document.querySelector('.validate-btn');
const correctBtn = document.querySelector('.correct-btn');
const minifyBtn = document.querySelector('.minify-btn');
const compressBtn = document.querySelector('.compress-btn');
const convertToJSONBtn = document.querySelector('.convertToJSON-btn');
const prettifyBtn = document.querySelector('.prettify-btn');
const decompressBtn = document.querySelector('.decompress-btn');


inputTextArea.focus();
ipcRenderer.on('openFileResponse', (event, fileText) => {
    inputTextArea.value = fileText;
});

inputTextArea.addEventListener('keydown', (event) => {
    if(event.keyCode == 9){
        event.preventDefault();
        inputTextArea.value += '    ';
    }    
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

minifyBtn.addEventListener('click', (e) => {
    ipcRenderer.send('command', 'minify', inputTextArea.value);
    ipcRenderer.on('minifyResponse', (event, minifiedString) => {
        inputTextArea.value = minifiedString;
    })
})

convertToJSONBtn.addEventListener('click',(e) => {
    ipcRenderer.send('command', 'convertToJSON', inputTextArea.value);
    ipcRenderer.on('xmlToJSONResponse', (event, json) => {
        inputTextArea.value = json;
    })
})

compressBtn.addEventListener('click',(e) => {
    ipcRenderer.send('command', 'compress', inputTextArea.value);
    ipcRenderer.on('compressResponse', (event, compressedFile) => {
        inputTextArea.value = compressedFile;
    })
});
decompressBtn.addEventListener('click',(e) => {
    ipcRenderer.send('command', 'decompress', inputTextArea.value);
    ipcRenderer.on('decompressResponse', (event, decompressedFile) => {
        inputTextArea.value = decompressedFile;
    })
});

prettifyBtn.addEventListener('click', (e) => {
    console.log("A&A");
    ipcRenderer.send('command', 'prettify', inputTextArea.value);
    ipcRenderer.on('prettifyResponse', (event, prettifiedData) => {
        inputTextArea.value = prettifiedData.join('\n');
    });
});

graphBtn.addEventListener('click' ,() => {
    ipcRenderer.send('command', 'gotoGraphWindow');
})