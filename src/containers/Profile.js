import React, { Component } from 'react'
import {Container, Name, GameListHeader, GameList, GameRecord, Column, ColumnLabels} from '../styled/Profile'
import Relay from 'react-relay/classic'
class Profile extends Component {

  static defaultProps = {
    user: { }
  }
  get records(){//vier.user
    if(!this.props.viewer.user) return;
    this.props.viewer.user.games.edges.map((edge, index) => {

      let { node: game } = edge

      return (
      <GameRecord
        key={index}
        index={index}
      >
      <Column>{ game.winner ? "Won!" : "Didn't Win"}</Column>
      <Column>{game.player1Guess}</Column>
      <Column>{game.player1GuessCorrect ? 'Yes' : 'No'}</Column>
      <Column>{new Date(game.createdAt).toLocaleDateString()}</Column>
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
            OutCome
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
        {this.records}
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