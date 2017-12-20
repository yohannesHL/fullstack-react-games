import React from 'react'
import styled from 'styled-components'
import {media} from '../utils/media'


// eslint-disable-next-line
export const Header = styled.header`
  text-align: center;
  font-size: 2em;
  font-family: 'Roboto', sans-serif;
`
// eslint-disable-next-line
export const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  margin: auto;
  width: 80%;
  min-height: 80vh;
  ${media.handheld`
    width: 100%;
  `}
`
// eslint-disable-next-line
export const Main = (props) =>{

    return (
      <Container>
        {props.children}
      </Container>
    )
}
