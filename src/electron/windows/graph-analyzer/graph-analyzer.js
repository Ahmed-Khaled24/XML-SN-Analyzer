const { ipcRenderer } = require('electron');
const outputConsole = document.querySelector('.output-console textarea');
const mostActiveBtn = document.querySelector('.most-active');
const mostInfluencerBtn = document.querySelector('.most-influencer');
const suggestBtn = document.querySelector('.suggest-friends button');

document.querySelector('.xml-btn').addEventListener('click', () => {
	ipcRenderer.send('command', 'gotoXMLAnalyzer');
});

mostInfluencerBtn.addEventListener('click', () => {
	ipcRenderer.send('command', 'getMostInfluencer');
	ipcRenderer.on('mostInfluencerRes', (event, mostInfluencer) => {
		outputConsole.value = `The most influencer is ${mostInfluencer}`;
	});
});

mostActiveBtn.addEventListener('click', (e) => {
	ipcRenderer.send('command', 'mostActiveUser');
	ipcRenderer.on('mostActiveUserResponse', (event, mostActiveUser) => {
		outputConsole.value = `The most active user is ${mostActiveUser}`;
	});
});

suggestBtn.addEventListener('click', () => {
	const userId = document.querySelector('.suggest-friends input').value;
	if(!userId) return;
	ipcRenderer.send('command', 'suggestFriends', userId);
	ipcRenderer.on('suggestFriendsRes', (event, suggestResponse) => {
		outputConsole.value = suggestResponse;
	})
})

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
