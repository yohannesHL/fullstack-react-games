import React, { Component } from 'react'
// import {Stage} from 'react-konva'
import Relay from 'react-relay/classic'

class Pong extends Component {

  render() {

    return <div>
      <h2> Comming soon!</h2>
    </div>
  }
}


export default Relay.createContainer(
  Pong, {
    fragments: {
      viewer: () => Relay.QL`
        fragment on Viewer {
          user {
            id
          }
        }
      `
    }
  }
)