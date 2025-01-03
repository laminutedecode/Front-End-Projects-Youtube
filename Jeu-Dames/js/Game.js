import AI from './AI.js';
import Board from './Board.js';

class Game {
    constructor() {
        this.state = {
            currentPlayer: 1,
            isAIPlaying: false
        };

        this.PLAYERS = {
            HUMAN: 1,
            AI: 2
        };

        this.board = new Board();
        this.ai = new AI(this);
        this.init();
    }

    init() {
        this.initEvents();
        this.updateInterface();
    }

    initEvents() {
        document.getElementById('plateau').addEventListener('click', (e) => this.handleClick(e));
        document.getElementById('nouvelle-partie').addEventListener('click', () => this.newGame());
    }

    handleClick(event) {
        if (this.state.currentPlayer === this.PLAYERS.AI || this.state.isAIPlaying) return;

        const cell = event.target.closest('.case');
        if (!cell) return;

        const row = parseInt(cell.dataset.row);
        const col = parseInt(cell.dataset.col);

        if (this.board.selectedPiece) {
            this.handleSelectedPieceMove(row, col);
        } else if (this.board.getPiece(row, col)?.player === this.PLAYERS.HUMAN) {
            this.board.selectPiece(row, col);
        }
    }

    handleSelectedPieceMove(row, col) {
        const move = this.board.possibleMoves.find(m => m.row === row && m.col === col);
        if (move) {
            this.board.movePiece(move);
            this.switchPlayer();
        } else {
            this.board.unselectPiece();
        }
    }

    switchPlayer() {
        this.state.currentPlayer = this.state.currentPlayer === this.PLAYERS.HUMAN ? 
            this.PLAYERS.AI : this.PLAYERS.HUMAN;

        this.updateInterface();

        if (this.state.currentPlayer === this.PLAYERS.AI) {
            setTimeout(() => this.ai.play(), 500);
        }
    }

    updateInterface() {
        const scores = this.board.calculateScores();
        document.getElementById('score-j1').textContent = scores[this.PLAYERS.HUMAN];
        document.getElementById('score-j2').textContent = scores[this.PLAYERS.AI];

        document.getElementById('joueur-actuel').textContent = 
            this.state.currentPlayer === this.PLAYERS.HUMAN ? "1 (Vous)" : "2 (IA)";

        if (scores[this.PLAYERS.HUMAN] === 0 || scores[this.PLAYERS.AI] === 0) {
            const winner = scores[this.PLAYERS.HUMAN] === 0 ? "L'IA" : "Vous";
            setTimeout(() => alert(`${winner} avez gagné !`), 100);
        }
    }

    newGame() {
        location.reload();
    }
}

export default Game;