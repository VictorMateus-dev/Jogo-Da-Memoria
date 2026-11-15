
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
const placar1 = document.getElementById('placar1');
const placar2 = document.getElementById('placar2');



const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};


const grid = createElement('div', 'tabuleiro');
partida.appendChild(grid);




let firstCard = '';
let secondCard = '';

//Essa bomba aqui checa se as cartas são iguais
//Nesse primeiro if ele checa. Então para adicionar o placar do jogo vai ter que partir dele
//Já esse segundo ele limpa as variaveis e volta as cartas ao normal, para pular a vez será ai tbm
//O primeiro if tbm limpa as variaveis se não trava e não deixa jogar dnv
const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        
        
        firstCard = '';
        secondCard = '';

        
    } else {   
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
        }, 500);
    }
};



const revealCard = ({ currentTarget }) => {
    if (currentTarget.classList.contains('reveal-card')) {
        return;
    }

    if (firstCard === '') {
        currentTarget.classList.add('reveal-card');
        firstCard = currentTarget;
    } else if (secondCard === '') {
        currentTarget.classList.add('reveal-card');
        secondCard = currentTarget;

        checkCards();
    }
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
    placar1.hidden = false;
    placar2.hidden = false;
});
