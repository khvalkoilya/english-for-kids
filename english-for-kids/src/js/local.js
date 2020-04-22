import * as localFunctions from './localFunctions.js';

export function set(name, value) {
  window.localStorage.setItem(name, JSON.stringify(value));
}

export function get(name, create = null) {
  return JSON.parse(window.localStorage.getItem(name) || create);
}

export function del(name) {
  localStorage.removeItem(name);
}
