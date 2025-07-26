import {toggleSections} from "./utils";

const searchInput = document.querySelector('#searchInput');
const errorBlock = document.querySelector('#errorBlock');
errorBlock.classList.add('hidden');

async function search() {
	const value = searchInput.value.trim();
	const [prefix, ...rest] = value.split(' ');
	const query = rest.join(' ');

	const snippets = await window.launchrApi.getSnippets();

	if (snippets[prefix]) {
		let url = snippets[prefix];
		if (url.includes('%s')) {
			url = url.replace('%s', encodeURIComponent(query));
		}
		window.launchrApi.openExternalAndHide(url);
		searchInput.value = '';
	} else {
		errorBlock.classList.remove('hidden');
		console.log('Error on value : ' + value);
	}
}

searchInput.addEventListener('keydown', (event) => {
	errorBlock.classList.add('hidden');

	if (event.key === 'Enter') {
		search();
	}
});

const goToParamsBtn = document.querySelector('#goToParamsBtn');
goToParamsBtn.addEventListener('click', () => {
	toggleSections();
});

const submitSearchInput = document.querySelector('#submitSearchInput');
submitSearchInput.addEventListener('click', () => {
	search();
});
