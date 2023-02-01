const { ipcRenderer, autoUpdater } = require('electron');
const zoomInBtn = document.querySelector('#zoomIn-btn');
const zoomOutBtn = document.querySelector('#zoomOut-btn');
const resizeBtn = document.querySelector('#resize-btn');
const graphContainer = document.querySelector('#graph-container')
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
		outputConsole.value = 'Error: search term input is empty';
		return;
	}
	if(searchArea.value.trim() ==""){
		outputConsole.value = "No such post exists"
		return;
	}
	ipcRenderer.send('command', 'searchPosts' , searchArea.value.trim() );
	ipcRenderer.on('searchPostsResponse' ,(event , data)=>{
		console.log(data);
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


// Visualization occurs once page is loaded


document.addEventListener('DOMContentLoaded', () => {
	ipcRenderer.send('command', 'visualize');
	ipcRenderer.on('visualizeRes', (event, graphData) => {
		graphData = JSON.parse(graphData);
		cyto = cytoscape({
			container: graphContainer,
			elements: graphData,
			style: [
				{
					selector: '#graph-container',
					style: {
						height: '100vh !important',
						width: '100vw !important'
					  }
				},
			  {
				selector: 'node',
				style: {
				  'background-color': '#e9ecef',
				  label: 'data(label)',
				  'text-valign': 'center',
				  'text-halign': 'center'
				}
			  },
			  {
				selector: 'edge',
				style: {
				  'line-color': '#fcc419',
				  'curve-style': 'bezier',
				  'target-arrow-color': 'black',
				  'target-arrow-fill': 'filled',
				  'target-arrow-shape': 'triangle',
				  'target-arrow-size': 40
				}
			  },
			],
			layout: {
				name: 'cose-bilkent',		  
			  // idealEdgeLength:100
			}
		  });
	});

});


zoomInBtn.addEventListener('click' , ()=>{
	cyto.zoom({
		level: cyto.zoom() * 1.5,
		position: { x: graphContainer.offsetWidth / 2, y: graphContainer.offsetHeight / 2  }
	});	

})
zoomOutBtn.addEventListener('click' , ()=>{
	cyto.zoom({
		level: cyto.zoom() / 1.5,
		position: { x: graphContainer.offsetWidth / 2, y: graphContainer.offsetHeight / 2  }
	});	
	
})
resizeBtn.addEventListener('click',(e)=>{
	cyto.layout({name:'cose-bilkent'}).run();
	// cyto.resize();
	// cyto.fit();
})

window.addEventListener('resize',  ()=> {
	container = cyto.container().children[0]
	container.style.width = "100%"
	container.style.height="100%"
  });
  