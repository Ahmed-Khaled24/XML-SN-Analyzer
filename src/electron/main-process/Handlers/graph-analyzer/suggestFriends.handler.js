const { dialog } = require('electron');

function suggestFriends(event, outList, userId) {
	let x = 0;
	let p = [];
	let user = outList[userId];
	if (!user) {
		event.sender.send('suggestFriendsRes', `The given user doesn't exist.`);
		return;
	}

	for (let i = 0; i < outList[userId].length; i++) {
		for (let j = 0; j < outList[outList[userId][i]].length; j++) {
			if (
				(outList[outList[userId][i]][j] != userId) &
				~user.includes(outList[outList[userId][i]][j])
			) {
				p.push(outList[outList[userId][i]][j]);
				x++;
			}
		}
	}
	if (x == 0) {
		event.sender.send(
			'suggestFriendsRes',
			`Can not suggest friends for the given user`
		);
	} else {
		event.sender.send('suggestFriendsRes', `The suggested list is ${p}`);
	}
}

module.exports = suggestFriends;
