import cards from './cards.js';


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
  if (currentPage === 'Main Page') document.querySelectorAll('.topic-card').forEach((item) => item.classList.toggle('topic-card_play'));
});

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
  else findPositionOfTopicInLinks(currentPage);
}

function mainPageBlock() {
  document.querySelector('main > .wrapper').innerHTML = '';
  const page = document.createElement('section');
  page.className = 'main-page';
  cards[0].forEach((item) => {
    const card = document.createElement('div');
    card.className = 'topic-card';
    card.innerHTML = `<div class="topic-card__image-block"><img class="topic-card__image-block__image" src="${item.image}"></img></div>`;
    card.innerHTML += `<p class="topic-card__name">${item.name}</p>`;
    page.append(card);
  });
  document.querySelector('main > .wrapper').append(page);
  if (!isTrain) document.querySelectorAll('.topic-card').forEach((item) => item.classList.toggle('topic-card_play'));
  document.querySelectorAll('.topic-card').forEach((item) => item.addEventListener('click', () => findPositionOfTopicInMainPage(item)));
}


function findPositionOfTopicInMainPage(item) {
  const positionOfTopic = cards[0].indexOf(cards[0].find((obj) => obj.name === item.children[1].innerHTML));
  topicPageBlock(positionOfTopic);
}

function findPositionOfTopicInLinks(item) {
  const positionOfTopic = cards[0].indexOf(cards[0].find((obj) => obj.name === item));
  topicPageBlock(positionOfTopic);
}

class WordCards {
  constructor(obj) {
    this.obj = obj;
  }

  createWordCard() {
    const page = document.createElement('section');
    page.className = 'topic-page';
    const table = document.createElement('div');
    table.className = 'topic-page_table';
    page.append(table);
    console.log(this.obj);
    this.obj.forEach((item) => {
      const card = document.createElement('div');
      card.className = 'word-card';
      const front = createFrontBack('word-card_front', item.name, item.image);
      const back = createFrontBack('word-card_back', item.translation, item.image);
      function createFrontBack(classN, text, img) {
        let block = document.createElement('div');
        block.className = classN;
        block.innerHTML = `<div class="word-card__image-block"><img class="word-card__image-block__image" src="${img}"></img></div>`;
        block.innerHTML += `<p class="word-card__name">${text}</p>`;
        return block;
      }
      front.innerHTML += '<img class="word-card__refresh" alt="refresh" src="../src/assets/images/refresh.svg">'
      card.append(front);
      card.append(back);
      table.append(card);
    });
    return page;
  }
}

function topicPageBlock(position) {
  document.querySelector('main > .wrapper').innerHTML = '';
  const objOfCards = new WordCards(cards[position + 1]);
  document.querySelector('main > .wrapper').append(objOfCards.createWordCard());
  document.querySelector('.word-card__refresh').addEventListener('click', ()=>{
    document.querySelector('.word-card').classList.add('rotate');
  })
}

