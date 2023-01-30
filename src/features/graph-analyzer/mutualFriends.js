function getMutualFriends(outList, id1, id2) {
	const user1Friends = outList[id1];
	const user2Friends = outList[id2];

	// input validation
	if (!user1Friends) {
		throw new Error(`User with id ${id1} doesn't exist in the graph`);
	} else if (!user2Friends) {
		throw new Error(`User with id ${id2} doesn't exist in the graph`);
	}

	const mutualFriendsList = [];
	for (let friendOf1 of user1Friends) {
		for (let friendOf2 of user2Friends) {
			if (friendOf1 == friendOf2) {
				mutualFriendsList.push(friendOf1);
			}
		}
	}

	return mutualFriendsList;
}

module.exports = getMutualFriends;