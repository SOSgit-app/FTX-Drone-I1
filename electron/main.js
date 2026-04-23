'use strict';

const { app, BrowserWindow } = require('electron');
const path = require('path');

function createWindow() {
    const win = new BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 640,
        backgroundColor: '#0a0a0a',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true
        }
    });

    // Packaged: index.html lives next to this file's app root (see package.json "files")
    const indexHtml = path.join(__dirname, '..', 'index.html');
    win.loadFile(indexHtml).catch((err) => {
        console.error('Failed to load index.html', err);
    });

    // Uncomment for debugging:
    // win.webContents.openDevTools({ mode: 'detach' });
}

app.whenReady().then(() => {
    createWindow();

    app.on('activate', () => {
        if (BrowserWindow.getAllWindows().length === 0) createWindow();
    });
});

app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') app.quit();
});
