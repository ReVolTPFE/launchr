// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
/**
 * This file will automatically be loaded by vite and run in the "renderer" context.
 * To learn more about the differences between the "main" and the "renderer" context in
 * Electron, visit:
 *
 * https://electronjs.org/docs/tutorial/process-model
 *
 * By default, Node.js integration in this file is disabled. When enabling Node.js integration
 * in a renderer process, please be aware of potential security implications. You can read
 * more about security risks here:
 *
 * https://electronjs.org/docs/tutorial/security
 *
 * To enable Node.js integration in this file, open up `main.ts` and enable the `nodeIntegration`
 * flag:
 *
 * ```
 *  // Create the browser window.
 *  mainWindow = new BrowserWindow({
 *    width: 800,
 *    height: 600,
 *    webPreferences: {
 *      nodeIntegration: true
 *    }
 *  });
 * ```
 */

import './index.css';

const snippets: Record<string, string> = {
	fr: 'https://www.deepl.com/translator#en/fr/%s',
	en: 'https://www.deepl.com/translator#fr/en/%s',
	yt: 'https://www.youtube.com/results?search_query=%s',
}

const searchInput = document.querySelector('#searchInput');

searchInput.addEventListener('keydown', (event) => {
	if (event.key === 'Enter') {
		const value = searchInput.value.trim();
		const [prefix, ...rest] = value.split(' ');
		const query = rest.join(' ');

		if (snippets[prefix]) {
			const url = snippets[prefix].replace('%s', encodeURIComponent(query));

			window.launchrApi.openExternal(url);
		} else {
			console.log('Error on value : ' + value);
		}
	}
});
