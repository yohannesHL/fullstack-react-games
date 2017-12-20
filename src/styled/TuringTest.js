import React from 'react'
import styled from 'styled-components'
import {cyan500} from 'material-ui/styles/colors'
import RaisedButton from 'material-ui/RaisedButton'


// eslint-disable-next-line
const Container = styled.div`
  left: 0;
  right: 0;
  width: 400px;
  height: 200px;
  margin: auto;
  position:absolute;
  top: 200px;
  text-align: center;
  background: ${cyan500};
  border-radios: 20px;
  display:flex;
  flex-direction: column;
  justify-content: space-around;
  align-content: space-around;


`

// eslint-disable-next-line
const Question = styled.span`
  display; flex;
  font-size: 25px;
`

const Answers = styled.div`
  display: flex;
  flex-direction: row;

  justify-content: space-around;
  align-content: space-around;
  align-items: center;
  width: 100%;
`

const TuringTest = (props) => {
  return (

    <Container>
      <Question> Was your opponent human or robot?</Question>

      <Answers>
        <RaisedButton
          label={'Human'}
          onTouchTap={() => { props.recordGame('HUMAN') }}
        />
        <RaisedButton
          label={'Robot'}
          onTouchTap={() => { props.recordGame('ROBOT') }}
        />
      </Answers>
    </Container>
  )

}

export default TuringTest