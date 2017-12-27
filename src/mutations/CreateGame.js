import Relay from 'react-relay/classic'

export default class CreateGame extends Relay.Mutation {

  getVariables() {

    return {
      name: this.props.name,
      player1Id: this.props.player1.id,
      winnerId: this.props.winner.id,
      player1Guess: this.props.player1Guess,
      player1GuessCorrect: this.props.player1GuessCorrect
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
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }
}