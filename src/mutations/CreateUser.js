import Relay from 'react-relay/classic'

export default class CreateUser extends Relay.Mutation {

  getVariables() {

    return {
      email: this.props.email,
      name:'test',
      authProvider: {
        auth0: { idToken: this.props.idToken }
      }
    }
  }
  getMutation (){
    return Relay.QL`mutation{createUser}`
  }

  getFatQuery(){
    return Relay.QL`
    fragment on CreateUserPayload {
      user
      viewer
    }
    `
  }

  getConfigs(){
    return [{
      type: 'RANGE_ADD',
      parentName: 'viewer',
      connectionName: 'allUsers',
      edgeName: 'User',
      rangeBehaviors: {
        '': 'append'
      }
    }]
  }
}