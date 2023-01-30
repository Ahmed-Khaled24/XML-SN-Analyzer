const path = require('node:path');
const { app, BrowserWindow, ipcMain, Menu, dialog } = require('electron');
const handlers = {
	xml: {
		openFile: require('./Handlers/xml-analyzer/openFile.handler'),
		validate: require('./Handlers/xml-analyzer/validate.handler'),
		correct: require('./Handlers/xml-analyzer/correct.handler'),
		minify: require('./Handlers/xml-analyzer/minify.handler'),
		xmlToJSON: require('./Handlers/xml-analyzer/xml-to-json.handler'),
		compress: require('./Handlers/xml-analyzer/compression.handler'),
		decompress: require('./Handlers/xml-analyzer/decompression.handler'),
		prettify: require('./Handlers/xml-analyzer/prettify.handler'),
	} ,
	graph: {
		gotoGraph: require('./Handlers/graph-analyzer/gotoGraph.handler'),
		visualize: require('./Handlers/graph-analyzer/visualization.handler'),
		mostActiveUser: require('./Handlers/graph-analyzer/mostActiveUser.handler'),
		mostInfluencer: require('./Handlers/graph-analyzer/mostInfluencer.handler'),
	}
}

let ALGraph = null;
let mainWindow = null;
Menu.setApplicationMenu(
	Menu.buildFromTemplate([
		{
			label: 'File',
			submenu: [
				{
					label: 'Open',
					click: handlers.xml.openFile,
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
			await handlers.xml.openFile(event);
			break;
		}
		case 'validate': {
			handlers.xml.validate(event, data);
			break;
		}
		case 'correct': {
			handlers.xml.correct(event, data);
			break;
		}
		case 'minify': {
			handlers.xml.minify(event, data);
			break;
		}
		case 'convertToJSON': {
			handlers.xml.xmlToJSON(event, data);
			break;
		}
		case 'compress': {
			handlers.xml.compress(event, data);
			break;
		}
		case 'prettify': {
			handlers.xml.prettify(event, data);
			break;
		}
		case 'decompress': {
			handlers.xml.decompress(event, data);
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
			handlers.graph.mostInfluencer(event, ALGraph);
			break;
		}
		case 'visualize': {
			handlers.graph.visualize(event, ALGraph.outList);
			break;
		}
		case 'mostActiveUser': {
			handlers.graph.mostActiveUser(event, ALGraph);
			break;
		}
		case 'gotoGraphWindow': {
			mainWindow.loadFile(
				path.join(
					__dirname,
					'../windows/graph-analyzer/graph-analyzer.html'
				)
			);
			ALGraph = handlers.graph.gotoGraph(data);
			break;
		}
	}
});

ipcMain.on('error', (event, err) => {
	dialog.showErrorBox('Very big error!', err);
})