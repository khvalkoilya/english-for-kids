import cards from './cards.js';


const checkbox = document.querySelector('.checkbox__input');
const checkboxText = document.querySelector('.checkbox__text');
checkbox.addEventListener('change',()=>{
    if(checkbox.checked) {
        checkboxText.classList.remove('train');
        checkboxText.classList.add('play');
    }
    else {
        checkboxText.classList.remove('play');
        checkboxText.classList.add('train');
    }
})

