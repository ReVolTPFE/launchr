import { Tray, Menu, nativeImage } from 'electron';
import { quit } from "./main";

export function generateAppTray(iconPath: string) {
	console.log(iconPath)
	const icon = nativeImage.createFromPath(iconPath);

	const tray = new Tray(icon);

	const contextMenu = Menu.buildFromTemplate([
		{ label: 'Quit', type: 'normal', click: () => quit() },
	]);

	tray.setContextMenu(contextMenu);
	tray.setToolTip('Launchr');
	tray.setTitle('Launchr');
}
