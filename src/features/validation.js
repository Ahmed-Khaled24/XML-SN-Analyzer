const path = require("node:path");
const Stack = require("stack-lifo");
const readFile = require("../utilities/readFile");

// Contains objects {XMLTag, lineNumberA}
const stack = new Stack();

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

function match(closingTag, lineNumber) {
    if (stack.isEmpty()) {
        return {
            status: "failure",
			message: `Error: ${closingTag} in line "${lineNumber}" has no corresponding opening tag`,
		};
	} else if (stack.peek().XMLTag !== closingTag.replace("/", "")) {
        return {
            status: "failure",
			message: `Error: Either ${closingTag} in line ${lineNumber} has no corresponding opening tag, or ${stack.peek().XMLTag} in line ${stack.peek().lineNumber} has no corresponding closing tag`,
		};
	} else if (stack.peek().XMLTag === closingTag.replace("/", "")){
        stack.pop();
        return {
            status: "success",
        };
    }
}

async function main() {
	let errorFound = false;
	const lines = await readFile(path.join(__dirname, "../../sample.xml"));

	for (let i = 0; i < lines.length; i++) {
		if (errorFound) break;
		const XMLTags = getXMLTags(lines[i]);

		if (!XMLTags) continue;
		let lineNumber = i + 1;
		for (let XMLTag of XMLTags) {
			const tagType = checkTagType(XMLTag);
			if (tagType == "opening") {
				stack.push({ XMLTag, lineNumber });
			} else if (tagType == "closing") {
				const { status, message, fixHint } = match(XMLTag, lineNumber);
				if (status == "failure") {
					errorFound = true;
					console.log(message);
				}
			}
		}
	}
	if (!errorFound) console.log("Successfully validated");
}

main();