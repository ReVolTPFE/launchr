import { app, BrowserWindow, nativeImage, ipcMain } from 'electron';
import path from 'node:path';
import started from 'electron-squirrel-startup';
import { registerGlobalShortcuts, unregisterGlobalShortcuts } from "./globalShortcuts";
import { getGlobalShortcutActions } from "./globalShortcutActions";
import { generateAppTray } from "./tray";
import Store from "electron-store";

const schema = {
	snippets: {
		type: 'object',
		default: {},
	},
	parameters: {
		type: 'object',
		default: {},
	},
};

const store = new Store({ schema });

store.set('snippets', {
	fr: 'https://www.deepl.com/translator#en/fr/%s',
	en: 'https://www.deepl.com/translator#fr/en/%s',
	yt: 'https://www.youtube.com/results?search_query=%s',
	g: 'https://www.google.com/search?q=%s',
	otp: 'https://www.twitch.tv/otplol_',
	otpvod: 'https://www.twitch.tv/otplol_/videos?filter=archives&sort=time',
	agenda: 'https://calendar.google.com/calendar/u/0/r/month?pli=1',
	gpt: 'https://chatgpt.com',
	accstat: 'https://docs.google.com/spreadsheets/d/e/2PACX-1vSncrVjB4T_yMxl19TSF78QTRz5kdlRuHvnanFDrgOZo2Il3pJTL0sOQkiLrWGwrBPMHkq4yyfK4g0s/pubhtml#',
	lfm: 'https://lowfuelmotorsport.com/seasonsv2/gt3-sprint-s19/upcoming',
	canal: 'https://www.canalplus.com/sport/formule-1/',
});

ipcMain.handle('get-snippets', () => {
	return store.get('snippets');
});

let mainWindow: BrowserWindow | null = null;
let isQuitting = false;
const isDevMode = !app.isPackaged;

function getIconPath(): string {
  return isDevMode
    ? path.join(__dirname, '..', '..', 'assets', 'img', 'logo-icon', 'green-multi.ico')
    : path.join(process.resourcesPath, 'assets', 'img', 'logo-icon', 'green-multi.ico');
}

const iconPath = getIconPath();

export function getMainWindow(): BrowserWindow | null {
  return mainWindow;
}

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (started) {
  app.quit();
}

// Enable usage of Portal's globalShortcuts. This is essential for cases when the app runs in a Wayland session.
// This line edits the Chromium behavior BEFORE the app is ready, so we need to put it here.
app.commandLine.appendSwitch('enable-features', 'GlobalShortcutsPortal');

const createWindow = () => {
  // Create the browser window.
  mainWindow = new BrowserWindow({
    width: 1920,
    height: 1080,
    webPreferences: {
      nodeIntegration: true,
      preload: path.join(__dirname, 'preload.js'), // It's .js because it's the vite compilated file which is processed.
    },
    alwaysOnTop: true,
    transparent: true,
    icon: nativeImage.createFromPath(iconPath),
    show: isDevMode,
    title: 'Launchr',
    skipTaskbar: true,
  });

  mainWindow.removeMenu();

  // and load the index.html of the app.
  if (MAIN_WINDOW_VITE_DEV_SERVER_URL) {
    mainWindow.loadURL(MAIN_WINDOW_VITE_DEV_SERVER_URL);
  } else {
    mainWindow.loadFile(path.join(__dirname, `../renderer/${MAIN_WINDOW_VITE_NAME}/index.html`));
  }

  // Open the DevTools.
  if (isDevMode) {
    mainWindow.webContents.openDevTools();
  }

  // Prevent the app to be fully closed.
  mainWindow.on('close', (event) => {
    if (!isQuitting) {
      event.preventDefault();
      mainWindow.hide();
    }
  });
};

// This method will be called when Electron has finished
// initialization and is ready to create browser windows.
// Some APIs can only be used after this event occurs.
app.whenReady().then(() => {
  createWindow();

  registerGlobalShortcuts(getGlobalShortcutActions());

  generateAppTray(iconPath);
});

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

app.on('before-quit', () => {
  isQuitting = true;
});

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

app.on('will-quit', () => {
  unregisterGlobalShortcuts();
})

export function quit() {
  app.quit();
}

ipcMain.on('hide-main-window', () => {
  mainWindow.hide();
});
