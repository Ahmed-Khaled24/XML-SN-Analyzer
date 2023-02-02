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

inputTextArea.addEventListener('keydown', (event) => {
	if (event.keyCode == 9) {
		event.preventDefault();
		inputTextArea.value += '    ';
	}
});

validateBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to validate, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'validate', inputTextArea.value);
});

correctBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'correct', inputTextArea.value);
});

minifyBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to minify, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'minify', inputTextArea.value);
});

convertToJSONBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to convert, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'convertToJSON', {
		data: inputTextArea.value,
		type: JSONTypeSelector.value,
	});
});

compressBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to compress, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'compress', inputTextArea.value);
});

decompressBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to decompress, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'decompress', outputConsole.value);
});

prettifyBtn.addEventListener('click', (e) => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to prettify, insert xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'prettify', inputTextArea.value);
});

graphBtn.addEventListener('click', () => {
	if (!inputTextArea.value) {
		ipcRenderer.send(
			'error',
			'There is no data to analyze in the graph, insert your xml data and try again.'
		);
		return;
	}
	ipcRenderer.send('command', 'gotoGraphWindow', inputTextArea.value);
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
