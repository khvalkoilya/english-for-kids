export default function replacer(what, how) {
  document.querySelectorAll(what).forEach((item) => item.classList.toggle(how));
}
