import {GameConstants} from "./GameConstants";


export class Game {
    private gameTime:number;
    private computerMoves:Array<string>;
    private playerMoves:Array<string>;
    private moveCount:number;
    private highScore:number;
    private isPlayerTurn:boolean;
    private isGameActive:boolean;
    private hasNewPlayerMove:boolean;


    public constructor() {
        this.computerMoves = [];
        this.gameTime = 0.0;
        this.moveCount = 0;
        this.highScore = 0;
        this.isPlayerTurn = false;
        this.isGameActive = false;
        this.hasNewPlayerMove = false;
        this.activateListeners();

    }

    public clearGame() {
        this.computerMoves = [];
        this.playerMoves = [];
        this.moveCount = 0;
        this.gameTime = 0.0;
    }

    public clearPlayer() {
        this.playerMoves = [];
    }

    public addMove() {
        //generate move
        this.generateMove();

        //update move counter
        this.moveCount++;
        document.getElementById('click_number').innerText = this.moveCount.toString();
    }

    public generateMove() {
        this.computerMoves.push(GameConstants.COLORS[Math.floor(Math.random() * 4)]);
    }

    public showMoves(moveArray:Array<string>) {
        let i = 0;
        let interval = setInterval (() => {
            if (i < moveArray.length) {
                this.playSound(moveArray[i]);
                this.lightUpButton(moveArray[i]);
                i++
            }
            else {
                clearInterval(interval);
            }
        }, 750);
    }

    public lightUpButton(button:string) {
        //set hover state
        $('#' + button+'_game_button').addClass(button + '_hover');
        //remove hover state after set time
        setTimeout(function () {
            $('#' + button+'_game_button').removeClass(button + '_hover');
        }, 300);
    }

    public playSound(button:string) {
        console.log('in play sound, button color: '+button);
        GameConstants.SOUNDS.get(button).play();
    }

    public computerTurn() {
        console.log('in computer turn');
        this.addMove();
        this.showMoves(this.computerMoves);
        this.clearPlayer();
    }

    public activateListeners() {
        document.getElementById('red_game_button').addEventListener('click', () => {
            console.log('i booped the boop');
            this.playerMoves.push('red');
            this.hasNewPlayerMove = true;
        });
        document.getElementById('teal_game_button').addEventListener('click', () => {
            this.playerMoves.push('teal');
            this.hasNewPlayerMove = true;
        });
        document.getElementById('purple_game_button').addEventListener('click', () => {
            this.playerMoves.push('purple');
            this.hasNewPlayerMove = true;
        });
        document.getElementById('yellow_game_button').addEventListener('click', () => {
            this.playerMoves.push('yellow');
            this.hasNewPlayerMove = true;
        });
    }

    public awaitPlayerMove() {
        this.playerMoves.forEach( function(element) {
           console.log(element);
        });

        if (!this.isPlayerTurn) {
            return;
        }
        if (this.hasNewPlayerMove) {
            console.log('in await player move, player moves size : ' + this.playerMoves.length);
            console.log('in await player move, button: ' + this.playerMoves[this.playerMoves.length -1 ]);
            let validMove = this.checkPlayerMove(this.playerMoves[this.playerMoves.length -1]);
            this.hasNewPlayerMove = false;
            if (!validMove) {
                console.log('in invalid move conditional');
                this.isPlayerTurn = false;
                this.isGameActive = false;
            }
            if (this.playerMoves.length == this.computerMoves.length) {
                console.log('in await player move, ending loop')
                this.isPlayerTurn = false;
            }
        }
        else {
            setTimeout(() => { this.awaitPlayerMove(); }, 10);
        }

    }

    public checkPlayerMove(button:string):boolean {
        let isValidMove:boolean = false;
        console.log('in check player move, button: '+ button);
        this.showMoves(this.playerMoves);
        if (this.playerMoves[this.playerMoves.length - 1] === this.computerMoves[this.playerMoves.length - 1]) {
            isValidMove = true;
        }
        else {
            //this.playSound('fail');
        }
        return isValidMove;
    }

    public startGame() {
        // this.clearGame();
        this.isGameActive = true;

        // while (this.isGameActive) {
            this.computerTurn();
            this.isPlayerTurn = true;
            this.awaitPlayerMove();
        // }
        
        // if (this.computerMoves.length > this.highScore) {
        //     this.highScore = this.computerMoves.length;
        //     window.alert("new high score of " + this.highScore + " :D");
        //     document.getElementById('high_score').innerText = 'High Score: '+this.highScore;
        // }
    }

}