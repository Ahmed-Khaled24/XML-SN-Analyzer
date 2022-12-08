const readFile = require("../utilities/readFile");

function getXMLTags(fileLine) {
	const regex = /<.*?>/g;
	return fileLine.match(regex);
}

function checkTagType(tag) {
	const openingTagRegex = /<[^/].*?>/g;
	const closingTagRegex = /<\/.*?>/g;
	if (openingTagRegex.test(tag)) {
		return "opening";
	} else if (closingTagRegex.test(tag)) {
		return "closing";
	}
}

function getTagName({ tag }) {
	return tag.replace("<", "").replace(">", "").replace("/", "");
}

function getAllTags(lines) {
	let allTags = lines.map((line) => getXMLTags(line));
	allTags = allTags.filter(line => line); 		// filter null lines
	allTags = allTags.map((line, lineIndex) => {	// extract line number and tag type for each tag
		return line.map((tag) => {
			return {
				tag,
				lineNumber: lineIndex + 1,
				type: checkTagType(tag),
				matched: false
			};
		});
	});
	allTags = allTags.flat();
	return allTags;
}

function analyzeTags(allTags) {
	for (let outer = 0; outer < allTags.length; outer++) {
		const outerTag = allTags[outer];
		for (let inner = outer + 1; inner < allTags.length; inner++) {
			const innerTag = allTags[inner];
			if (outerTag.type === "opening") {
				if (innerTag.type === "opening") {
					if (getTagName(outerTag) === getTagName(innerTag)) {
						// outer don't has corresponding closing tag.
						break;
					}
				} else if (innerTag.type === "closing") {
					if (getTagName(outerTag) === getTagName(innerTag)) {
						// if the closing hasn't matched before.
						if (!innerTag.matched) {
							outerTag.matched = true;
							innerTag.matched = true;
							break;
						}
					}
				}
			}
		}
	}
}

function getAnalysisFeedback(allTags) {
	let feedback = [];
	const filteredTags = allTags.filter(({ tag, matched }) => tag && !matched);

	for (let index = 0; index < filteredTags.length; index++) {
		const { tag, type, lineNumber } = filteredTags[index];

		if (index + 1 < filteredTags.length) {
			const nextTag = filteredTags[index + 1];
			if (type === "opening" && nextTag.type === "closing") {
				feedback.push(
					`Error: tag ${tag} in line number ${lineNumber} doesn't match tag ${nextTag.tag} ` +
					`in ${ lineNumber === nextTag.lineNumber ? "the same line" : `line number ${nextTag.lineNumber}`}.`
				);
				index++;
				continue;
			}
		}

		if (type === "opening") {
			feedback.push(`Error: tag ${tag} in line number ${lineNumber} has no corresponding closing tag.`);
		}

		if (type === "closing") {
			feedback.push(`Error: tag ${tag} in line number ${lineNumber} has no corresponding opening tag.`);
		}

	}
	return feedback;
}

// returns feedback array contains all errors found;
async function validateXML(absolutePath) {
	const lines = await readFile(absolutePath);
	const allTags = getAllTags(lines);
	analyzeTags(allTags);
	return getAnalysisFeedback(allTags);
}

module.exports = validateXML;