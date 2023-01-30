const { ipcRenderer } = require('electron');
const outputConsole = document.querySelector('.output-console textarea');
const mostActiveBtn = document.querySelector('.most-active');
const searchPostBtn = document.querySelector('.searchPost-btn');
const searchArea = document.querySelector('.search-term');
const mostInfluencerBtn = document.querySelector('.most-influencer');
const suggestBtn = document.querySelector('.suggest-friends button');
const mutualFriendsBtn = document.querySelector('.mutual-friends button');

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

searchPostBtn.addEventListener('click' , (e)=>{
	if(!searchArea.value) {
		ipcRenderer.send('error' , 'Search term is empty');
		return;
	}
	ipcRenderer.send('command', 'searchPosts' , searchArea.value );
	ipcRenderer.on('searchPostsResponse' ,(event , data)=>{
		outputConsole.value = data;
	})


})

suggestBtn.addEventListener('click', () => {
	const userId = document.querySelector('.suggest-friends input').value;
	if (!userId) return;
	ipcRenderer.send('command', 'suggestFriends', userId);
	ipcRenderer.on('suggestFriendsRes', (event, suggestResponse) => {
		outputConsole.value = suggestResponse;
	});
});

mutualFriendsBtn.addEventListener('click', () => {
	const id1 = document.querySelector('.first-id').value;
	const id2 = document.querySelector('.second-id').value;
	if (!id1 || !id2) return;
	ipcRenderer.send('command', 'getMutualFriends', [id1, id2]);
	ipcRenderer.on('mutualFriendsRes', (event, mutualResponse) => {
		outputConsole.value = mutualResponse;
	})	
});

document.addEventListener('DOMContentLoaded', () => {
	
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
	ipcRenderer.send('command', 'visualize');
	ipcRenderer.on('visualizeRes', (event, data) => {
		data = JSON.parse(data);
		s.graph.read(data);
		s.refresh();
	});
});
