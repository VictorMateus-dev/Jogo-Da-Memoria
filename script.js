const cards = [
    'cirilla',
    'dandelion',
    'eredin',
    'geralt',
    'griffin',
    'leshen',
    'triss',
    'yennefer'
];

const menu = document.getElementById('menu');
const partida = document.getElementById('partida');
const btnIniciar = document.getElementById('btn_iniciar');


const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};

const grid = createElement('div', 'tabuleiro');
partida.appendChild(grid);


const revealCard = ({ currentTarget }) => {
    currentTarget.classList.add('reveal-card');
};

const createCard = (character) => {
    const card = createElement('div', 'carta');
    const content = createElement('div', 'conteudo');
    const front = createElement('div', 'frente');
    const back = createElement('div', 'verso');

    front.style.backgroundImage = `url('Cards/${character}.jpg')`;
    back.style.backgroundImage = "url('Cards/verso-monstros.jpg')";

    content.appendChild(front);
    content.appendChild(back);
    card.appendChild(content);

    card.addEventListener('click', revealCard);
    card.setAttribute('data-character', character);
    
    return card;
};


const loadGame = () => {
    grid.innerHTML = '';

    const duplicateCards = [...cards, ...cards];
    const shuffledArray = duplicateCards.sort(() => Math.random() - 0.5);

    shuffledArray.forEach((character) => {
        const card = createCard(character);
        grid.appendChild(card);
    });
};

btnIniciar.addEventListener('click', () => {
    loadGame();
    menu.hidden = true;
    partida.hidden = false;
});
