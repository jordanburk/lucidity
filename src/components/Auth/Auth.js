import { Component } from 'preact'
import { auth } from 'utils/firebase'

class Auth extends Component {
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
      .then(res => console.log('logged in!'))
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
          <form onSubmit={this.submit}>
            <input onChange={this.change} type='text' value={state.password} />
            <input type='submit' value='Log In' />
          </form>
        }
        { auth.error && <span>Error: Try again</span> }
      </div>
    )
  }
}

export default Auth
