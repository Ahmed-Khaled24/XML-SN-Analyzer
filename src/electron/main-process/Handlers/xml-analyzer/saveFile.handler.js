const { dialog, ipcMain } = require('electron');
const saveFile = require('../../../../utilities/saveFile');

function saveFileHandler(menuItem, browserWindow) {
	if (browserWindow.title === 'Graph Analyzer') {
		dialog.showErrorBox(
			'Invalid operation',
			'This window can not be saved'
		);
		return;
	}
	browserWindow.webContents.send('giveMeYourData');
}

ipcMain.on('hereIsMyData', (event, data) => {
	const path = dialog.showSaveDialogSync({
		filters: [
			{ name: 'TKF', extensions: ['tkf'] },
			{ name: 'JSON', extensions: ['json'] },
		],
	});
	if(!path) return;
	saveFile(data, path);
});

module.exports = saveFileHandler;
