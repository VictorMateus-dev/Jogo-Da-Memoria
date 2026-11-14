const btnIniciar = document.getElementById('btn_iniciar');
const menu = document.getElementById('menu');
const partida = document.getElementById('partida');

btnIniciar.addEventListener('click', iniciarPartida);

function iniciarPartida() {
    console.log('Iniciando a partida...');
    menu.hidden = true;
    partida.hidden = false;
}

