import React from 'react'
import styled from 'styled-components'
import {Layer,Line, Text} from 'react-konva'

// eslint-disable-next-line
export const Board = ({unit, size, rows}) =>{
    let grid = [];
    let stroke = 'grey';
    let strokeWidth = 10;

    for (let i= 1; i < rows; i++){
      let pos = unit * i;

      grid.push(
        <Line
          points={[pos, 0, pos, size]}
          stroke={stroke}
          strokeWidht={strokeWidth}
          key={i + 'v'}
          />)
      grid.push(
        <Line
          points={[0, pos, size, pos]}
          stroke={stroke}
          strokeWidht={strokeWidth}
          key={i + 'h'}
          />)
    }

    return (
      <Layer>
        {grid}
      </Layer>
    )
}

export const Squares = ({ unit, coordinates, gameState, win, gameOver, yourTurn, ownMark, move }) => {
    let squares = coordinates.map( (pos, idx)=>{
      let makeMove = move;
      let mark = gameState[idx]
      let fill = 'black';

      if (win && win.includes(idx) ){
        fill = 'lightgreen'
      }

      if (gameOver || !yourTurn || mark){
        makeMove = ()=> console.info("can't move")
      }
      console.info('click ',mark, pos[0], pos[1])
      return (
        <Text
          key={idx}
          index={idx}
          x={pos[0]}
          y={pos[1]}
          fontSize={unit}
          width={unit}
          text={mark}
          fill={fill}
          fontFamily={'Helvatica'}
          align={'center'}
          onClick={ (e)=>{
            let index = e.target.index;

            makeMove(ownMark, index)
          }}
        />

      )
    });

    return (
      <Layer>
       {squares}
      </Layer>
    )
}