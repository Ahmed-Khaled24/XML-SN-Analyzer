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

function getTagName(tag) {
	if (typeof tag === Object) tag = tag.tag;
	return tag.replace("<", "").replace(">", "").replace("/", "");
}

function getAllTags(lines) {
	let allTags = lines.map((line) => getXMLTags(line));
	allTags = allTags.map((line, index) => {
		return { line, lineNumber: index + 1 };
	});
	allTags = allTags.filter(({ line }) => line); // filter null lines
	allTags = allTags.map(({ line, lineNumber }) => {
		// extract line number and tag type for each tag
		return line.map((tag) => {
			return {
				tag,
				lineNumber,
				type: checkTagType(tag),
				matched: false,
				discovered: null,
			};
		});
	});
	allTags = allTags.flat();
	return allTags;
}

function getIndexOfFirstOpening(allTags) {
	for (let i = 0; i < allTags.length; i++) {
		if (allTags[i].type === "opening") {
			return i;
		}
	}
	return null;
}

function analyzeTags(allTags, startIndex) {
	allTags[startIndex].discovered = true;
	for (let i = startIndex + 1; i < allTags.length; i++) {
		let { tag, type, matched, discovered } = allTags[i];
		if (type === "opening" && !matched && !discovered) {
			analyzeTags(allTags, i);
		} else if (type === "closing" && !matched) {
			if (getTagName(tag) === getTagName(allTags[startIndex].tag)) {
				if (!matched && !allTags[startIndex].matched) {
					allTags[startIndex].matched = true;
					allTags[i].matched = true;
				}
			}
		}
	}
}

function getAnalysisFeedback(allTags) {
	let feedback = allTags.filter(({ matched }) => !matched);
	feedback = feedback.map(({ tag, lineNumber, type }) => {
		if (type === "opening") {
			return `Tag ${tag} in line ${lineNumber} has no proper closing tag`;
		} else if (type === "closing") {
			return `Tag ${tag} in line ${lineNumber} has no proper opening tag`;
		}
	});
	return feedback;
}

// returns feedback array contains all errors found;
async function validateXML(absolutePath) {
	const lines = await readFile(absolutePath);
	const allTags = getAllTags(lines);
	const indexOfFirstOpening = getIndexOfFirstOpening(allTags);
	if (indexOfFirstOpening != null) analyzeTags(allTags, indexOfFirstOpening);
	return getAnalysisFeedback(allTags);
}

module.exports = validateXML;