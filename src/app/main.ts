import { app, BrowserWindow, screen, ipcMain, dialog } from 'electron';
import * as path from 'path';
import * as fs from 'fs';

let win: BrowserWindow = null;
const args = process.argv.slice(1),
  serve = args.some((val) => val === '--serve');

function createWindow(): BrowserWindow {
  const size = screen.getPrimaryDisplay().workAreaSize;

  // Create the browser window.
  win = new BrowserWindow({
    x: 0,
    y: 0,
    width: size.width,
    height: size.height,
    webPreferences: {
      nodeIntegration: true,
      allowRunningInsecureContent: serve,
      contextIsolation: false, // false if you want to run e2e test with Spectron
    },
  });

  if (serve) {
    const debug = require('electron-debug');
    debug();

    require('electron-reloader')(module);
    win.loadURL('http://localhost:4200');
  } else {
    // Path when running electron executable
    let pathIndex = './index.html';

    if (fs.existsSync(path.join(__dirname, '../dist/index.html'))) {
      // Path when running electron in local folder
      pathIndex = '../dist/index.html';
    }

    const url = new URL(path.join('file:', __dirname, pathIndex));
    win.loadURL(url.href);
  }

  // Emitted when the window is closed.
  win.on('closed', () => {
    // Dereference the window object, usually you would store window
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    win = null;
  });

  return win;
}

try {
  // This method will be called when Electron has finished
  // initialization and is ready to create browser windows.
  // Some APIs can only be used after this event occurs.
  // Added 400 ms to fix the black background issue while using transparent window. More detais at https://github.com/electron/electron/issues/15947
  app.on('ready', () => setTimeout(createWindow, 400));

  // Quit when all windows are closed.
  app.on('window-all-closed', () => {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      app.quit();
    }
  });

  app.on('activate', () => {
    // On OS X it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (win === null) {
      createWindow();
    }
  });
} catch (e) {
  // Catch Error
  // throw e;
}

ipcMain.handle('read-user-data', () => {
  const userDataPath = path.join(app.getPath('userData'), 'user-data.json');

  if (!fs.existsSync(userDataPath)) {
    return undefined;
  }

  const buffer = fs.readFileSync(userDataPath);

  return buffer.toString();
});

ipcMain.handle('set-user-data', (_event, data: string) => {
  const userDataPath = path.join(app.getPath('userData'), 'user-data.json');
  fs.writeFileSync(userDataPath, data);
});

ipcMain.handle('choose-open-file', (_event, title: string) => {
  return dialog.showOpenDialogSync(win, {
    title: title,
    filters: [
      {
        name: 'TST Files',
        extensions: ['.tst'],
      },
    ],
    properties: ['openFile'],
  });
});

ipcMain.handle('choose-save-file', (_event, title: string) => {
  return dialog.showSaveDialogSync(win, {
    title: title,
    filters: [
      {
        name: 'TST Files',
        extensions: ['.tst'],
      },
    ],
  });
});

ipcMain.handle('read-file', (_event, filePath: string) => {
  if (!fs.existsSync(filePath)) {
    return undefined;
  }

  const buffer = fs.readFileSync(filePath);

  return buffer.toString();
});

ipcMain.handle('save-file', (_event, filePath: string, fileData: string) => {
  fs.writeFileSync(filePath, fileData);
});
