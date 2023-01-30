const getMutualFriends = require('../../../../features/graph-analyzer/mutualFriends');

function mutualFriendsHandler(event, outList, [id1, id2]) {
	try {
		const mutualFriendsList = getMutualFriends(outList, id1, id2);
		event.sender.send(
			'mutualFriendsRes',
			mutualFriendsList.length
				? `List of mutual friends is ${mutualFriendsList}`
				: `No mutual friends found for the given two users.`
		);
	} catch (err) {
		event.sender.send('mutualFriendsRes', err.message);
	}
}

module.exports = mutualFriendsHandler;
