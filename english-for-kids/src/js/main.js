import list from './layouts/list.js';
import create from './utils/create.js';
import vars from './variables.js';
import * as topic from './topic.js'


export function changeModeForMain() {
    document.querySelectorAll('.topic-card').forEach((item) => item.classList.toggle('topic-card_play'));
  }
  
export function mainPageBlock() {
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
    if (!vars.isTrain) changeModeForMain();
    topic.topicCard();
  }