export function toggleSections() {
	const searchbarSection = document.querySelector('#searchbarSection');
	const parametersSection = document.querySelector('#parametersSection');

	searchbarSection.classList.toggle('hidden');
	searchbarSection.classList.toggle('flex');
	parametersSection.classList.toggle('hidden');
	parametersSection.classList.toggle('flex');
}
