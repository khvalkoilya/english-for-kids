import cards from './cards.js';


const checkbox = document.querySelector('.checkbox__input');
const checkboxText = document.querySelector('.checkbox__text');
let isTrain = true;
checkbox.addEventListener('change',()=>{
    isTrain=!isTrain;
    if(checkbox.checked) {
        checkboxText.classList.remove('train');
        checkboxText.classList.add('play');
        document.querySelector('.side-menu').classList.add('side-menu_play');
    }
    else {
        checkboxText.classList.remove('play');
        checkboxText.classList.add('train');
        document.querySelector('.side-menu').classList.remove('side-menu_play');
    }
})

document.querySelector('.burger').addEventListener('click', sideMenu);

function sideMenu() {
    document.querySelector('.side-menu').classList.toggle('side-menu_active');
    document.querySelector('.burger').classList.toggle('burger_active')
}

