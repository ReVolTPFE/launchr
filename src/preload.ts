// See the Electron documentation for details on how to use preload scripts:
// https://www.electronjs.org/docs/latest/tutorial/process-model#preload-scripts

import { contextBridge, shell, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('launchrApi', {
	openExternalAndHide: (url: string) => {
		shell.openExternal(url);
		ipcRenderer.send('hide-main-window');
	},
	getSnippets: () => ipcRenderer.invoke('get-snippets'),
});
