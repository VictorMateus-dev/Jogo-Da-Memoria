
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
const pontosPlayer1 = document.getElementById('pontos-player1');
const pontosPlayer2 = document.getElementById('pontos-player2');
const statusPlayer1 = document.getElementById('status-player1');
const statusPlayer2 = document.getElementById('status-player2');

const TEMPO_JOGADA = 30;
const TOTAL_PARES = 8;



const createElement = (tag, className) => {
    const element = document.createElement(tag);
    element.className = className;
    return element;
};


const grid = createElement('div', 'tabuleiro');
partida.appendChild(grid);




let firstCard = '';
let secondCard = '';

let jogadorAtual = 1;
let pontos = { 1: 0, 2: 0 };
let paresAchados = 0;
let timer = null;
let tempoRestante = TEMPO_JOGADA;


const atualizarPlacar = () => {
    pontosPlayer1.textContent = pontos[1];
    pontosPlayer2.textContent = pontos[2];

    const textoVez = `SUA VEZ - ${tempoRestante}s`;
    statusPlayer1.textContent = jogadorAtual === 1 ? textoVez : 'AGUARDANDO';
    statusPlayer2.textContent = jogadorAtual === 2 ? textoVez : 'AGUARDANDO';
    statusPlayer1.classList.toggle('ativo', jogadorAtual === 1);
    statusPlayer2.classList.toggle('ativo', jogadorAtual === 2);
};


const pararTimer = () => {
    clearInterval(timer);
    timer = null;
};

const iniciarTimer = () => {
    pararTimer();
    tempoRestante = TEMPO_JOGADA;
    atualizarPlacar();

    timer = setInterval(() => {
        tempoRestante--;
        atualizarPlacar();

        if (tempoRestante <= 0) {
            pararTimer();

            if (firstCard !== '') {
                firstCard.classList.remove('reveal-card');
                firstCard = '';
            }

            trocarVez();
        }
    }, 1000);
};


const trocarVez = () => {
    jogadorAtual = jogadorAtual === 1 ? 2 : 1;
    iniciarTimer();
};


const fimDeJogo = () => {
    pararTimer();

    let mensagem = 'Empate!';
    if (pontos[1] > pontos[2]) mensagem = 'Player 1 venceu!';
    if (pontos[2] > pontos[1]) mensagem = 'Player 2 venceu!';

    setTimeout(() => {
        const jogarDeNovo = confirm(`${mensagem}\n\nPlayer 1: ${pontos[1]}  |  Player 2: ${pontos[2]}\n\nJogar de novo?`);

        if (jogarDeNovo) {
            novaPartida();
        } else {
            menu.hidden = false;
            partida.hidden = true;
            placar1.hidden = true;
            placar2.hidden = true;
        }
    }, 600);
};

const checkCards = () => {
    const firstCharacter = firstCard.getAttribute('data-character');
    const secondCharacter = secondCard.getAttribute('data-character');

    if (firstCharacter === secondCharacter) {
        pontos[jogadorAtual]++;
        paresAchados++;

        firstCard = '';
        secondCard = '';

        if (paresAchados === TOTAL_PARES) {
            atualizarPlacar();
            fimDeJogo();
        } else {
            iniciarTimer();
        }

    } else {
        setTimeout(() => {
            firstCard.classList.remove('reveal-card');
            secondCard.classList.remove('reveal-card');
            firstCard = '';
            secondCard = '';
            trocarVez();
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

        pararTimer();
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

const novaPartida = () => {
    pararTimer();
    pontos = { 1: 0, 2: 0 };
    paresAchados = 0;
    jogadorAtual = 1;
    firstCard = '';
    secondCard = '';

    loadGame();
    iniciarTimer();
};

btnIniciar.addEventListener('click', () => {
    novaPartida();
    menu.hidden = true;
    partida.hidden = false;
    placar1.hidden = false;
    placar2.hidden = false;
});
