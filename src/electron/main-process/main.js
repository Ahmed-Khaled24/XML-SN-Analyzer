const path = require('node:path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const openFileHandler = require('./Handlers/openFile.handler');
const validateHandler = require('./Handlers/validate.handler');
const correctHandler = require('./Handlers/correct.handler');
const minifyHandler = require('./Handlers/minify.handler');
const xmlToJSONHandler = require('./Handlers/xml-to-json.handler');
const compressionHandler = require('./Handlers/compression.handler');
const prettifyHandler = require('./Handlers/prettify.handler');
const decompressionHandler = require('./Handlers/decompression.handler');
const visualizationHandler = require('./Handlers/visualization.handler');
const getMostActiveUser = require('./Handlers/mostActiveUser.handler');
const CreateGraphAdjList = require('../../features/json-to-graph');
const prettify = require('../../features/prettify');
const convertToJSON = require('../../features/xml-to-json');
const getMostInfluencer = require('../../features/mostInfluencer');

let ALGraph = null;
let mainWindow = null;
Menu.setApplicationMenu(
	Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Open',
					click: openFileHandler,
					accelerator: 'CommandOrControl+O',
				},
			],
		},
	])
);

app.on('ready', () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 800,
		minHeight: 600,
		backgroundColor: '#212529',
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
		show: false,
	});
	mainWindow.openDevTools();
	mainWindow.loadFile(
		path.join(__dirname, '../windows/xml-analyzer/xml-analyzer.html')
	);
	mainWindow.on('ready-to-show', () => {
		mainWindow.show();
		mainWindow.webContents.openDevTools();
	});
});

ipcMain.on('command', async (event, command, data) => {
	switch (command) {
		case 'openFile': {
			await openFileHandler(event);
			break;
		}
		case 'validate': {
			validateHandler(event, data);
			break;
		}
		case 'correct': {
			correctHandler(event, data);
			break;
		}
		case 'minify': {
			minifyHandler(event, data);
			break;
		}
		case 'convertToJSON': {
			xmlToJSONHandler(event, data);
			break;
		}
		case 'compress': {
			compressionHandler(event, data);
			break;
		}
		case 'prettify': {
			prettifyHandler(event, data);
			break;
		}
		case 'decompress': {
			decompressionHandler(event, data);
			break;
		}
		case 'gotoGraphWindow': {
			mainWindow.loadFile(
				path.join(
					__dirname,
					'../windows/graph-analyzer/graph-analyzer.html'
				)
			);
			ALGraph = CreateGraphAdjList(
				convertToJSON(prettify(data), { compact: true, spacing: 3 })
			);
			break;
		}
		case 'gotoXMLAnalyzer': {
			mainWindow.loadFile(
				path.join(
					__dirname,
					'../windows/xml-analyzer/xml-analyzer.html'
				)
			);
			break;
		}
		case 'getMostInfluencer': {
			let mostInfluencer = getMostInfluencer(ALGraph);
			event.sender.send('mostInfluencerRes', mostInfluencer);
			break;
		}
		case 'visualize': {
			visualizationHandler(event, ALGraph.outList);
			break;
		}
		case 'mostActiveUser': {
			getMostActiveUser(event, ALGraph);
			break;
		}
	}
});

ipcMain.on('error', (event, err) => {
	dialog.showErrorBox('Very big error!', err);
})