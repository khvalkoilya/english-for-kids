// import '../assets/styles/reset.css';
// import '../assets/styles/style.css';

import list from './layouts/list.js';
import create from './utils/create.js';
import WordCards from './utils/wordCard.js';
const checkbox = document.querySelector('.checkbox__input');
const checkboxText = document.querySelector('.checkbox__text');
let isTrain = true;
// localStorage.clear();
const stata = localStorage['english'] || createLocal();
let currentPage = 'Main Page';
mainPageBlock();

checkbox.addEventListener('change', () => {
  isTrain = !isTrain;
  if (checkbox.checked) {
    checkboxText.classList.remove('train');
    checkboxText.classList.add('play');
    document.querySelector('.side-menu').classList.add('side-menu_play');
  } else {
    checkboxText.classList.remove('play');
    checkboxText.classList.add('train');
    document.querySelector('.side-menu').classList.remove('side-menu_play');
  }
  if (currentPage === 'Main Page') changeModeForMain();
  else changeModeForTopic();
});

function changeModeForMain() {
  document.querySelectorAll('.topic-card').forEach((item) => item.classList.toggle('topic-card_play'));
}

document.querySelector('.burger').addEventListener('click', sideMenu);
function sideMenu() {
  document.querySelector('.side-menu').classList.toggle('side-menu_active');
  document.querySelector('.burger').classList.toggle('burger_active');
}


document.querySelector('body').addEventListener('click', (e) => {
  if (document.querySelector('.side-menu').classList.contains('side-menu_active') && (!e.target.classList.contains('burger') && !e.target.parentElement.classList.contains('burger'))) {
    document.querySelector('.side-menu').classList.remove('side-menu_active');
    document.querySelector('.burger').classList.remove('burger_active');
  }
});

document.querySelectorAll('.link').forEach((elem) => elem.addEventListener('click', () => changeActiveLink(elem)));

function changeActiveLink(elem) {
  document.querySelector('.checkbox__text').classList.remove('none');
  document.querySelectorAll('.link').forEach((e) => e.classList.remove('link_active'));
  elem.classList.add('link_active');
  sideMenu();
  currentPage = elem.innerHTML;
  if (currentPage === 'Main Page') mainPageBlock();
  else if(currentPage === 'Statistics') statisticsPage();
  else findPositionOfTopic(currentPage);
}

function mainPageBlock() {
  document.querySelector('main').innerHTML = '';
  const cardsArray = [];
  list.topics.forEach((item) => {
    const card = create('div', 'topic-card', [
      create('div', 'topic-card__image-block', create('img', 'topic-card__image-block__image', null, null, ['src', item.image])),
      create('p', 'topic-card__name', item.name),
    ]);
    cardsArray.push(card);
  });
  create('section', 'main-page', cardsArray, document.querySelector('main'));
  if (!isTrain) changeModeForMain();
  topicCard();
}


function topicCard() {
  document.querySelectorAll('.topic-card').forEach((item) => item.addEventListener('click', () => {
    findPositionOfTopic(item.children[1].innerHTML);
    document.querySelectorAll('.link').forEach((e) => {
      if (e.innerHTML !== item.children[1].innerHTML) e.classList.remove('link_active');
      else e.classList.add('link_active');
    });
  }));
}


function findPositionOfTopic(item) {
  const positionOfTopic = list.topics.indexOf(list.topics.find((obj) => obj.name === item));
  currentPage = item;
  topicPageBlock(positionOfTopic);
}

function topicPageBlock(position) {
  document.querySelector('main').innerHTML = '';
  const objOfCards = new WordCards(list.cards[position]);
  const arrayOfCards = objOfCards.createWordCard();
  const page = create('section', 'topic-page', [create('div', 'rating none'), create('div', 'topic-page__table', arrayOfCards), create('div', 'buttons none', create('p', 'buttons__start', 'Start game!'))]);
  document.querySelector('main').append(page);
  document.querySelectorAll('.word-card__refresh').forEach((item) => item.addEventListener('click', () => {
    const el = item.parentElement.parentElement;
    el.classList.add('rotate');
    el.addEventListener('mouseleave', () => el.classList.remove('rotate'));
  }));
  document.querySelectorAll('.word-card_front').forEach((item) => item.addEventListener('click', (e) => {
    if (e.target.className !== 'word-card__refresh' && isTrain) {
      item.parentElement.lastElementChild.play();
      localChanges(list.topics[position].name, item.childNodes[1].innerHTML, 'click', 1);
    }
    else if(isTrain) {
      localChanges(list.topics[position].name, item.childNodes[1].innerHTML, 'spin', 1);
    }
  }));
  if (!isTrain) {
    changeModeForTopic();
  }
}

function changeModeForTopic() {
  replacer('.word-card__image-block', 'word-card__image-block_play');
  replacer('.word-card__image-block__image', 'word-card__image-block__image_play');
  replacer('.word-card__name', 'none');
  replacer('.word-card__refresh', 'none');
  replacer('.rating', 'none');
  replacer('.buttons', 'none');
  function replacer(what, how) {
    document.querySelectorAll(what).forEach((item) => item.classList.toggle(how));
  }
  document.querySelector('.buttons').classList.remove('repeat');
  if (!isTrain) {
    document.querySelector('.buttons').addEventListener('click', () => {
      if (document.querySelector('.buttons').classList.length === 1) playMode();
    });
  }
}

function playMode() {
  document.querySelector('.buttons').classList.add('repeat');
  const wordCards = shuffle(Array.from(document.querySelectorAll('.word-card')));
  let positive = 0;
  let mistakes = 0;
  wordCards[positive].lastElementChild.play();
  document.querySelector('.repeat').addEventListener('click', () => wordCards[positive].lastElementChild.play());
  document.querySelectorAll('.word-card_front').forEach((item) => item.addEventListener('click', () => audioFunction(item)));
  function audioFunction(item) {
    if (positive < 8) {
      if (item === wordCards[positive].firstElementChild) {
        item.classList.add('chosen-card');
        positive += 1;
        const goodAnswer = new Audio('assets/sounds/good.mp3');
        goodAnswer.play();
        document.querySelector('.rating').append(create('div', 'star', create('img', 'star__image', null, null, ['src', 'assets/images/good-star.svg'])));
        localChanges(currentPage, item.childNodes[1].innerHTML, 'true', 1);
        if (positive < 8) setTimeout(() => { wordCards[positive].lastElementChild.play(); }, 300);
        else gameResultsPage(mistakes);
      } else if (!item.classList.contains('chosen-card')) {
        const badAnswer = new Audio('assets/sounds/bad.mp3');
        badAnswer.play();
        document.querySelector('.rating').append(create('div', 'star', create('img', 'star__image', null, null, ['src', 'assets/images/bad-star.svg'])));
        mistakes += 1;
        localChanges(currentPage, wordCards[positive].firstElementChild.childNodes[1].innerHTML, 'false', 1);
      }
    }
  }
  document.querySelector('.repeat').addEventListener('click', () => wordCards[positive].lastElementChild.play());
}

function shuffle(array) {
  const arr = array;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}


function gameResultsPage(number) {
  setTimeout(() => {
    document.querySelector('.header').classList.add('none');
    document.querySelector('main').innerHTML = '';
    let image = create('div', 'result');
    let text;
    let audio;
    if (number === 0) {
      audio = new Audio('assets/sounds/win.mp3');
      text = create('p', 'text_win', 'Congratulations! You win!');
      image = create('div', 'result', create('img', 'result_win', null, null, ['src', 'assets/images/happy.svg']));
    } else {
      audio = new Audio('assets/sounds/lose.mp3');
      text = create('p', 'text_lose', `You have ${number} mistakes :(`);
      image = create('div', 'result', create('img', 'result_lose', null, null, ['src', 'assets/images/angry.svg']));
    }
    audio.play();
    create('section', 'mistakes', [text, image], document.querySelector('main'));
    setTimeout(() => {
      document.querySelector('.header').classList.remove('none');
      mainPageBlock();
    }, 3000);
  }, 1000);
}

let isWord = true;
let isDigit = false;
function statisticsPage(hugeArray, previous) {
  if(!hugeArray) {
    var hugeArray = [];
    let obj = JSON.parse(localStorage.getItem('english'));
    for(let key in obj){
      obj[key].forEach((item) => {
        const smallArray=[];
        let percent = Math.round(item.false*100/(item.true+item.false) * 100) / 100 ;
        if(isNaN(percent)) percent = 0;
        smallArray.push(key, item.name, item.translation, item.click, item.spin, item.true, item.false, percent)
        hugeArray.push(smallArray);
      })
    }
  }
  document.querySelector('main').innerHTML = '';
  document.querySelector('.checkbox__text').classList.add('none');
  const name = create('p', 'name', 'Statistics');
  const reset = create('div', 'reset', 'Reset');
  let table = create('table','statistics-table',create('tr',null,[create('th',null,'Topic'),create('th',null,'Word'),create('th',null,'Translation'),create('th',null,'Click'),create('th',null,'Spin'),create('th',null,'True'),create('th',null,'False'),create('th',null,'Percent')]))
  table = createTable(hugeArray, table);
  create('section', 'statistics', [name, reset, table], document.querySelector('main'));
  document.querySelector('.reset').addEventListener('click', () => {
    localStorage.clear();
    createLocal();
    statisticsPage();
  })
  console.log(hugeArray)
  document.querySelector('tr').addEventListener('click', (e) => {
    if(e.target.tagName==='TH') {
      if (e.target.innerHTML.match(/Topic|Word|Translation/)){
        if (e.target.innerHTML === previous) {
          isWord=(!isWord)
        }
        else {
          isWord = false;
        }
        statisticsSort(hugeArray, e.target.innerHTML,isWord)
      }
      else {
        if (e.target.innerHTML === previous) {
          isDigit=(!isDigit)
        }
        else {
          isDigit = true;
        }
        statisticsSort(hugeArray, e.target.innerHTML,isDigit)
      }
    }
  })
}

function statisticsSort(arr, name, rever) {
  let p;
  if(name === 'Topic') p = 0;
  else if (name === 'Word') p = 1;
  else if (name === 'Translation') p = 2;
  else if (name === 'Click') p = 3;
  else if (name === 'Spin') p = 4;
  else if (name === 'True') p = 5;
  else if (name === 'False') p = 6;
  else p = 7;
  for (let i = 0; i< arr.length - 1; i++) {
    for (let j = 0; j< arr.length - 1 - i; j++) {
        if (arr[j][p] > arr[j + 1][p]) {
            let swap = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = swap;
        }
    }
  } 
  if(rever) arr = arr.reverse();
  statisticsPage(arr, name)
}


function createTable(hugeArray, table) {
  hugeArray.forEach(item => {
    const row = create('tr',null,[create('td',null,item[0]),create('td',null,item[1]),create('td',null,item[2]),create('td',null,String(item[3])),create('td',null,String(item[4])),create('td',null,String(item[5])),create('td',null,String(item[6])),create('td',null,String(item[7]))], table)
  })
  // for(let item = 1; item <= hugeArray.length/8; item++) {
  //   const row = create('tr',null,[create('td',null,hugeArray[8*item-8]),create('td',null,hugeArray[8*item-7]),create('td',null,hugeArray[8*item-6]),create('td',null,String(hugeArray[8*item-5])),create('td',null,String(hugeArray[8*item-4])),create('td',null,String(hugeArray[8*item-3])),create('td',null,String(hugeArray[8*item-2])),create('td',null,String(hugeArray[8*item-1]))], table)
  // }
  // hugeArray.forEach((topic) => {
  //   topic.forEach((item) => {
  //     const row = create('tr',null,[create('td',null,item[0]),create('td',null,item[1]),create('td',null,item[2]),create('td',null,String(item[3])),create('td',null,String(item[4])),create('td',null,String(item[5])),create('td',null,String(item[6])),create('td',null,String(item[7]))], table)
  //   })
  // })
  return table;
}

function createLocal () {
  let bigObj={};
  list.topics.forEach((topic, index) => {
    let array = [];
    list.cards[index].forEach((card) => {
      let obj={};
      obj.name = card.name;
      obj.translation = card.translation;
      obj.click = 0;
      obj.spin = 0;
      obj.true = 0;
      obj.false = 0;
      array.push(obj);
    })
    bigObj[topic.name] = array;
  })
  localStorage.setItem('english', JSON.stringify(bigObj))
}

function localChanges (topic, card, section, value) {
  let obj = JSON.parse(localStorage.getItem('english'))
  let elem = obj[topic].find(item=>item.name === card)
  elem[section]+=value;
  localStorage.setItem('english', JSON.stringify(obj))
  console.log(obj[topic])
}