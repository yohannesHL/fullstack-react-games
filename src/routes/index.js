import React from 'react';
import {Route, IndexRoute} from 'react-router';
import Relay from 'react-relay/classic'
import auth from '../utils/auth'
import Template from '../containers/Template';
import Home from '../containers/Home';
import Profile from '../containers/Profile';
import TicTacToe from '../containers/game/TicTacToe';
import Connect4 from '../containers/game/Connect4';
import Pong from '../containers/game/Pong';


const ViewerQueries = {
  viewer: () => Relay.QL`query {viewer}`
}
const createRoutes = () => {
  return (
    <Route
      path='/'
      component={Template}
      auth={auth}
      queries={ViewerQueries}
      >
      <IndexRoute
      header='Games'
        component={Home}
        queries={ViewerQueries}
      />
      <Route
        path='/profile'
        header='Profile'
        queries={ViewerQueries}
        component={Profile}
      />
      <Route
        path='/game/tictactoe'
        header='Tic Tac Toe'
        queries={ViewerQueries}
        component={TicTacToe}
      />
            <Route
        path='/game/connect4'
        header='Connect4'
        queries={ViewerQueries}
        component={Connect4}
      />
            <Route
        path='/game/pong'
        header='Pong'
        queries={ViewerQueries}
        component={Pong}
      />

    </Route>
    )




}

const Routes = createRoutes();


export default Routes