import * as local from './local.js';
import list from './layouts/list.js';

export function createLocal() {
  const bigObj = {};
  list.topics.forEach((topic, index) => {
    const array = [];
    list.cards[index].forEach((card) => {
      const obj = {};
      obj.name = card.name;
      obj.translation = card.translation;
      obj.click = 0;
      obj.spin = 0;
      obj.true = 0;
      obj.false = 0;
      obj.audio = card.audio;
      array.push(obj);
    });
    bigObj[topic.name] = array;
  });
  local.set('english', bigObj);
}

export function localChanges(topic, card, section, value) {
  const obj = local.get('english');
  const elem = obj[topic].find((item) => item.name === card);
  elem[section] += value;
  local.set('english', obj);
}
