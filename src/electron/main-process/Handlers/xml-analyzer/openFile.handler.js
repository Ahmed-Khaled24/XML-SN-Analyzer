const {readFile} = require('../../../../utilities/readFile');
const { huffManDecompress } = require('../../../../features/xml-analyzer/compression');
const prettify = require('../../../../features/xml-analyzer/prettify');
const { dialog } = require('electron');

async function openFileHandler(menuItem, browserWindow) {
	let dialogResult;

	if (browserWindow.title === 'Graph Analyzer') {
		dialog.showErrorBox(
			'Invalid operation',
			'Can not open file in this window'
		);
		return;
	}

	if (menuItem.label === 'XML file') {
		dialogResult = await dialog.showOpenDialog({
			title: 'Open XML file',
			filters: [{ name: 'XML', extensions: ['xml'] }],
		});
	} else if (menuItem.label === 'Compressed file') {
		dialogResult = await dialog.showOpenDialog({
			title: 'Open compressed file',
			filters: [{ name: 'Compressed', extensions: ['tkf'] }],
		});
	}

	if (dialogResult.canceled) return;

	let lines = readFile(dialogResult.filePaths[0]);
	let fileText = lines.join('\n');
	if (menuItem.label === 'Compressed file') {
		try {
			fileText = huffManDecompress(fileText);
			fileText = prettify(fileText).join('\n');
		} catch (err) {
			dialog.showErrorBox('Error', err.message);
			return;
		}
	}
	browserWindow.webContents.send('openFileResponse', fileText);
}

module.exports = openFileHandler;
