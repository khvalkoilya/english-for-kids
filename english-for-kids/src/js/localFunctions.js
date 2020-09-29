import * as local from './local.js';
import list from './layouts/list.js';

export function createLocal() {
  const bigObj = {};
  list.topics.forEach((topic, index) => {
    const array = [];
    list.cards[index].forEach((card) => {
      const obj = {
        ...card,
        click: 0,
        spin: 0,
        true: 0,
        false: 0,
      };
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
