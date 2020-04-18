import create from './create.js';

export default class WordCards {
  constructor(obj) {
    this.obj = obj;
  }

  createWordCard() {
    const cards = [];
    this.obj.forEach((item) => {
      const card = create('div', 'word-card__container', create('div', 'word-card', [
        create('div', 'word-card_front', [
          create('div', 'word-card__image-block', create('img', 'word-card__image-block__image', null, null, ['src', item.image])),
          create('p', 'word-card__name', item.name),
          create('img', 'word-card__refresh', null, null, ['src', '../src/assets/images/refresh.svg']),
        ]),
        create('div', 'word-card_back', [
          create('div', 'word-card__image-block', create('img', 'word-card__image-block__image', null, null, ['src', item.image])),
          create('p', 'word-card__name', item.translation),
        ]),
        create('audio', 'sound', null, null, ['src', item.audio]),
      ]));
      cards.push(card);
    });
    return cards;
  }
}
