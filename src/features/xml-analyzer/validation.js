const readFile = require("../../utilities/readFile");
const Stack = require("stack-lifo");

function isTag(word) {
	const regex = /<.*?>/;
	return regex.test(word);
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

function getTagName(word) {
	if (typeof word === "object") word = word.word;
	return word.replace("<", "").replace(">", "").replace("/", "");
}

function getLineAsWords(line) {
	const openingTagRegex = /^<[a-zA-Z0-9]*>/; // opening tag if at the beginning of the line
	const closingTagRegex = /^<\/[a-zA-Z0-9]*>/; // closing tag if at the beginning of the line
	let words = [];
	line = line.trim();
	while (line) {
		// extract opening tag
		let openTag = line.match(openingTagRegex);
		if (openTag) {
			words.push(openTag[0]);
			line = line.replace(openTag[0], "");
		}
		//extract the next data
		for (let i = 0; i <= line.length; i++) {
			if (line && (i === line.length || line[i] === "<")) {
				let data = line.substring(0, i);
				if (data) {
					words.push(data.trim());
					line = line.replace(data, "");
				}
				break;
			}
		}
		// extract closing tag
		let closeTag = line.match(closingTagRegex);
		if (closeTag) {
			words.push(closeTag[0]);
			line = line.replace(closeTag[0], "");
		}
	}
	return words;
}

function analyzeIfLeaf(allWords) {
	return allWords.map((word, index) => {
		if (word.type !== "opening") return word;

		let line_number_for_last_string_child = -1;
		for (let i = index + 1; i < allWords.length; i++) {
			let curWord = allWords[i];
			if (!curWord.isTag) {
				line_number_for_last_string_child = curWord.lineNumber;
			} else {
				break;
			}
		}

		// If has a string child so, it is a leaf
		if (line_number_for_last_string_child !== -1) {
			return {
				...word,
				isLeaf: true,
				closingTagPos: line_number_for_last_string_child - 1,
			};
		} else {
			return {
				...word,
				isLeaf: false,
			};
		}
	});
}

function getAllWords(lines) {
	let allWords = lines.map((line) => getLineAsWords(line));
	allWords = allWords.map((line, index) => {
		return { line, lineNumber: index + 1 };
	});
	allWords = allWords.map(({ line, lineNumber }) => {
		return line.map((word) => {
			return {
				word,
				lineNumber,
				isTag: isTag(word),
				type: isTag(word) ? checkTagType(word) : "string",
			};
		});
	});
	allWords = allWords.flat();

	return analyzeIfLeaf(allWords);
}

function analyzeAndCorrectXML(allWords, lines, correctXML) {
	const stack = new Stack();
	const feedback = [];

	for (let wordObj of allWords) {
		if (!wordObj.isTag) continue;
		if (wordObj.type === "opening") {
			if (!stack.isEmpty()) {
				const stackTop = stack.peek();
				if (stackTop.isLeaf) {
					if (correctXML)
						lines[stackTop.closingTagPos] += ` </${getTagName(stackTop.word)}>`;
					feedback.push(
						`${stackTop.word} in line ${stackTop.lineNumber} has no corresponding closing tag`
					);
					stack.pop();
				}
			}
			stack.push(wordObj);
		} else {
			if (stack.isEmpty()) {
				if (correctXML) lines.unshift(wordObj.word.replace("/", ""));
				feedback.push(
					`${wordObj.word} in line ${wordObj.lineNumber} has no corresponding opening tag`
				);
				continue;
			}
			const stackTop = stack.peek();
			if (getTagName(stackTop) !== getTagName(wordObj)) {
				let lineIndex = wordObj.lineNumber - 1;
				if (correctXML) {
					lines[lineIndex] = lines[lineIndex].replace(
						getTagName(wordObj),
						getTagName(stackTop)
					);
				}
				feedback.push(
					`${stackTop.word} in line number ${stackTop.lineNumber} ` +
						`mismatch with closing tag ${wordObj.word} in line number ${wordObj.lineNumber}`
				);
			}
			stack.pop();
		}
	}
	while (!stack.isEmpty()) {
		let stackTop = stack.peek();
		stack.pop();
		if (correctXML) lines.push(`</${getTagName(stackTop.word)}>`);
		feedback.push(
			`${stackTop.word} in line number ${stackTop.lineNumber} has no corresponding closing tag`
		);
	}
	return feedback;
}

function validateXML(lines, correctXML) {
	const allWords = getAllWords(lines);
	const feedback = analyzeAndCorrectXML(allWords, lines, correctXML);
	return {
		feedback,
		lines,
		valid: (feedback.length == 0),
	};
}

module.exports = validateXML;
