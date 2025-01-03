import Piece from './Piece.js';

class Board {
    constructor() {
        this.BOARD_SIZE = 10;
        this.grid = [];
        this.selectedPiece = null;
        this.possibleMoves = [];
        this.init();
    }

    init() {
        const boardElement = document.getElementById('plateau');
        boardElement.innerHTML = '';

        for (let row = 0; row < this.BOARD_SIZE; row++) {
            this.grid[row] = [];
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                this.createCell(row, col, boardElement);
            }
        }
    }

    createCell(row, col, boardElement) {
        const cell = document.createElement('div');
        cell.className = `case ${(row + col) % 2 === 0 ? 'case-claire' : 'case-foncee'}`;
        cell.dataset.row = row;
        cell.dataset.col = col;

        if ((row + col) % 2 !== 0) {
            if (row < 4) {
                this.grid[row][col] = new Piece(row, col, 2);
                this.grid[row][col].render(cell);
            } else if (row > 5) {
                this.grid[row][col] = new Piece(row, col, 1);
                this.grid[row][col].render(cell);
            } else {
                this.grid[row][col] = null;
            }
        } else {
            this.grid[row][col] = null;
        }

        boardElement.appendChild(cell);
    }

    getPiece(row, col) {
        return this.grid[row][col];
    }

    selectPiece(row, col) {
        this.unselectPiece();
        const piece = this.getPiece(row, col);
        if (piece) {
            this.selectedPiece = piece;
            piece.select();
            this.possibleMoves = piece.calculatePossibleMoves(this);
            this.highlightPossibleMoves();
        }
    }

    unselectPiece() {
        if (this.selectedPiece) {
            const cell = document.querySelector(`[data-row="${this.selectedPiece.row}"][data-col="${this.selectedPiece.col}"]`);
            cell.querySelector('.pion').classList.remove('selectionne');
            this.clearHighlights();
            this.selectedPiece = null;
            this.possibleMoves = [];
        }
    }

    highlightPossibleMoves() {
        this.possibleMoves.forEach(move => {
            document.querySelector(`[data-row="${move.row}"][data-col="${move.col}"]`)
                .classList.add('case-possible');
        });
    }

    clearHighlights() {
        document.querySelectorAll('.case-possible')
            .forEach(cell => cell.classList.remove('case-possible'));
    }

    movePiece(move) {
        const { row: fromRow, col: fromCol } = this.selectedPiece;
        const { row: toRow, col: toCol } = move;

        this.grid[toRow][toCol] = this.selectedPiece;
        this.grid[fromRow][fromCol] = null;

        this.selectedPiece.row = toRow;
        this.selectedPiece.col = toCol;

        if (move.capture) {
            this.grid[move.capture.row][move.capture.col] = null;
            document.querySelector(`[data-row="${move.capture.row}"][data-col="${move.capture.col}"] .pion`).remove();
        }

        const fromCell = document.querySelector(`[data-row="${fromRow}"][data-col="${fromCol}"]`);
        const toCell = document.querySelector(`[data-row="${toRow}"][data-col="${toCol}"]`);
        const pieceElement = fromCell.querySelector('.pion');
        fromCell.removeChild(pieceElement);
        toCell.appendChild(pieceElement);

        this.checkForKing(this.selectedPiece);

        this.unselectPiece();
    }

    checkForKing(piece) {
        if ((piece.player === 1 && piece.row === 0) || 
            (piece.player === 2 && piece.row === this.BOARD_SIZE - 1)) {
            piece.isKing = true;
            document.querySelector(`[data-row="${piece.row}"][data-col="${piece.col}"] .pion`)
                .classList.add('dame');
        }
    }

    calculateScores() {
        const scores = { 1: 0, 2: 0 };
        for (let row = 0; row < this.BOARD_SIZE; row++) {
            for (let col = 0; col < this.BOARD_SIZE; col++) {
                const piece = this.grid[row][col];
                if (piece) {
                    scores[piece.player]++;
                }
            }
        }
        return scores;
    }

    isValidPosition(row, col) {
        return row >= 0 && row < this.BOARD_SIZE && col >= 0 && col < this.BOARD_SIZE;
    }
}

export default Board;
