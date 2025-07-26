import { toggleSections } from "./utils";

const goBackBtn = document.querySelector('#goBackBtn');
goBackBtn.addEventListener('click', () => {
    toggleSections();
});

const generalParamLink = document.querySelector('#generalParamLink');
const snippetsParamLink = document.querySelector('#snippetsParamLink');
const appearanceParamLink = document.querySelector('#appearanceParamLink');
const behaviorParamLink = document.querySelector('#behaviorParamLink');

const generalParamContent = document.querySelector('#generalParamContent');
const snippetsParamContent = document.querySelector('#snippetsParamContent');
const appearanceParamContent = document.querySelector('#appearanceParamContent');
const behaviorParamContent = document.querySelector('#behaviorParamContent');

async function displaySnippets() {
    const snippets = await window.launchrApi.getSnippets();
    snippetsParamContent.innerHTML = '';
    if (snippets) {
        for (const [name, content] of Object.entries(snippets)) {
            const snippetElement = document.createElement('div');
            snippetElement.classList.add('snippet');
            snippetElement.innerHTML = `
                <div class="bg-white border border-gray-200 rounded py-1 px-2 mb-2 relative">
                    <input type="text" value="${name} ${content}" class="w-full focus:outline-0">
                </div>
            `;
            snippetsParamContent.appendChild(snippetElement);
        }
    }
}

function switchParamsTab(target: string) {
    generalParamContent.classList.add('hidden');
    snippetsParamContent.classList.add('hidden');
    appearanceParamContent.classList.add('hidden');
    behaviorParamContent.classList.add('hidden');

    generalParamLink.classList.remove('activeLink');
    snippetsParamLink.classList.remove('activeLink');
    appearanceParamLink.classList.remove('activeLink');
    behaviorParamLink.classList.remove('activeLink');

    if (target === 'general') {
        generalParamContent.classList.remove('hidden');
        generalParamLink.classList.add('activeLink');
    } else if (target === 'snippets') {
        snippetsParamContent.classList.remove('hidden');
        snippetsParamLink.classList.add('activeLink');

        displaySnippets();
    } else if (target === 'appearance') {
        appearanceParamContent.classList.remove('hidden');
        appearanceParamLink.classList.add('activeLink');
    } else if (target === 'behavior') {
        behaviorParamContent.classList.remove('hidden');
        behaviorParamLink.classList.add('activeLink');
    }
}

generalParamLink.addEventListener('click', () => switchParamsTab('general'));
snippetsParamLink.addEventListener('click', () => switchParamsTab('snippets'));
appearanceParamLink.addEventListener('click', () => switchParamsTab('appearance'));
behaviorParamLink.addEventListener('click', () => switchParamsTab('behavior'));

switchParamsTab('general');
