import {Game} from "./Game";

let game:Game = new Game();
let continueButton = document.getElementById("debug_continue_button");

continueButton.addEventListener("click", () => {
        game.startGame();
});


