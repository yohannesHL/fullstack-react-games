import Auth0Lock from 'auth0-lock'
import Relay from 'react-relay/classic'
import CreateUser from '../mutations/CreateUser'
import SignInUser from '../mutations/SignInUser'

const authDomain = 'yohan5.auth0.com'
const clientId = '7G726od6liAZ6YGHhgo1lP6jbfSs7rJF'


class AuthService {

  constructor(){

    this.lock = new Auth0Lock(clientId, authDomain,{
      // oidcConformant: true,
      prefill:{},
      auth:{

        params:{
          scope: 'openid email'
        },// eslint-disable-next-line
        // redirectUri: '//' + location.host,
        // audience: 'https://yohan5.auth0.com/userinfo',
        // responseType: 'id_token',
      }
    })

    this.showLock = this.showLock.bind(this);

    this.lock.on('authenticated', this.authProcess.bind(this) )
  }

  authProcess = (authResult) => {

    let { email, exp } = authResult.idTokenPayload || {}

    const idToken  = authResult.idToken

    this.signInUser({
      idToken,
      email,
      exp
    }).then(
      success => {
        // eslint-disable-next-line
        location.reload()
        return success
      },
      rejected => {
        this.createUser({
          idToken: idToken,
          email:email,
          exp
        }).then()
    })
  }
  showLock(){
    this.lock.show()
  }

  setToken = (authFields) =>{
    let {
      idToken,
      exp
    } = authFields;

    localStorage.setItem('idToken', idToken)
    localStorage.setItem('exp', exp * 1000)
  }

  isCurrent = () => {
    let expString = localStorage.getItem('exp')

    if (!expString){
      localStorage.removeItem('idToken')
      return false
    }
    let now = new Date();

    let exp = new Date( parseInt(expString, 10))


    if ( exp < now ){
      this.logout()
      return false
    } else {
      return true
    }
  }
  getToken() {
    let idToken = localStorage.getItem('idToken')

    if ( this.isCurrent() && idToken) {
      return idToken
    } else {
      this.logout()
      return false
    }

  }
  logout(reload){
    localStorage.removeItem('idToken')
    localStorage.removeItem('exp')

    if(reload){

      // eslint-disable-next-line
      location.reload()
    }
  }
  createUser = (authFields)=> {
    return new Promise( (resolve, reject) =>{
      Relay.Store.commitUpdate(
        new CreateUser({
          email: authFields.email,
          idToken: authFields.idToken
        }),{
          onSuccess: (res)=>{
            this.signInUser(authFields)
            resolve()
          },
          onFailure: (res) =>{
            console.info('Create user error', res)
            reject()
          }
        }
      )
    })
  }
  signInUser = (authFields) => {

    return new Promise((resolve, reject) => {
      Relay.Store.commitUpdate(
      new SignInUser({
        idToken: authFields.idToken
      }), {
          onSuccess: (res) => {
            this.setToken(authFields)
            resolve()
          },
          onFailure: (res) => {
            reject()
          }
        }
      )
    })
  }
}



const auth = new AuthService()
export default auth