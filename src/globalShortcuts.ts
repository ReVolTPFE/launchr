import { globalShortcut } from 'electron';

type GlobalShortcutsMap = Record<string, () => void>

export function registerGlobalShortcuts(globalShortcuts: GlobalShortcutsMap) {
	for (const [key, handler] of Object.entries(globalShortcuts)) {
		const success = globalShortcut.register(key, handler);

		if (!success) {
			console.warn(`❌ Failed registering global shortcut : ${key}`);
		} else {
			console.log(`✅ Succeeded registering global shortcut : ${key}`);
		}
	}
}

export function unregisterGlobalShortcuts() {
	globalShortcut.unregisterAll()
}
