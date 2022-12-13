const path = require("node:path");
const { app, BrowserWindow, ipcMain, Menu, dialog } = require("electron");
const openFileHandler = require("./Handlers/openFile.handler");
const validateHandler = require("./Handlers/validate.handler");

let mainWindow = null;

app.on("ready", () => {
	mainWindow = new BrowserWindow({
		width: 800,
		height: 600,
		minWidth: 800,
		minHeight: 600,
		backgroundColor: "#212529",
		webPreferences: {
			nodeIntegration: true,
			contextIsolation: false,
		},
	});
	mainWindow.loadFile(
		path.join(__dirname, "../windows/xml-analyzer/xml-analyzer.html")
	);
});

ipcMain.on("command", async (event, command, data) => {
	switch (command) {
		case "openFile":{
			await openFileHandler(event);
            break;
        }
		case "validate":{
			validateHandler(event, data);
            break;
        }
	}
});
