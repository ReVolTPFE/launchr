import { getMainWindow } from './main';

export function getGlobalShortcutActions() {
	return {
		// The F12 key doesn't work because Electron takes it already.
		'CommandOrControl+Alt+Space': () => {
			const mainWindow = getMainWindow();

			mainWindow?.webContents.toggleDevTools();
		},

		'CommandOrControl+Shift+Space': () => {
			const mainWindow = getMainWindow();

			if (!mainWindow) return;

			if (mainWindow.isVisible()) {
				mainWindow.hide();
			} else {
				mainWindow.show();
				mainWindow.focus();
			}
		}
	};
}
