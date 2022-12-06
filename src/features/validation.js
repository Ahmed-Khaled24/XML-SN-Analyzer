const path = require("node:path");
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
	allTags = allTags.map((line, lineIndex) => {
		return line.map((tag) => {
			return {
				tag,
				lineNumber: lineIndex + 1,
			};
		});
	});
	allTags = allTags.flat();
	allTags = allTags.map((tagObj) => {
		return {
			...tagObj,
			type: checkTagType(tagObj.tag),
			matched: false,
		};
	});
	return allTags;
}

function analyzeTags(allTags) {
	for (let outer = 0; outer < allTags.length; outer++) {
		const outerTag = allTags[outer];
		for (let inner = outer + 1; inner < allTags.length; inner++) {
			const innerTag = allTags[inner];
			// check if both are opening tags.
			if (outerTag.type === "opening" && innerTag.type === "opening") {
				// if both have the same name then the first don't has corresponding closing tag.
				if (getTagName(outerTag) === getTagName(innerTag)) {
					// move to the next tag.
					break;
				}
			}
			// if one opening and the other closing.
			else if (outerTag.type === "opening" && innerTag.type === "closing") {
				// if both have the same name.
				if (getTagName(outerTag) === getTagName(innerTag)) {
					// if the closing hasn't matched before.
					if (!innerTag.matched) {
						// match both.
						outerTag.matched = true;
						innerTag.matched = true;
						break;
					}
				}
			}
		}
	}
}

function getAnalysisFeedback(allTags) {
	const filteredTags = allTags.filter(({ tag, matched }) => tag && !matched);
	let feedback = [];
	for (let index = 0; index < filteredTags.length; index++) {
		const { tag, type, lineNumber } = filteredTags[index];
		if (index + 1 < filteredTags.length) {
			const nextTag = filteredTags[index + 1];
			if (type === "opening" && nextTag.type === "closing") {
				feedback.push(
					`Error: tag ${tag} in line number ${lineNumber} doesn't match tag ${nextTag.tag} in ${lineNumber === nextTag.lineNumber ? "the same line" : `line number ${nextTag.lineNumber}`}.`
				);
				index++;
			}
		} else if (type === "opening") {
			feedback.push(`Error: tag ${tag} in line number ${lineNumber} has no corresponding closing tag.`);
		} else if (type === "closing") {
			feedback.push(`Error: tag ${tag} in line number ${lineNumber} has no corresponding opening tag.`);
		}
	}
	return feedback;
}

// returns feedback array contains all errors found;
async function validateXML(relativePath) {
	const lines = await readFile(path.join(__dirname, relativePath));
	const allTags = getAllTags(lines);
	analyzeTags(allTags);
	return getAnalysisFeedback(allTags);
}

// test
(async () => {
	let feedback = await validateXML("../../test.xml");
	console.log(`${feedback.length} error(s) found.`);
	feedback.forEach((error) => console.log(error));
})();