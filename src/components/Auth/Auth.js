import { Component } from 'preact'
import { route } from 'preact-router'
import { auth } from 'utils/firebase'

class AuthView extends Component {
  constructor (props) {
    super(props)
    this.state = {
      password: ''
    }
    this.submit = this.submit.bind(this)
    this.change = this.change.bind(this)
  }

  submit (e) {
    e.preventDefault()
    auth().signInWithEmailAndPassword('jordan@lucidity.firebase', this.state.password)
      .then(res => {
        this.props.logIn()
        route('/1')
      })
      .catch(error => console.log({ error }))
  }

  change (e) {
    this.setState({ password: e.target.value })
  }

  render (props, state) {
    const auth = {}
    return (
      <div>
        { !auth.uid &&
          <form style={{ 'margin-top': '16px' }} onSubmit={this.submit}>
            <input onChange={this.change} type='text' value={state.password} />
            <input type='submit' value='Log In' />
          </form>
        }
        { auth.error && <span>Error: Try again</span> }
      </div>
    )
  }
}

export default AuthView
