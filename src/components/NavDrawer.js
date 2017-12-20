import React, { Component } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {NavToggleButton} from '../styled/NavDrawer'
import AuthButton from './AuthButton'
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import NavDrawer from '../components/NavDrawer'

// injectTapEventPlugin()
const ReactLogo = styled.img`

    height: 25px;
    border-radius: 50%;
    background: hsla(50, 100%, 85%, 1);
    box-shadow: inset 1px 1px 3px 0px rgba(49, 17, 17, 0.5);
    bottom: 60px;
    left: 80px;
    position: relative;
    padding: 2px;
`
export default class NavDrawer extends Component {

  state = {
    open: false,
    width: 200
  }
  componentWillMount() {

    const open = !this.props.authenticated;
    this.setState({ open })
  }
  toggle = () => {
    this.setState( (prevState, props) =>{
      return {
        open: !prevState.open
      }
    })
  }
  render() {

    console.info('auth button ', this.props)
    return (
      <div>
        <NavToggleButton
          toggle={this.toggle}
          width={this.state.width}
          open={this.state.open}
        />
        <Drawer
          open={this.state.open}
          width = {this.state.width}>
          <div style={{background:'#5e0808'}}>
            <img width="80%" style={{padding: '10%', background: 'radial-gradient(circle, #ffa904 45%, #5e0808 65%)' }} src="/logo.svg"/>
            <ReactLogo src="/react.svg"/>
            <AuthButton auth={this.props.auth} authenticated={this.props.authenticated} />
          </div>
          <Divider/>
          <Link to={'/'} >
            <MenuItem
            primaryText={'Play'}
            onTouchTap={this.toggle}/>
          </Link>
          <Link to={'/profile'}>
            <MenuItem
            primaryText={'Profile'}
            onTouchTap={this.toggle}/>
          </Link>
        </Drawer>

      </div>
    )

  }
}