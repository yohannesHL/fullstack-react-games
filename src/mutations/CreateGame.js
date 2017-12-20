import Relay from 'react-relay/classic'

export default class CreateGame extends Relay.Mutation {

  getVariables() {

    return {
      player1: this.props.player1,
      winner: this.props.winner,
      player1Guess: this.props.guess,
      player1GuessCorrect: this.props.guessCorrect
    }
  }
  getMutation (){
    return Relay.QL`mutation{createGame}`
  }

  getFatQuery(){
    return Relay.QL`
    fragment on CreateGamePayload {
      player1
    }
    `
  }

  getConfigs(){
    return [{
      type: 'RANGE_ADD',
      parentName: 'player1',
      parentID: this.props.player1.id,
      connectionName: 'Player1Games',
      edgeName: 'edge',
      rangeBehaviours: {
        '': 'append'
      }
    }]
  }
}