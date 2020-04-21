/* eslint-disable no-unused-expressions */
/* eslint-disable no-restricted-globals */
/* eslint-disable no-restricted-syntax */
/* eslint-disable guard-for-in */


// import '../assets/styles/reset.css';
// import '../assets/styles/style.css';

import list from './layouts/list.js';
import create from './utils/create.js';
import WordCards from './utils/wordCard.js';
import * as local from './local.js'
import * as localFunctions from './localFunctions.js'
import vars from './variables.js'
import * as header from './header.js'
import * as main from './main.js'

main.mainPageBlock();

vars.checkbox.addEventListener('change', header.changeMode);
vars.burger.addEventListener('click', header.sideMenuFunction);
document.querySelector('body').addEventListener('click', (e) => header.hidingMenu(e));
document.querySelectorAll('.link').forEach((elem) => elem.addEventListener('click', ()=>header.changeActiveLink(elem)));
