module.exports = function formatGraph(graphOutList) {
	let nodes = [];
	let edges = [];

	Object.keys(graphOutList).forEach((userID) => {
		// Generate nodes
		nodes.push({data: {id: userID, label: userID}});
		// Generate edges
		graphOutList[userID].forEach((followee) => {
			edges.push({data: {source: userID, target: followee}});
		});
	});



	return { nodes, edges };
};
