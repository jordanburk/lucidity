import { Component } from 'preact'
import Router from 'preact-router'
import Auth from 'components/Auth'
import Reader from 'components/Reader'
import Editor from 'components/Editor'
import Header from 'components/Header'
import Nav from 'components/Nav'
import styles from './App.scss'
import { db } from 'utils/firebase'

class App extends Component {
  constructor (props) {
    super(props)
    this.state = {
      loading: true,
      error: null,
      scenes: null
    }
    this.updateScene = this.updateScene.bind(this)
    this.logIn = this.logIn.bind(this)
  }

  componentWillMount () {
    if (window.localStorage['firebase:host:lucidity-bc272.firebaseio.com']) {
      this.setState({ loggedIn: true })
    }
    db.collection('scenes').get()
      .then(snapshot => {
        const scenes = {}
        snapshot.forEach(doc => {
          scenes[doc.id] = doc.data()
        })
        this.setState({
          loading: false,
          scenes
        })
      })
      .catch(error => {
        this.setState({
          loading: false,
          error
        })
      })
  }

  updateScene (id, text) {
    this.setState(
      state => {
        return {
          ...state,
          scenes: {
            ...state.scenes,
            [id]: { text }
          }
        }
      }
    )
  }

  logIn () {
    this.setState({ loggedIn: true })
  }

  render (props, state) {
    const { scenes, loggedIn } = state
    const EditLink = ({ id }) => <a href={`/${id}/edit`}>edit scene</a>
    return (
      <main className={styles.app}>
        <Header />
        <Nav scenes={scenes} />
        <Router>
          <Auth path='/login' logIn={this.logIn} />
          <Editor path='/new' blank scenes={scenes} updateScene={this.updateScene} />
          <Editor path='/:id/edit' scenes={scenes} updateScene={this.updateScene} />
          <Reader path='/' id='1' scenes={scenes} />
          <Reader path='/:id?' scenes={scenes} />
        </Router>
        { loggedIn &&
          <div className={styles.adminLinks}>
            <Router>
              <EditLink path='/:id' />
            </Router>
            <a href='/new'>new scene</a>
          </div>
        }
      </main>
    )
  }
}

export default App
