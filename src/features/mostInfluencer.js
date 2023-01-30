module.exports = function getMostInfluencer({ inList }) {
	let mostInfluencer = null;
	let maxFollowers = 0;
	for (let user in inList) {
		let curUserFollowers = inList[user].length;
		if (curUserFollowers >= maxFollowers) {
			mostInfluencer = user;
			maxFollowers = curUserFollowers;
		}
	}
	return mostInfluencer !== null
		? mostInfluencer
		: 'There is no users in the given data';
};
