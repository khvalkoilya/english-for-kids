import * as local from './local.js'
import create from './utils/create.js';
import vars from './variables.js';
import * as localFunctions from './localFunctions.js';

function statisticsPage(hugeArray, previous) {
    document.querySelector('main').innerHTML = '';
    vars.checkboxText.classList.add('none');
    const name = create('p', 'name', 'Statistics');
    const reset = create('div', 'reset', 'Reset');
    const repeatWord = create('div', 'repeat-word', 'Repeat difficult words');
    let table = create('table', 'statistics-table', create('tr', null, [create('th', null, 'Topic'), create('th', null, 'Word'), create('th', null, 'Translation'), create('th', null, 'Click'), create('th', null, 'Spin'), create('th', null, 'True'), create('th', null, 'False'), create('th', null, 'Percent')]));
    table = createTable(hugeArray, table);
    create('section', 'statistics', [name, reset, repeatWord, table], document.querySelector('main'));
    document.querySelector('.reset').addEventListener('click', () => {
      local.del('english');
      localFunctions.createLocal();
      createHugeArray();
    });
    document.querySelector('.repeat-word').addEventListener('click', () => createBaseForReseat(hugeArray));
    document.querySelector('tr').addEventListener('click', (e) => {
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
    });
  }
  
  function statisticsSort(arr, name, rever, repeat) {
    let p;
    if (name === 'Topic') p = 0;
    else if (name === 'Word') p = 1;
    else if (name === 'Translation') p = 2;
    else if (name === 'Click') p = 3;
    else if (name === 'Spin') p = 4;
    else if (name === 'True') p = 5;
    else if (name === 'False') p = 6;
    else p = 7;
    for (let i = 0; i < arr.length - 1; i += 1) {
      for (let j = 0; j < arr.length - 1 - i; j += 1) {
        if (arr[j][p] > arr[j + 1][p]) {
          const swap = arr[j];
          arr[j] = arr[j + 1];
          arr[j + 1] = swap;
        }
      }
    }
    if (rever) arr = arr.reverse();
    if (!repeat) statisticsPage(arr, name);
    else repeatWordsPage(arr);
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
    for (const key in obj) {
      obj[key].forEach((item) => {
        const smallArray = [];
        let percent = item.false / (item.true + item.false);
        percent = Math.round(percent * 100);
        percent /= 100;
        percent *= 100;
        if (isNaN(percent)) percent = 0;
        smallArray.push(key, item.name, item.translation, item.click);
        smallArray.push(item.spin, item.true, item.false, percent, item.audio);
        hugeArray.push(smallArray);
      });
    }
    statisticsPage(hugeArray);
  }
  
  
function createBaseForReseat(arr) {
    statisticsSort(arr, 'Percent', true, true);
  }

  function repeatWordsPage() {
  document.querySelector('main').innerHTML = '';
  // array = array.slice(0, 8);
  // alert('Почти успел(');
//   vars.currentPage = 'Main Page';
//   mainPageBlock();
  // create('section', 'topic-page__table', , document.querySelector('main'));
}
  