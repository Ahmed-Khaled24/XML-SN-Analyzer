const readFile = require("../utilities/readFile");
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

function getAllWords(lines) {
	let allWords = lines.map((line) => line.split(" "));
	allWords = allWords.map((line) => line.filter((word) => word !== ""));
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
	allWords = allWords.map((word, index) => {
		if (!word.isTag) return word;
		let line_number_for_last_string_child = -1;
		for (let i = index + 1; i < allWords.length; i++) {
			let curWord = allWords[i];
			if (curWord.isTag) {
				break;
			} else {
				line_number_for_last_string_child = curWord.lineNumber;
			}
		}

		if (line_number_for_last_string_child !== -1) {
			return {
				...word,
				isLeaf: true,
				closingTagPos: line_number_for_last_string_child - 1,
			};
		} else {
			return { ...word, isLeaf: false };
		}	
	});
	return allWords;
}

function correctXML(allWords, lines) {
	const stack = new Stack();
	for (let word of allWords) {
		if (!word.isTag) continue;
			
		if (word.type === "opening") {
			if(!stack.isEmpty()) {
				const stackTop = stack.peek();
				if(stackTop.isLeaf){
					lines[stackTop.closingTagPos] += ` </${getTagName(stackTop.word)}>`;
					stack.pop();
				}
			}
			stack.push(word);
		} else {
			if (stack.isEmpty()) {
				lines.unshift(word.tag.replace("/", ""));
				continue;	
			} 
			const stackTop = stack.peek();
			if (getTagName(stackTop) !== getTagName(word)) {
				let lineIndex = word.lineNumber - 1;
				lines[lineIndex] = lines[lineIndex].replace(
					getTagName(word),
					getTagName(stackTop)
				);
			}
			stack.pop();
		}
	}
	while (!stack.isEmpty()) {
		let stackTop = stack.peek();
		stack.pop();
		lines.push(`</${getTagName(stackTop.word)}>`);
	}
}

// returns feedback array contains all errors found;
async function validateXML(absolutePath) {
	const lines = await readFile(absolutePath);
	const allWords = getAllWords(lines);
	correctXML(allWords, lines);
	return lines;
}

module.exports = validateXML;