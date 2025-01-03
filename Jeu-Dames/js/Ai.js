class AI {
  constructor(game) {
    this.game = game;
  }

  play() {
    this.game.state.isAIPlaying = true;
    const move = this.calculateBestMove();
    if (move) {
      setTimeout(() => {
        this.game.board.selectPiece(move.piece.row, move.piece.col);
        this.game.board.movePiece(move.move);
        this.game.state.isAIPlaying = false;
        this.game.switchPlayer();
      }, 500);
    }
  }

  calculateBestMove() {
    const possibleMoves = this.getAllPossibleMoves();
    if (possibleMoves.length === 0) return null;

    const capturesOnly = possibleMoves.filter(m => m.move.capture);
    if (capturesOnly.length > 0) {
      return this.selectBestCapture(capturesOnly);
    }

    return this.selectBestPositionalMove(possibleMoves);
  }

  getAllPossibleMoves() {
    const moves = [];
    for (let row = 0; row < this.game.board.BOARD_SIZE; row++) {
      for (let col = 0; col < this.game.board.BOARD_SIZE; col++) {
        const piece = this.game.board.getPiece(row, col);
        if (piece && piece.player === 2) {
          const pieceMoves = piece.calculatePossibleMoves(this.game.board);
          pieceMoves.forEach(move => {
            moves.push({
              piece: piece,
              move: move
            });
          });
        }
      }
    }
    return moves;
  }

  selectBestCapture(captures) {
    const scoredCaptures = captures.map(capture => ({
      ...capture,
      score: this.evaluateCapture(capture)
    }));

    return this.selectBestMove(scoredCaptures);
  }

  evaluateCapture(capture) {
    let score = 10;
    if (capture.piece.isKing) score += 2;

    const capturedPiece = this.game.board.getPiece(
      capture.move.capture.row,
      capture.move.capture.col
    );
    if (capturedPiece && capturedPiece.isKing) score += 3;

    score += this.evaluatePosition(capture.move.row, capture.move.col);

    return score;
  }

  selectBestPositionalMove(moves) {
    const scoredMoves = moves.map(move => ({
      ...move,
      score: this.evaluatePosition(move.move.row, move.move.col)
    }));

    return this.selectBestMove(scoredMoves);
  }

  evaluatePosition(row, col) {
    let score = 0;
    score += (row / this.game.board.BOARD_SIZE) * 2;

    const distanceFromCenter = Math.abs(col - this.game.board.BOARD_SIZE / 2);
    score += (this.game.board.BOARD_SIZE / 2 - distanceFromCenter) / 2;

    if (col === 0 || col === this.game.board.BOARD_SIZE - 1) score += 1;

    return score;
  }

  selectBestMove(scoredMoves) {
    const maxScore = Math.max(...scoredMoves.map(m => m.score));
    const bestMoves = scoredMoves.filter(m => m.score === maxScore);
    return bestMoves[Math.floor(Math.random() * bestMoves.length)];
  }
}

export default AI;
