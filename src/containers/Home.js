import React, { Component } from 'react'
import {Stage} from 'react-konva'
import GameList from './GameList'
import Relay from 'react-relay/classic'

class Home extends Component {

  render() {
    return <div>
      <GameList/>
    </div>
  }
}


export default Relay.createContainer(
  Home, {
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