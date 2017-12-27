import React, { Component } from 'react'
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile'
import Relay from 'react-relay/classic'
class Profile extends Component {

  static defaultProps = {
    user: { }
  }
  get records(){
    if(!this.props.viewer.user) return;
    const user = this.props.viewer.user

    if (user.games.edges.length === 0 ){
      return <h3> No game history data available.</h3>
    }
    return user.games.edges.map((edge, index) => {

      let { node: game } = edge

      return (
      <GameRecord
        key={index}
        index={index}
      >
      <Column>{game.name}</Column>
      <Column>{(game.winner && game.winner.id == user.id) ? "Won!" : "Didn't Win"}</Column>
      <Column>{game.player1Guess}</Column>
      <Column>{game.player1GuessCorrect ? 'Yes' : 'No'}</Column>
      <Column>{game.createdAt}</Column>
      </GameRecord>)
    })
  }
  render() {
    const {email} = this.props.viewer.user || 'Anonymous'

    return <Container>

    <Name>{email}</Name>
    <GameList>
      <GameListHeader>
      My Games
      </GameListHeader>
        <ColumnLabels>
          <Column>
            Name
           </Column>
          <Column>
            Out Come
           </Column>
          <Column>
            Guess
          </Column>
          <Column>
          Correct Guess
          </Column>
          <Column>
          Date
          </Column>
        </ColumnLabels>
        { this.records }
    </GameList>

    </Container>

  }
}


export default Relay.createContainer(
  Profile, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
            email
            games (first: 10) {
              edges {
                node {
                  id
                  createdAt
                  name
                  player1Guess
                  player1GuessCorrect
                  winner {
                    id
                  }

                }
              }
            }
          }
        }
      `
    }
  }
)