"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const electron_1 = require("electron");
const node_path_1 = __importDefault(require("node:path"));
function createWindow() {
    const win = new electron_1.BrowserWindow({
        width: 1440,
        height: 900,
        minWidth: 1024,
        minHeight: 640,
        backgroundColor: '#0a0a0a',
        autoHideMenuBar: true,
        webPreferences: {
            nodeIntegration: false,
            contextIsolation: true,
            sandbox: true,
        },
    });
    const devUrl = process.env.ELECTRON_START_URL;
    if (devUrl) {
        win.loadURL(devUrl).catch((err) => console.error('Failed to load dev URL', err));
    }
    else {
        // Production: renderer is copied into the installed app's resources folder
        const indexHtml = node_path_1.default.join(process.resourcesPath, 'dist-renderer', 'index.html');
        win.loadFile(indexHtml).catch((err) => console.error('Failed to load index.html', err));
    }
}
electron_1.app.whenReady().then(() => {
    createWindow();
    electron_1.app.on('activate', () => {
        if (electron_1.BrowserWindow.getAllWindows().length === 0)
            createWindow();
    });
});
electron_1.app.on('window-all-closed', () => {
    if (process.platform !== 'darwin')
        electron_1.app.quit();
});
