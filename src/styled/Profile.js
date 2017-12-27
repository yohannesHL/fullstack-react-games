import React from 'react'
import styled from 'styled-components'
import {media} from '../utils/media'



// eslint-disable-next-line
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  background: #fcfcfc;
  border: 1px solid #f2f2f2;
  width: 800px;
  min-height: 100vh;
  padding: 20px;
  ${media.handheld`
    width: 100%;
  `}
`

// eslint-disable-next-line
export const Name = styled.h2`
  display; flex;
`
// eslint-disable-next-line
export const GameListHeader = styled.h4`
 display: flex;
 padding-bottom: 2px;
 margin: 10px 0 5px 0;
`

export const GameList = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding: 5px;
  background: #f7f7f7;
  border: 1px solid #f5f5f5;
  justify-content: center;
`
export const GameRecord = styled.div`
  display:flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  padding: 5px 0;
  margin: 1px 0;
  background-color: ${props => (props.index % 2 === 1)? 'rgb(255,255,255)' : 'rgb(240, 240, 240)'};
  box-sizing: border-box;
`
export const ColumnLabels = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  width: 100%;
  margin: 3px 0;
  box-sizing: border-box;
  font-weight: bold;
`
export const Column = styled.span`
  display: flex;
  width:25%;
`
