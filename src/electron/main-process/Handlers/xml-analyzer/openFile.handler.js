const {readFileElectron} = require('../../../../utilities/readFile');
const {dialog} = require('electron');

async function openFileHandler(menuItem, browserWindow) {
	let dialogResult;

	if(menuItem.label === 'XML file'){
		dialogResult = await dialog.showOpenDialog({
			title: "Open XML file",
			filters: [{ name: 'XML', extensions: ["xml"] }],
		});
	} else if( menuItem.label === 'Compressed file'){
		dialogResult = await dialog.showOpenDialog({
			title: "Open compressed file",
			filters: [{ name: 'Compressed', extensions: ["tkf"] }],
		});
	}

	if (dialogResult.canceled) return;
	let lines = readFileElectron(dialogResult.filePaths[0]);
	const fileText = lines.join("\n");
	browserWindow.webContents.send('openFileResponse', fileText);
}

module.exports = openFileHandler;