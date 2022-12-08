const path = require('node:path');
const {app, BrowserWindow, ipcMain, Menu, dialog} = require('electron');

let mainWindow = null;

app.on('ready', () => {
    mainWindow = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 800,
        minHeight: 600,
        backgroundColor: '#212529',
        webPreferences: {
            nodeIntegration: true,
        }
    });
    mainWindow.loadFile(path.join(__dirname, '../windows/xml-analyzer/xml-analyzer.html'));
});