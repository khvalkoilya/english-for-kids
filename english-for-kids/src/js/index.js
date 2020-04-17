import list from './layouts/list.js';
import create from './utils/create.js';
import WordCards from './utils/wordCard.js'

const checkbox = document.querySelector('.checkbox__input');
const checkboxText = document.querySelector('.checkbox__text');
let isTrain = true;
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
  document.querySelectorAll('.link').forEach((e) => e.classList.remove('link_active'));
  elem.classList.add('link_active');
  sideMenu();
  currentPage = elem.innerHTML;
  if (currentPage == 'Main Page') mainPageBlock();
  else findPositionOfTopic(currentPage);
}

function mainPageBlock() {
  document.querySelector('main').innerHTML = '';
  let cards = [];
  list.topics.forEach((item) => {
    const topicCard = create('div','topic-card',[
      create('div','topic-card__image-block',create('img','topic-card__image-block__image',null,null,['src',item.image])),
      create('p', 'topic-card__name',item.name)
    ]);
    cards.push(topicCard);
  })
  let section = create('section', 'main-page',cards,document.querySelector('main'));
  if (!isTrain) changeModeForMain();
  topicCard();
}


function topicCard() {
  document.querySelectorAll('.topic-card').forEach((item) => item.addEventListener('click', () => {
    findPositionOfTopic(item.children[1].innerHTML);
    document.querySelectorAll('.link').forEach((e) => {
      if(e.innerHTML!==item.children[1].innerHTML)
        e.classList.remove('link_active');
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
  const page = create('section', 'topic-page', [create('div', 'rating none'), create('div','topic-page__table',arrayOfCards), create('div', 'buttons none'), create('audio', 'sound'), create('audio', 'effect')]);
  document.querySelector('main').append(page);
  document.querySelectorAll('.word-card__refresh').forEach((item)=>item.addEventListener('click', () => item.parentElement.parentElement.classList.add('rotate')));
  if(!isTrain) changeModeForTopic();
}

function changeModeForTopic() {
  replacer('.word-card__image-block', 'word-card__image-block_play');
  replacer('.word-card__image-block__image', 'word-card__image-block__image_play');
  replacer('.word-card__name', 'none');
  replacer('.word-card__refresh', 'none');
  replacer('.rating', 'none');
  replacer('.buttons', 'none')
  function replacer(what, how) {
    document.querySelectorAll(what).forEach((item) => item.classList.toggle(how));
  }
}