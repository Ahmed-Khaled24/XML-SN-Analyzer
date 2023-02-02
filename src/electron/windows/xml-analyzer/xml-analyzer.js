const { ipcRenderer } = require('electron');

const inputTextArea = document.querySelector('.input-window textarea');
const outputConsole = document.querySelector('.output-console textarea');
const graphBtn = document.querySelector('.graph-btn');
const validateBtn = document.querySelector('.validate-btn');
const correctBtn = document.querySelector('.correct-btn');
const minifyBtn = document.querySelector('.minify-btn');
const compressBtn = document.querySelector('.compress-btn');
const convertToJSONBtn = document.querySelector('.convertToJSON-btn');
const JSONTypeSelector = document.querySelector('.to-xml-btn select');
const prettifyBtn = document.querySelector('.prettify-btn');
const decompressBtn = document.querySelector('.decompress-btn');

inputTextArea.focus();

inputTextArea.addEventListener('keydown', (e) => {
	if (e.keyCode == 9) {
		e.preventDefault();
		inputTextArea.value += '    ';
	}
});

validateBtn.addEventListener('click', (e) => {
	inputTextArea.value // Is there any data?
		? ipcRenderer.send('command', 'validate', inputTextArea.value) // If there is data send it to main process to handle it
		: sendError( // If there is no data return error
				`There is no data to validate
				insert xml data and try again`
		);	
});

correctBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'correct', inputTextArea.value)
		: sendError(
			`There is no data insert xml data and try again`
		);
});

minifyBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'minify', inputTextArea.value)
		: sendError(
			`There is no data to minify 
			insert xml data and try again`
		);	
});

convertToJSONBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'convertToJSON', {
				data: inputTextArea.value,
				type: JSONTypeSelector.value,
		  })
		: sendError(
				`There is no data to convert
				insert xml data and try again`
		);
});

compressBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'compress', inputTextArea.value)
		: sendError(
				`There is no data to compress
				insert xml data and try again`
		);	
});

decompressBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'decompress', outputConsole.value)
		: sendError(
				`There is no data to decompress
				insert xml data and try again`
		);
});

prettifyBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'prettify', inputTextArea.value)
		: sendError(
				`There is no data to prettify
				insert xml data and try again`
		);
});

graphBtn.addEventListener('click', (e) => {
	inputTextArea.value
		? ipcRenderer.send('command', 'gotoGraphWindow', inputTextArea.value)
		: sendError(
				`There is no data to analyze in the graph 
				insert your xml data and try again`
		);
});

// Listeners
ipcRenderer.on('openFileResponse', (event, fileText) => {
	inputTextArea.value = fileText;
});
ipcRenderer.on('giveMeYourData', (event) => {
	ipcRenderer.send('hereIsMyData', outputConsole.value);
});
ipcRenderer.on('validateResponse', (event, feedback) => {
	outputConsole.style.color = 'red';
	outputConsole.value =
		`${feedback.length} error(s) found! \n` + feedback.join('\n');
});
ipcRenderer.on('prettifyResponse', (event, prettifiedData) => {
	inputTextArea.value = prettifiedData.join('\n');
});
ipcRenderer.on('decompressResponse', (event, decompressedFile) => {
	outputConsole.style.color = 'white';
	outputConsole.value = decompressedFile;
});
ipcRenderer.on('compressResponse', (event, compressedFile) => {
	outputConsole.style.color = 'white';
	outputConsole.value = compressedFile;
});
ipcRenderer.on('xmlToJSONResponse', (event, json) => {
	outputConsole.style.color = 'white';
	outputConsole.value = json;
});
ipcRenderer.on('minifyResponse', (event, minifiedString) => {
	inputTextArea.value = minifiedString;
});
ipcRenderer.on('correctResponse', (event, lines) => {
	inputTextArea.value = lines.join('\n');
});


function sendError(error) {
	ipcRenderer.send('error', error);
}