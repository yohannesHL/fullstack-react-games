import React, { Component } from 'react'
import RaisedButton from 'material-ui/RaisedButton'
// import injectTapEventPlugin from 'react-tap-event-plugin';
// import NavDrawer from '../components/NavDrawer'

// injectTapEventPlugin()

const AuthButton = (props)=>{

  if (props.authenticated){
    return (
      <RaisedButton
      label='logout'
      onTouchTap={props.auth.logout}
      fullWidth={true}
      secondary

      />
    )
  } else {
    return (
      <RaisedButton
        label='login / signup'
        onTouchTap={props.auth.showLock}
        fullWidth={true}
        primary
      />
    )
  }
}
export default AuthButton