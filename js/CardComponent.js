import { memoryCards, cardsFlipped, selection, target } from './MemoryGame.js';
import { validateCards } from './MemoryGame.js';

let i = -1;


/*const template = document.createElement('template');
template.innerHTML = `<style>  .game-card {
background: url(../cardTemplate.jpg) no-repeat;
border: #000 1px solid;
width: 71px;
height: 30px;
float: left;
margin: 10px;
padding: 10px;
font-size: 10px;
cursor: pointer;
text-align: center;
}</style>
<div id="gc" name="game-card" class= "game-card"></div>` */

class GameCard extends HTMLElement {
    constructor() {
        super();
        this.i = i++;
        this.attachShadow({ mode: 'open' });
        //   this.shadowRoot.appendChild(template.content.cloneNode(true));
        this.shadowRoot.innerHTML = `<style>  .game-card {
        background: url(../cardTemplate.jpg) no-repeat;
        border: #000 1px solid;
        width: 71px;
        height: 30px;
        float: left;
        margin: 10px;
        padding: 20px;
        font-size: 30px;
        cursor: pointer;
        text-align: center;
        }</style>
        <div id= ${i} name="game-card" class= "game-card"></div>`

    }

    connectedCallback() {
        //  console.log("inside connected call back");
        this.shadowRoot.querySelector('div').addEventListener("click", function(e) {
            selection.currentSelection = e.target;
            console.log("inside event " + e.target);
            console.log(e.target.id);
            console.log(`${e.target.nodeName} and ${e.target.innerHTML} and ${selection.cardsSelected.length}`);
            if (e.target.innerHTML == "" && selection.cardsSelected.length < 2) {
                validateCards(selection);
            }
        });
    }
}

customElements.define('game-card', GameCard);