// Variables globales
const suits = ['♥', '♦', '♣', '♠']; // Palos de las cartas
const values = ['2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K', 'A']; // Valores de las cartas
let deck = [];
let playerHand = [];
let dealerHand = [];
let playerScore = 0;
let dealerScore = 0;

// Elementos del DOM
const playerCardsDiv = document.getElementById('player-cards');
const dealerCardsDiv = document.getElementById('dealer-cards');
const playerScoreP = document.getElementById('player-score');
const dealerScoreP = document.getElementById('dealer-score');
const resultMessageP = document.getElementById('result-message');
const hitBtn = document.getElementById('hit-btn');
const standBtn = document.getElementById('stand-btn');
const restartBtn = document.getElementById('restart-btn');

// Función para crear el mazo
function createDeck() {
    deck = [];
    for (let suit of suits) {
        for (let value of values) {
            deck.push({ suit, value });
        }
    }
    deck = shuffleDeck(deck);
}

// Función para barajar el mazo
function shuffleDeck(deck) {
    for (let i = deck.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
    return deck;
}

// Función para calcular la puntuación de una mano
function calculateScore(hand) {
    let score = 0;
    let aces = 0;

    for (let card of hand) {
        if (card.value === 'A') {
            aces++;
            score += 11;
        } else if (['K', 'Q', 'J'].includes(card.value)) {
            score += 10;
        } else {
            score += parseInt(card.value);
        }
    }

    // Ajustar el valor de los ases si la puntuación supera 21
    while (score > 21 && aces > 0) {
        score -= 10;
        aces--;
    }

    return score;
}

// Función para mostrar las cartas en el DOM
function displayCards(hand, container) {
    container.innerHTML = '';
    for (let card of hand) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card');
        cardDiv.textContent = `${card.value}${card.suit}`;
        container.appendChild(cardDiv);
    }
}

// Función para actualizar las puntuaciones en el DOM
function updateScores() {
    playerScore = calculateScore(playerHand);
    dealerScore = calculateScore(dealerHand);
    playerScoreP.textContent = `Puntuación: ${playerScore}`;
    dealerScoreP.textContent = `Puntuación: ${dealerScore}`;
}

// Función para repartir cartas iniciales
function dealInitialCards() {
    playerHand = [deck.pop(), deck.pop()];
    dealerHand = [deck.pop(), deck.pop()];
    displayCards(playerHand, playerCardsDiv);
    displayCards(dealerHand, dealerCardsDiv);
    updateScores();
}

// Función para manejar el botón "Pedir Carta"
function hit() {
    playerHand.push(deck.pop());
    displayCards(playerHand, playerCardsDiv);
    updateScores();

    if (playerScore > 21) {
        endGame('¡Te pasaste! El crupier gana.');
    }
}

// Función para manejar el botón "Plantarse"
function stand() {
    while (dealerScore < 17) {
        dealerHand.push(deck.pop());
        dealerScore = calculateScore(dealerHand);
    }
    displayCards(dealerHand, dealerCardsDiv);
    updateScores();

    if (dealerScore > 21) {
        endGame('¡El crupier se pasó! Tú ganas.');
    } else if (playerScore > dealerScore) {
        endGame('¡Ganaste!');
    } else if (playerScore < dealerScore) {
        endGame('El crupier gana.');
    } else {
        endGame('Es un empate.');
    }
}

// Función para manejar el botón "Reiniciar"
function restartGame() {
    resultMessageP.textContent = '';
    createDeck();
    dealInitialCards();
    hitBtn.disabled = false;
    standBtn.disabled = false;
}

// Función para finalizar el juego
function endGame(message) {
    resultMessageP.textContent = message;
    hitBtn.disabled = true;
    standBtn.disabled = true;
}

// Inicializar el juego
createDeck();
dealInitialCards();

// Event Listeners
hitBtn.addEventListener('click', hit);
standBtn.addEventListener('click', stand);
restartBtn.addEventListener('click', restartGame);

function displayCards(hand, container) {
    container.innerHTML = '';
    for (let card of hand) {
        const cardDiv = document.createElement('div');
        cardDiv.classList.add('card'); // Clase para aplicar la animación
        cardDiv.textContent = `${card.value}${card.suit}`;
        container.appendChild(cardDiv);
    }
}