const {readFileElectron} = require('../../../utilities/readFile');
const {dialog} = require('electron');

async function openFileHandler(menuItem, browserWindow) {
	const { canceled, filePaths } = await dialog.showOpenDialog({
		title: "Open XML file",
		filters: [{ name: 'Text files', extensions: ["xml"] }],
	});
	if (!canceled) {
		let lines = readFileElectron(filePaths[0]);
		const fileText = lines.join("\n");
        browserWindow.webContents.send('openFileResponse', fileText);
	}
}

module.exports = openFileHandler;