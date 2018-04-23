import { Component } from 'preact'
import { connect } from 'unistore/preact'
import { authActions } from 'store/auth'

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
    this.props.logIn(this.state.password)
  }

  change (e) {
    this.setState({ password: e.target.value })
  }

  render (props, state) {
    const { auth } = props
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

export default connect(
  'auth',
  authActions
)(Auth)
