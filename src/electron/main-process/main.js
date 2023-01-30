const path = require('node:path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const openFileHandler = require('./Handlers/xml-analyzer/openFile.handler');
const validateHandler = require('./Handlers/xml-analyzer/validate.handler');
const correctHandler = require('./Handlers/xml-analyzer/correct.handler');
const minifyHandler = require('./Handlers/xml-analyzer/minify.handler');
const xmlToJSONHandler = require('./Handlers/xml-analyzer/xml-to-json.handler');
const compressionHandler = require('./Handlers/xml-analyzer/compression.handler');
const prettifyHandler = require('./Handlers/xml-analyzer/prettify.handler');
const decompressionHandler = require('./Handlers/xml-analyzer/decompression.handler');
const visualizationHandler = require('./Handlers/graph-analyzer/visualization.handler');
const getMostActiveUser = require('./Handlers/graph-analyzer/mostActiveUser.handler');
const mostInfluencerHandler = require('./Handlers/graph-analyzer/mostInfluencer.handler');
const gotoGraphHandler = require('./Handlers/graph-analyzer/gotoGraph.handler');


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
			mostInfluencerHandler(event, ALGraph);
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
		case 'gotoGraphWindow': {
			mainWindow.loadFile(
				path.join(
					__dirname,
					'../windows/graph-analyzer/graph-analyzer.html'
				)
			);
			ALGraph = gotoGraphHandler(data);
			break;
		}
	}
});

ipcMain.on('error', (event, err) => {
	dialog.showErrorBox('Very big error!', err);
})