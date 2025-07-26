import {toggleSections} from "./utils";

const goBackBtn = document.querySelector('#goBackBtn');
goBackBtn.addEventListener('click', () => {
	toggleSections();
});
