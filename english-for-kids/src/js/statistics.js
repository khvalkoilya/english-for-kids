import * as local from './local.js';
import create from './utils/create.js';
import vars from './variables.js';
import * as localFunctions from './localFunctions.js';
import * as topic from './topic.js';
import getPercent from './utils/getPercent.js';

function eventResetState() {
  local.del('english');
  localFunctions.createLocal();
  createHugeArray();
}

function eventPreparingForSort(e, previous, hugeArray) {
  if (e.target.tagName === 'TH') {
    if (e.target.innerHTML.match(/Topic|Word|Translation/)) {
      if (e.target.innerHTML === previous) {
        vars.isWord = (!vars.isWord);
      } else {
        vars.isWord = false;
      }
      statisticsSort(hugeArray, e.target.innerHTML, vars.isWord);
    } else {
      if (e.target.innerHTML === previous) {
        vars.isDigit = (!vars.isDigit);
      } else {
        vars.isDigit = true;
      }
      statisticsSort(hugeArray, e.target.innerHTML, vars.isDigit);
    }
  }
}

function statisticsPage(hugeArray, previous) {
  document.querySelector('main').innerHTML = '';
  vars.checkboxText.classList.add('none');
  const name = create('p', 'name', 'Statistics');
  const reset = create('div', 'reset', 'Reset');
  const repeatWord = create('div', 'repeat-word', 'Repeat difficult words');
  let table = create('table', 'statistics-table', create('tr', null, [create('th', null, 'Topic'), create('th', null, 'Word'), create('th', null, 'Translation'), create('th', null, 'Click'), create('th', null, 'Spin'), create('th', null, 'True'), create('th', null, 'False'), create('th', null, 'Percent')]));
  table = createTable(hugeArray, table);
  create('section', 'statistics', [name, reset, repeatWord, table], document.querySelector('main'));
  document.querySelector('.reset').addEventListener('click', () => eventResetState());
  document.querySelector('.repeat-word').addEventListener('click', () => createBaseForRepeat(hugeArray));
  document.querySelector('tr').addEventListener('click', (e) => eventPreparingForSort(e, previous, hugeArray));
}

function sorting(array, p) {
  const arr = array;
  for (let i = 0; i < arr.length - 1; i += 1) {
    for (let j = 0; j < arr.length - 1 - i; j += 1) {
      if (arr[j][p] > arr[j + 1][p]) {
        const swap = arr[j];
        arr[j] = arr[j + 1];
        arr[j + 1] = swap;
      }
    }
  }
}

function statisticsSort(array, name, rever, repeat) {
  let arr = array;
  let p;
  switch (name) {
    case 'Topic': p = 0; break;
    case 'Word': p = 1; break;
    case 'Translation': p = 2; break;
    case 'Click': p = 3; break;
    case 'Spin': p = 4; break;
    case 'True': p = 5; break;
    case 'False': p = 6; break;
    default: p = 7;
  }
  sorting(arr, p);
  if (rever) {
    arr = arr.reverse();
  }
  if (!repeat) {
    statisticsPage(arr, name);
  } else {
    repeatWordsPage(arr);
  }
}


function createTable(hugeArray, table) {
  hugeArray.forEach((item) => {
    const childs = [create('td', null, item[0]), create('td', null, item[1]), create('td', null, item[2]),
      create('td', null, String(item[3])), create('td', null, String(item[4])), create('td', null, String(item[5])),
      create('td', null, String(item[6])), create('td', null, String(item[7]))];
    create('tr', null, childs, table);
  });
  return table;
}


export default function createHugeArray() {
  const hugeArray = [];
  const obj = local.get('english');
  Object.keys(obj).forEach((key) => {
    obj[key].forEach((item) => {
      const smallArray = [];
      const percent = getPercent(item);
      smallArray.push(key, item.name, item.translation, item.click);
      smallArray.push(item.spin, item.true, item.false, percent, item.audio, item.image);
      hugeArray.push(smallArray);
    });
  });
  statisticsPage(hugeArray);
}


function createBaseForRepeat(arr) {
  statisticsSort(arr, 'Percent', true, true);
}

function repeatWordsPage(arr) {
  const array = arr.slice(0, 8);
  const newArray = [];
  array.forEach((item) => {
    if (item[7] !== 0) {
      const obj = {
        topic: item[0],
        name: item[1],
        translation: item[2],
        audio: item[8],
        image: item[9],
      };
      newArray.push(obj);
    }
  });
  topic.topicPageBlock(null, newArray);
}
