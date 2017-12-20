import React, { Component } from 'react'
import { Title, ListItem, ListItemLink, Container, Content} from '../styled/GameList'


export default class GameList extends Component {
  state = {
    games: ['pong', 'tictactoe', 'connect4']
  }
  getGames(){
    const games = [];
    for (let game of this.state.games){
      let link = `game/${game.toLowerCase()}`;
      games.push(<ListItem key={game} title={game}> <ListItemLink href={link}> <div>{game} </div></ListItemLink></ListItem>)
    }
    return games
  }
  componentWillMount(){
    this.getGames()
  }
  render() {
    return <Container>
      <Title>My Games</Title>
      <Content>
        { this.getGames() }
      </Content>


    </Container>
  }
}