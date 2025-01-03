class Piece {
  constructor(row, col, player) {
      this.row = row;
      this.col = col;
      this.player = player;
      this.isKing = false;
  }

  render(cell) {
      const piece = document.createElement('div');
      piece.className = `pion pion-j${this.player}${this.isKing ? ' dame' : ''}`;
      cell.appendChild(piece);
  }

  select() {
      const cell = document.querySelector(`[data-row="${this.row}"][data-col="${this.col}"]`);
      cell.querySelector('.pion').classList.add('selectionne');
  }

  calculatePossibleMoves(board) {
      const moves = [];
      const directions = this.isKing ? 
          [{row: -1, col: -1}, {row: -1, col: 1}, {row: 1, col: -1}, {row: 1, col: 1}] : 
          [{row: this.player === 1 ? -1 : 1, col: -1}, {row: this.player === 1 ? -1 : 1, col: 1}];

      const captures = this.calculateCaptures(board, directions);
      if (captures.length > 0) {
          return captures;
      }

      directions.forEach(dir => {
          const newRow = this.row + dir.row;
          const newCol = this.col + dir.col;

          if (board.isValidPosition(newRow, newCol) && !board.getPiece(newRow, newCol)) {
              moves.push({ row: newRow, col: newCol });
          }
      });

      return moves;
  }

  calculateCaptures(board, directions) {
      const captures = [];

      directions.forEach(dir => {
          const captureRow = this.row + dir.row;
          const captureCol = this.col + dir.col;
          const landingRow = captureRow + dir.row;
          const landingCol = captureCol + dir.col;

          if (board.isValidPosition(landingRow, landingCol)) {
              const potentialCapture = board.getPiece(captureRow, captureCol);
              const landingSquare = board.getPiece(landingRow, landingCol);

              if (potentialCapture && 
                  potentialCapture.player !== this.player && 
                  !landingSquare) {
                  captures.push({
                      row: landingRow,
                      col: landingCol,
                      capture: {
                          row: captureRow,
                          col: captureCol
                      }
                  });
              }
          }
      });

      return captures;
  }
}

export default Piece;
