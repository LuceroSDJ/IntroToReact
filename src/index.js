import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';

//this class basically renders an empty button
//To check for a winner, we’ll maintain the value of each of the 9 squares in one location.
//'the best approach is to store the game’s state in the parent Board component instead of in each Square'
//this is a controlled component
class Square extends React.Component {
  render() {
    return (
      <button 
        className="square" 
        onClick={() => this.props.onClik()}
        //'By calling this.setState from an onClick handler in the Square’s render method, 
        //we tell React to re-render that Square whenever its <button> is clicked.'
      > 
        {this.props.value}
      </button>
    );
  }
}


class Board extends React.Component {
  //'The Board component now maintains which squares are filled.' 
  constructor(props) {
    super(props);
    this.state = {
      //'Array.fill works great for immutable values like numbers, strings, and booleans.' (Source: Sophia Shoemaker)
      //It sets up an array with 9 slots and populates it with null values 
      squaresArray: Array(9).fill(null),
    }
  }

  handleClick(i) {
    const squares = this.state.squaresArray.slice();
    //'the slice() method returns a shallow copy of a portion of an array into a new array object' without modifying the original array. (MDN)
    squares[i] = 'X';
    this.setState({squaresArray: squares});
  }
  
  renderSquare(i) {
    //pass a prop called value to the Square:
    return (
      <Square 
        //'Now we’re passing down two props from Board to Square:'
        value={this.state.squaresArray[i]}
        onClik={() => this.handleClick(i)}
      />  
    );
  }

  render() {
    const status = 'Next player: X';

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}



class Game extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}
  
  // ========================================

  
ReactDOM.render(
    <Game />,
    document.getElementById('root')
);

//notes: 'Congratulations! You’ve just “passed a prop” from a parent Board component to a child Square component. 
//Passing props is how information flows in React apps, from parents to children.

