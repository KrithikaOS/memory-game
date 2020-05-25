import { cardDB } from './CardsDataBase.js';
import './CardComponent.js';
export let memoryCards = [],
    cardsFlipped = 0;
export let selection = { currentSelection: [], cardsSelected: [], cardsSelectedIDs: [] };
export let target = [];



export function validateCards({ currentSelection: card, cardsSelected: cardsVal, cardsSelectedIDs: cardsID }) {
    target.push(card);
    card.style.background = '#FFF';
    let val = memoryCards[card.id];
    card.innerHTML = val;
    //console.log(`inside validate cards ${memoryCards[card.id]}`);
    cardsVal.push(memoryCards[card.id]);
    cardsID.push(card.id);
    if (cardsVal.length === 2) {
        console.log("inside cardsVal.length");
        if (cardsVal[0] === cardsVal[1]) {
            cardsFlipped += 2;
            // remove the value and ID of the two tiles selected from the arrays
            cardsVal.length = 0;
            cardsID.length = 0;
            target.length = 0;
            // Check to see if the whole board is cleared
            if (cardsFlipped === memoryCards.length) {
                if (confirm("Yaayyy...board cleared. Do you want to start a new game?")) {
                    document.getElementById('panel').innerHTML = "";
                    location.reload();
                }
            }
        } else {
            function flipBack({ cardsSelected: cardsVal, cardsSelectedIDs: cardsID } = selection) {
                // Flip the 2 tiles back over
                let id1 = cardsID[0],
                    id2 = cardsID[1];
                //console.log(`id1 ${id1} and id2 ${id2}`);
                let card1 = target[0];
                let card2 = target[1];
                // console.log("card1" + card1);
                card1.style.background = 'url(../cardTemplate.jpg) no-repeat';
                card1.innerHTML = "";
                card2.style.background = 'url(../cardTemplate.jpg) no-repeat';
                card2.innerHTML = "";
                // remove the value and ID of the two tiles selected from the arrays
                cardsVal.length = 0;
                cardsID.length = 0;
                target.length = 0;
            }
            setTimeout(flipBack, 700);
        }

    }
}

function GameBoard(grid = 6, players = 1, theme = "sun") {
    this.grid = grid;
    this.players = players;
    this.theme = theme;
}


GameBoard.prototype.createGame = function() { //to create a gameboard with cards
    memoryCards = cardDB.slice(0, this.grid * this.grid);
    memoryCards.shuffle();
    let panel = document.querySelector('div');
    memoryCards.forEach(card => {
        const newCard = document.createElement('game-card');
        panel.appendChild(newCard);
    });
}
Array.prototype.shuffle = function() { //algorithm to shuffle the cards
    let i = this.length,
        randomPos, temp;
    while (--i > 0) {
        randomPos = Math.floor(Math.random() * (i + 1));
        temp = this[randomPos];
        this[randomPos] = this[i];
        this[i] = temp;
    }

}

const game = new GameBoard();
game.createGame();