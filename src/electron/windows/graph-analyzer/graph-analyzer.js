const { ipcRenderer } = require('electron');
const outputConsole = document.querySelector('.output-console textarea');
const mostActiveBtn = document.querySelector('.most-active');
const mostInfluencerBtn = document.querySelector('.most-influencer');

document.querySelector('.xml-btn').addEventListener('click', () => {
	ipcRenderer.send('command', 'gotoXMLAnalyzer');
});

mostInfluencerBtn.addEventListener('click', () => {
	ipcRenderer.send('command', 'getMostInfluencer');
	ipcRenderer.on('mostInfluencerRes', (event, mostInfluencer) => {
		outputConsole.value = mostInfluencer;
	});
});

mostActiveBtn.addEventListener('click', (e) => {
	const xml = localStorage.getItem('textFieldValue');
	ipcRenderer.send('command', 'mostActiveUser', xml);
	ipcRenderer.on('mostActiveUserResponse', (event, data) => {
		outputConsole.value = data;
	});
});

document.addEventListener('DOMContentLoaded', () => {
	const xml = localStorage.getItem('textFieldValue');
	const s = new sigma({
		renderer: {
			container: 'graph-container',
			type: 'canvas',
		},
		settings: {
			defaultNodeColor: '#FFF',
			maxNodeSize: 20,
			minArrowSize: 15,
			defaultEdgeColor: '#FFF',
			edgeColor: 'default',
		},
	});
	ipcRenderer.send('command', 'visualize', xml);
	ipcRenderer.on('visualizeRes', (event, data) => {
		data = JSON.parse(data);
		s.graph.read(data);
		s.refresh();
	});
});
