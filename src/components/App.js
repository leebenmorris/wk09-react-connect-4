import React from 'react';
import '../css/App.css';

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      board: this.newBoard(7, 6),
      player1: 'red',
      player2: 'yellow',
      currPlayer: 'red',
      winner: null,
      redWins: 0,
      yellowWins: 0
    };
  }

  render() {
    return (
      <div className='container'>
        <div>
          <h1 className='heading'>Connect 4 Game</h1>
          {/*<CurrPlayerArea colour={this.counterColour(this.state.currPlayer)} />*/}
          {this.drawBoard()}
          {this.alertWinner()}
          {this.winnersArea()}
          {this.resetArea()}
        </div >
      </div>
    );
  }

  newBoard(width, height) {
    const board = [];
    for (let row = 0; row < height; row++) {
      board.push([]);
      for (let col = 0; col < width; col++) {
        board[row].push(null);
      }
    }
    return board;
  }

  resetArea() {
    return (
      <div>
        <h1
          className='reset'
          onClick={e => this.resetHandler(e)}
        >
          RESET GAME
        </h1>
      </div>
    );
  }

  winnersArea() {
    return (
      <div className='winners'>
        <h1>
          <div
            className={['red', 'counter'].join(' ')}
          >
            {null}
          </div>  Wins: {this.state.redWins}
        </h1>
        <h1>
          <div
            className={['yellow', 'counter'].join(' ')}
          >
            {null}
          </div>  Wins: {this.state.yellowWins}
        </h1>
      </div>
    );
  }

  drawBoard() {
    return (
      <div>
        <table className='white'>
          <tr>
            {this.state.board[0].map((col, j) =>
              <td
                key={j}
                className={[this.counterColour(this.state.currPlayer), 'selectCounter'].join(' ')}
                onClick={e => this.clickHandler(j, e)}
              >
                {null}
              </td>
            )}
          </tr>
        </table>
        <table>
          {this.state.board.map((row, i) =>
            <tr key={i}>
              {row.map((col, j) =>
                <td
                  key={j}
                  className={this.counterColour(col)}
                >
                  {null}
                </td>
              )}
            </tr>
          )}
        </table>
      </div>
    );
  }

  counterColour(val) {
    return ({
      [this.state.player1]: 'red',
      [this.state.player2]: 'yellow'
    })[val] || 'white';
  }

  resetHandler(e) {
    e.preventDefault();
    this.setState(prevState => ({
      board: this.newBoard(7, 6),
      currPlayer: prevState.player1,
      winner: null,
      redWins: 0,
      yellowWins: 0
    }));
  }

  clickHandler(col, e) {
    e.preventDefault();
    this.setState(prevState => {
      const newBoard = prevState.board.slice();
      for (let row = newBoard.length - 1; row >= 0; row--) {
        if (newBoard[row][col] === null) {
          newBoard[row] = newBoard[row].slice();
          newBoard[row][col] = prevState.currPlayer;
          return {
            board: newBoard,
            currPlayer: prevState.currPlayer === prevState.player1 ? prevState.player2 : prevState.player1,
            winner: this.checkWinner(newBoard, prevState.player1, prevState.player2)
          };
        }
      }
    });
  }

  checkWinner(board, player1, player2) {
    let rows = board.length;
    let count = { [player1]: 0, [player2]: 0 };

    for (let row = 0; row < rows; row++) {
      board[row].forEach(cell => count[cell]++);
    }

    let player1Win = this.whoWinner(board, player1);
    let player2Win = this.whoWinner(board, player2);

    if (player2Win && player1Win) {
      if (count[player1] < count[player2]) return player1;
      if (count[player2] < count[player1]) return player2;
    } else {
      if (player2Win) return player2;
      if (player1Win) return player1;
    }
    return null;
  }

  whoWinner(board, player, winLength = 4) {
    let rows = board.length;
    for (let row = 0; row < rows; row++) {
      let cols = board[row].length;
      for (let col = 0; col < cols; col++) {
        if (board[row][col] === player) {
          let diagF = 1;
          let diagR = 1;
          let fwd = 1;
          let down = 1;
          for (let i = 1; i < winLength; i++) {
            if (row + i < rows) {
              if (col + i < cols && board[row + i][col + i] === player) diagF++;
              if (diagF === winLength) return true;

              if (col - i >= 0 && board[row + i][col - i] === player) diagR++;
              if (diagR === winLength) return true;

              if (board[row + i][col] === player) down++;
              if (down === winLength) return true;
            }
            if (col + i < cols && board[row][col + i] === player) fwd++;
            if (fwd === winLength) return true;
          }
        }
      }
    }
    return false;
  }

  alertWinner() {
    if (this.state.winner) {
      setTimeout(() => {
        this.setState(prevState => {
          const winner = prevState.winner[0].toUpperCase() + prevState.winner.slice(1).toLowerCase();
          alert(`${winner} player wins!`);

          return {
            board: this.newBoard(7, 6),
            currPlayer: prevState.player1,
            winner: null,
            redWins: prevState.redWins + (prevState.winner === prevState.player1 ? 1 : 0),
            yellowWins: prevState.yellowWins + (prevState.winner === prevState.player2 ? 1 : 0)
          };
        });
      }, 50);
    }
  }
}

const CurrPlayerArea = props =>
  <div className='currPlayerArea'>
    <h1 className='currText'>
      Current Player:
      <div className={[props.colour, 'counter'].join(' ')} >
        {null}
      </div>
    </h1>
  </div>;

export default App;