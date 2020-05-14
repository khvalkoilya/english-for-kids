import list from './layouts/list.js';
import create from './utils/create.js';
import vars from './variables.js';
import * as main from './main.js';
import WordCards from './utils/wordCard.js';
import * as localFunctions from './localFunctions.js';
import replacer from './utils/replacer.js';

function topicEventListenerCard(item) {
  findPositionOfTopic(item.children[1].innerHTML);
  document.querySelectorAll('.link').forEach((e) => {
    if (e.innerHTML !== item.children[1].innerHTML) {
      e.classList.remove('link_active');
    } else {
      e.classList.add('link_active');
    }
  });
}

export function topicCard() {
  document.querySelectorAll('.topic-card').forEach((item) => item.addEventListener('click', () => topicEventListenerCard(item)));
}


export function findPositionOfTopic(item) {
  const positionOfTopic = list.topics.indexOf(list.topics.find((obj) => obj.name === item));
  vars.currentPage = item;
  topicPageBlock(positionOfTopic);
}

function eventRotate(item) {
  const el = item.parentElement.parentElement;
  el.classList.add('rotate');
  el.addEventListener('mouseleave', () => el.classList.remove('rotate'));
}

function eventFrontCard(item, e, position, topicObj) {
  let topic;
  const child = item.childNodes[1].innerHTML;
  if (typeof position === 'number') {
    topic = list.topics[position].name;
  } else {
    topicObj.forEach((elem) => {
      if (elem.name === child) {
        topic = elem.topic;
      }
    });
  }
  if ((e.target.className !== 'word-card__refresh' && vars.isTrain) || (e.target.className !== 'word-card__refresh' && typeof position !== 'number')) {
    item.parentElement.lastElementChild.play();
    localFunctions.localChanges(topic, child, 'click', 1);
  } else if (vars.isTrain) {
    localFunctions.localChanges(topic, child, 'spin', 1);
  }
}

export function topicPageBlock(position, topicObj = list.cards[position]) {
  document.querySelector('main').innerHTML = '';
  const objOfCards = new WordCards(topicObj);
  const arrayOfCards = objOfCards.createWordCard();
  const page = create('section', 'topic-page',
    [create('div', 'rating none'), create('div', 'topic-page__table', arrayOfCards),
      create('div', 'buttons none', create('p', 'buttons__start', 'Start game!'))]);
  document.querySelector('main').append(page);
  document.querySelectorAll('.word-card__refresh').forEach((item) => item.addEventListener('click', () => eventRotate(item)));
  document.querySelectorAll('.word-card_front').forEach((item) => item.addEventListener('click', (e) => eventFrontCard(item, e, position, topicObj)));
  if (!vars.isTrain && typeof position === 'number') {
    changeModeForTopic();
  }
}

export function changeModeForTopic() {
  replacer('.word-card__image-block', 'word-card__image-block_play');
  replacer('.word-card__image-block__image', 'word-card__image-block__image_play');
  replacer('.word-card__name', 'none');
  replacer('.word-card__refresh', 'none');
  replacer('.rating', 'none');
  replacer('.buttons', 'none');
  document.querySelector('.buttons').classList.remove('repeat');
  if (!vars.isTrain) {
    document.querySelector('.buttons').addEventListener('click', () => {
      if (document.querySelector('.buttons').classList.length === 1) {
        playMode();
      }
    });
  }
}

function audioFunction(item, wordCards) {
  if (vars.positive < 8) {
    if (item === wordCards[vars.positive].firstElementChild) {
      item.classList.add('chosen-card');
      vars.positive += 1;
      const goodAnswer = new Audio('assets/sounds/good.mp3');
      goodAnswer.play();
      document.querySelector('.rating').append(create('div', 'star', create('img', 'star__image', null, null, ['src', 'assets/images/good-star.svg'])));
      localFunctions.localChanges(vars.currentPage, item.childNodes[1].innerHTML, 'true', 1);
      if (vars.positive < 8) {
        setTimeout(() => { wordCards[vars.positive].lastElementChild.play(); }, 300);
      } else {
        gameResultsPage(vars.mistakes);
      }
    } else if (!item.classList.contains('chosen-card')) {
      const badAnswer = new Audio('assets/sounds/bad.mp3');
      badAnswer.play();
      document.querySelector('.rating').append(create('div', 'star', create('img', 'star__image', null, null, ['src', 'assets/images/bad-star.svg'])));
      vars.mistakes += 1;
      localFunctions.localChanges(vars.currentPage, wordCards[vars.positive].firstElementChild.childNodes[1].innerHTML, 'false', 1);
    }
  }
}

function playMode() {
  document.querySelector('.buttons').classList.add('repeat');
  const wordCards = shuffle(Array.from(document.querySelectorAll('.word-card')));
  vars.positive = 0;
  vars.mistakes = 0;
  wordCards[vars.positive].lastElementChild.play();
  document.querySelector('.repeat').addEventListener('click', () => wordCards[vars.positive].lastElementChild.play());
  document.querySelectorAll('.word-card_front').forEach((item) => item.addEventListener('click', () => audioFunction(item, wordCards)));
  document.querySelector('.repeat').addEventListener('click', () => wordCards[vars.positive].lastElementChild.play());
}

function shuffle(array) {
  const arr = array;
  for (let i = arr.length - 1; i > 0; i -= 1) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function showGameResult(sound, classResult, phrase, classImg, img) {
  const audio = new Audio(sound);
  const text = create('p', classResult, phrase);
  const image = create('div', 'result', create('img', classImg, null, null, ['src', img]));
  audio.play();
  create('section', 'mistakes', [text, image], document.querySelector('main'));
}
function gameResultsPage(number) {
  setTimeout(() => {
    document.querySelector('.header').classList.add('none');
    document.querySelector('main').innerHTML = '';
    if (number === 0) {
      showGameResult('assets/sounds/win.mp3', 'text_win', 'Congratulations! You win!', 'result_win', 'assets/images/happy.svg');
    } else {
      showGameResult('assets/sounds/lose.mp3', 'text_lose', `You have ${number} mistakes :(`, 'result_lose', 'assets/images/angry.svg');
    }
    setTimeout(() => {
      document.querySelector('.header').classList.remove('none');
      vars.currentPage = 'Main Page';
      main.mainPageBlock();
    }, 3000);
  }, 1000);
}
