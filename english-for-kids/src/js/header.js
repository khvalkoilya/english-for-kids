import vars from './variables.js';
import * as main from './main.js';
import * as topic from './topic.js';
import createHugeArray from './statistics.js';

export function changeMode() {
  vars.isTrain = !vars.isTrain;
  if (vars.checkbox.checked) {
    vars.checkboxText.classList.remove('train');
    vars.checkboxText.classList.add('play');
    vars.sideMenu.classList.add('side-menu_play');
  } else {
    vars.checkboxText.classList.remove('play');
    vars.checkboxText.classList.add('train');
    vars.sideMenu.classList.remove('side-menu_play');
  }
  if (vars.currentPage === 'Main Page') {
    main.changeModeForMain();
  } else {
    topic.changeModeForTopic();
  }
}


export function sideMenuFunction() {
  vars.sideMenu.classList.toggle('side-menu_active');
  vars.burger.classList.toggle('burger_active');
}


export function hidingMenu(e) {
  if (vars.sideMenu.classList.contains('side-menu_active')
   && (!e.target.classList.contains('burger') && !e.target.parentElement.classList.contains('burger'))) {
    vars.sideMenu.classList.remove('side-menu_active');
    vars.burger.classList.remove('burger_active');
  }
}


export function changeActiveLink(elem) {
  vars.checkboxText.classList.remove('none');
  document.querySelectorAll('.link').forEach((e) => e.classList.remove('link_active'));
  elem.classList.add('link_active');
  sideMenuFunction();
  vars.currentPage = elem.innerHTML;
  if (vars.currentPage === 'Main Page') {
    main.mainPageBlock();
  } else if (vars.currentPage === 'Statistics') {
    createHugeArray();
  } else {
    topic.findPositionOfTopic(vars.currentPage);
  }
}
