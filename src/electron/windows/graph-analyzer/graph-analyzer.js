const { ipcRenderer, autoUpdater } = require('electron');
const zoomInBtn = document.querySelector('#zoomIn-btn');
const zoomOutBtn = document.querySelector('#zoomOut-btn');
const resizeBtn = document.querySelector('#resize-btn');
const graphContainer = document.querySelector('#graph-container');
const outputConsole = document.querySelector('.output-console textarea');
const mostActiveBtn = document.querySelector('.most-active');
const searchPostBtn = document.querySelector('.searchPost-btn');
const searchArea = document.querySelector('.search-term');
const mostInfluencerBtn = document.querySelector('.most-influencer');
const suggestBtn = document.querySelector('.suggest-friends button');
const mutualFriendsBtn = document.querySelector('.mutual-friends button');
// Visualization global variable
let cyto;

document.querySelector('.xml-btn').addEventListener('click', () => {
	ipcRenderer.send('command', 'gotoXMLAnalyzer');
});
mostInfluencerBtn.addEventListener('click', () => {
	ipcRenderer.send('command', 'getMostInfluencer');
});
mostActiveBtn.addEventListener('click', (e) => {
	ipcRenderer.send('command', 'mostActiveUser');
});
searchPostBtn.addEventListener('click', (e) => {
	if (!searchArea.value) {
		outputConsole.value = 'Error: search term input is empty';
		return;
	}
	if (searchArea.value.trim() == '') {
		outputConsole.value = 'No such post exists';
		return;
	}
	ipcRenderer.send('command', 'searchPosts', searchArea.value.trim());
});
suggestBtn.addEventListener('click', () => {
	const userId = document.querySelector('.suggest-friends input').value;
	if (!userId) return;
	ipcRenderer.send('command', 'suggestFriends', userId);
});
mutualFriendsBtn.addEventListener('click', () => {
	const id1 = document.querySelector('.first-id').value;
	const id2 = document.querySelector('.second-id').value;
	if (!id1 || !id2) return;
	ipcRenderer.send('command', 'getMutualFriends', [id1, id2]);
});

// Visualization occurs once page is loaded
document.addEventListener('DOMContentLoaded', (e) => {
	ipcRenderer.send('command', 'visualize');
});
zoomInBtn.addEventListener('click', (e) => {
	cyto.zoom({
		level: cyto.zoom() * 1.5,
		position: {
			x: graphContainer.offsetWidth / 2,
			y: graphContainer.offsetHeight / 2,
		},
	});
});
zoomOutBtn.addEventListener('click', (e) => {
	cyto.zoom({
		level: cyto.zoom() / 1.5,
		position: {
			x: graphContainer.offsetWidth / 2,
			y: graphContainer.offsetHeight / 2,
		},
	});
});
resizeBtn.addEventListener('click', (e) => {
	cyto.layout({ name: 'cose-bilkent' }).run();
});
window.addEventListener('resize', (e) => {
	container = cyto.container().children[0];
	container.style.width = '100%';
	container.style.height = '100%';
	cyto.resize();
	cyto.fit();
});

// Listeners
ipcRenderer.on('visualizeRes', (event, graphData) => {
	try {
		graphData = JSON.parse(graphData);
		cyto = cytoscape({
			container: graphContainer,
			elements: graphData,
			style: [
				{
					selector: '#graph-container',
					style: {
						height: '100vh !important',
						width: '100vw !important',
					},
				},
				{
					selector: 'node',
					style: {
						'background-color': '#e9ecef',
						label: 'data(label)',
						'text-valign': 'center',
						'text-halign': 'center',
					},
				},
				{
					selector: 'edge',
					style: {
						'label':'follows',
						'text-rotation': 'autorotate',
						'text-valign': 'center',
						'text-halign': 'center',
						'text-background-opacity': 0,
						'text-background-color': '#ffffff',
						'font-size': '0.4em',
						'color': '#e9ecef',
						'line-color': '#fcc419',
						'curve-style': 'bezier',
						'target-arrow-color': 'black',
						'target-arrow-fill': 'filled',
						'target-arrow-shape': 'triangle',
						'target-arrow-size': 40,
						'text-margin-y': 7

					},
				},
			],
			layout: {
				name: 'cose-bilkent',
			},
		});
	} catch (err) {
		sendErrorWithLink(
			`Invalid Social Network Data
		fix the data then try again`,
			'https://github.com/Ahmed-Khaled24/XML-SN-Analyzer/tree/electron#remarks' 
		);
	}
});
ipcRenderer.on('mostInfluencerRes', (event, mostInfluencer) => {
	outputConsole.value = `The most influencer is ${mostInfluencer}`;
});
ipcRenderer.on('mostActiveUserResponse', (event, mostActiveUser) => {
	outputConsole.value = `The most active user is ${mostActiveUser}`;
});
ipcRenderer.on('searchPostsResponse', (event, data) => {
	outputConsole.value = data;
});
ipcRenderer.on('suggestFriendsRes', (event, suggestResponse) => {
	outputConsole.value = suggestResponse;
});
ipcRenderer.on('mutualFriendsRes', (event, mutualResponse) => {
	outputConsole.value = mutualResponse;
});


function sendErrorWithLink(error, link) {
	ipcRenderer.send('errorWithLink', error, link);
}