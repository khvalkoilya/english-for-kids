import cards from './cards.js';


const checkbox = document.querySelector('.checkbox__input');
const checkboxText = document.querySelector('.checkbox__text');
let isTrain = true;
let currentPage="Main Page";

mainPageBlock();

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
    if(currentPage === "Main Page") document.querySelectorAll('.topic-card').forEach((item)=>item.classList.toggle('topic-card_play'));
});

document.querySelector('.burger').addEventListener('click', sideMenu)
function sideMenu() {
    document.querySelector('.side-menu').classList.toggle('side-menu_active');
    document.querySelector('.burger').classList.toggle('burger_active');
};


document.querySelector('body').addEventListener('click', (e)=>{
    if(document.querySelector('.side-menu').classList.contains('side-menu_active') && (!e.target.classList.contains('burger') && !e.target.parentElement.classList.contains('burger'))) {
        document.querySelector('.side-menu').classList.remove('side-menu_active');
        document.querySelector('.burger').classList.remove('burger_active');
    }

})

document.querySelectorAll(".link").forEach((elem)=>elem.addEventListener('click', ()=>{
    document.querySelectorAll(".link").forEach((e)=>e.classList.remove('link_active'));
    elem.classList.add('link_active');
    sideMenu();
    currentPage = elem.innerHTML;
    if(currentPage == "Main Page") mainPageBlock();
    else cardPageBlock();
}));

function mainPageBlock() {
    const page = document.createElement('section');
    page.className="main-page";
    cards[0].forEach((item) => {
        const card = document.createElement('div');
        card.className = 'topic-card';
        card.innerHTML = `<div class="topic-card__image-block"><img class="topic-card__image-block__image" src="${item.image}"></img></div>`
        card.innerHTML += `<p class="topic-card__name">${item.name}</p>`;
        page.append(card);
    });
    console.log(page) 
    document.querySelector('main > .wrapper').append(page);
};
