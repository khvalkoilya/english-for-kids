// import '../assets/styles/reset.css';
// import '../assets/styles/style.css';

import vars from './variables.js';
import * as header from './header.js';
import * as main from './main.js';

main.mainPageBlock();

vars.checkbox.addEventListener('change', header.changeMode);
vars.burger.addEventListener('click', header.sideMenuFunction);
document.querySelector('body').addEventListener('click', (e) => header.hidingMenu(e));
document.querySelectorAll('.link').forEach((elem) => elem.addEventListener('click', () => header.changeActiveLink(elem)));
