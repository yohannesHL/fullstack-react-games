import React, { Component } from 'react'
import { Link } from 'react-router'
import styled from 'styled-components'
import Drawer from 'material-ui/Drawer'
import MenuItem from 'material-ui/MenuItem'
import Divider from 'material-ui/Divider'
import {NavToggleButton} from '../styled/NavDrawer'
import AuthButton from './AuthButton'
const Logo = styled.img`
  width: 160px;
  height: 124px;
  padding: 20px;
  background: radial-gradient(circle, #ffa904 45%, #5e0808 65%);
`

const ReactLogo = styled.img`
    top: 25px;
    left: 72px;
    height: 35px;
    width: 55px;
    position: absolute;
    border-radius: 50%;
    // background: hsla(50, 100%, 85%, 1);
    box-shadow: inset 1px 1px 3px 0px rgba(49, 17, 17, 0.5);


`
const LogoBgOverlay = styled.div`
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0.65;
    z-index: 10;
    width: 160px;
    height: 124px;
    padding: 20px;
    background: radial-gradient(circle,#ffa904 45%,#5e0808 65%);
    background-color: white;
    background-blend-mode: luminosity,soft-light;
    background-image: url(/logo_shape.svg), url(/react.svg), radial-gradient(circle,hsla(295, 78%, 86%, 0.92) 45%,hsla(0, 100%, 85%, 0.92) 65%);
    background-position: 50% 50%;
    background-origin: content-box;
`
const LogoBg = styled.div`
    width: 160px;
    height: 124px;
    padding: 20px;
    background: radial-gradient(circle,#ffa904 45%,#5e0808 65%);
    background-color: white;
    background-image: url(/logo_shape.svg), url(/react.svg), radial-gradient(circle,hsla(45, 100%, 46%, 1) 45%,hsla(41, 128%, 34%, 1) 65%);
    background-clip: padding-box;
    background-position: 50% 50%;
    background-size: cover;
    background-origin: content-box;
`
const LogoText = styled.span`
    position: absolute;
    text-align: center;
    vertical-align: middle;
    font-size: 22px;
    font-weight: bold;
    margin: 0% 16%;
    padding: 25% 0;
    z-index: 100;
    color: hsla(0, 35%, 24%, 1);
    text-shadow: 0px 2px 9px rgba(0, 0, 0, 0.3);
    font-family: sans-serif;
    border-radius: 50%;
`
const LogoTagLine = styled.div`
    position: absolute;
    font-size: 0.75rem;
    font-weight: bold;
    margin: 25% 40%;
    padding: 25% 0;
    z-index: 100;
    color: #ffffff;
    text-shadow: 0px 8px 10px #111515;
    font-family: inherit;
`

export default class NavDrawer extends Component {

  state = {
    open: true,
    width: 200
  }
  componentWillMount() {

    // const open = !this.props.authenticated;
    console.info('rerendered auth', this.props)
    this.setState({ open:this.state.open })
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
            {/* <Logo src="/logo.svg"/> */}
            {/* <ReactLogo src="/react.svg"/> */}
            <LogoText>Classic Games</LogoText>
            <LogoTagLine>revived!</LogoTagLine>
            <LogoBg/>
            <LogoBgOverlay/>

            <AuthButton auth={this.props.auth} authenticated={this.props.authenticated} />
          </div>
          <Divider/>
          <Link to={'/'} style={{ 'text-decoration': 'none'}}>
            <MenuItem
            primaryText={'Play'}
            onTouchTap={this.toggle}/>
          </Link>
          <Link to={'/profile'} style={{ 'text-decoration': 'none', display: this.props.authenticated ? 'block' : 'none' }}>
            <MenuItem
            primaryText={'Profile'}
            onTouchTap={this.toggle}/>
          </Link>
        </Drawer>

      </div>
    )

  }
}