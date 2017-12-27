import React, { Component } from 'react'
import {Stage} from 'react-konva'
import {Board, Squares} from '../../styled/game/TicTacToe'
import Relay from 'react-relay/classic'
import TuringTest from '../../styled/TuringTest'
import CreateGame from '../../mutations/CreateGame'

class TicTacToe extends Component {
  constructor (props){
    super(props)
    this.combos = [
      [0,1,2],
      [3,4,5],
      [6,7,8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],

    ]

    this.initialState = {
      rows: 3,
      gameState: new Array(9).fill(false),
      ownMark: 'X',
      otherMark: 'O',
      gameOver: false,
      yourTurn: true,
      winner: false,
      win: false
    }
    this.state = {
      ...this.initialState
    }
  }

  componentWillMount(){
    let height = window.innerHeight;
    let width = window.innerWidth;
    let size = (height < width ) ? height * 0.8 : width * 0.8;
    let rows = this.state.rows;

    let unit = size/rows;
    let coordinates = [];

    for (let y = 0; y < rows; y++) {
        for (let x = 0; x < rows; x++){
          coordinates.push([x*unit, y*unit])
        }
    }
    this.setState({
      size,
      rows,
      unit,
      coordinates

    })

  }
  random = (min, max) =>{
    min = Math.floor(min)
    max = Math.floor(max)

    return Math.floor( Math.random() * (max-min) + min)
  }
  winChecker = (gameState) => {
    let combos = this.combos;

    return combos.find( (combo) => {
        let [a, b, c] = combo;
        return ( gameState[a] === gameState[b] && gameState[a] === gameState[c] && gameState[a])
    })
  }
  move = (marker, index)=>{

    this.setState( (prevState, prop) =>{
      let {gameState, yourTurn, gameOver, winner} = prevState;
      yourTurn = !yourTurn;

      gameState.splice(index, 1, marker);
      let hasWinner = this.winChecker(gameState);

      if ( hasWinner ) {
        winner = gameState[hasWinner[0]]
      }

      if ( hasWinner || !gameState.includes(false)){
        gameOver = true;
      }


      if ( !yourTurn && !gameOver){
        console.info('make ai move')
        setTimeout( ()=>{
          this.makeAiMove(gameState)
        }, 500*this.random(1,2))

      }
      // if (gameOver || !yourTurn) {
      //   return { gameOver, yourTurn, winner, win: hasWinner || false }
      // }
      return {
        gameState,
        yourTurn,
        gameOver,
        win: hasWinner || false,
        winner
      }
    })
    console.info('move')
  }
  makeAiMove = (gameState)=>{

      let otherMarker = this.state.otherMark
      let openSquares = []

      gameState.forEach( (square, index) => {
          if (!square){
            openSquares.push(index)
          }
      })

      let aiMove = openSquares[this.random(0, openSquares.length)]
      this.move(otherMarker, aiMove)
  }
  turingTest = () => {
    if (this.state.gameOver){
      return (
        <TuringTest
          recordGame={this.recordGame.bind(this)}
          />
      )
    }
  }
  recordGame = (guess) => {
    let {user} = this.props.viewer
    let {relay} = this.props
    let {winner, ownMark} = this.state

    if(user){
      winner = ( winner == ownMark) ? user : null;
      let guessCorrect = (guess === 'ROBOT') ? true : false;

      relay.commitUpdate(
        new CreateGame({
          player1: user,
          name: 'tictactoe',
          winner,
          player1Guess: guess,
          player1GuessCorrect: guessCorrect
        })
      )


    }
    this.setState({
      ...this.initialState,
      gameState: new Array(9).fill(false)

    })

  }
  render() {
    let {
      size,
      rows,
      unit,
      coordinates,
      gameState,
      win,
      gameOver,
      yourTurn,
      ownMark} = this.state;

    return <div>
      <Stage
        width={size}
        height={size}
      >
        <Board unit={unit} size={size} rows={rows}></Board>
        <Squares
          unit={unit}
          coordinates={coordinates}
          gameState={gameState}
          win={win}
          gameOver={gameOver}
          yourTurn={yourTurn}
          ownMark={ownMark}
          move={this.move}
        ></Squares>
      </Stage>
      {this.turingTest()}
    </div>
  }
}


export default Relay.createContainer(
  TicTacToe, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `
    }
  }
)