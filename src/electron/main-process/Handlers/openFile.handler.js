const {readFileElectron} = require('../../../utilities/readFile');
const {dialog} = require('electron');

function openFileHandler(event) {
	const { canceled, filePaths } = dialog.showOpenDialog({
		title: "Open XML file",
		filters: [{ name: 'Text files', extensions: ["xml"] }],
	});
	if (!canceled) {
		let lines = readFileElectron(filePaths[0]);
		const fileText = lines.join("\n");
        event.sender.send('openFileResponse', fileText)
	}
}

module.exports = openFileHandler;