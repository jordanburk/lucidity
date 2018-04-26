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
      scenes: {}
    }
    this.updateScene = this.updateScene.bind(this)
  }

  componentWillMount () {
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

  render (props, state) {
    const { scenes } = state
    const length = Object.keys(scenes).length
    // const currentId = String(length)
    const newId = String(length + 1)
    return (
      <main className={styles.app}>
        <Header />
        <Nav scenes={scenes} />
        { length === 0 && <h2>Loading</h2> }
        { !scenes && <h2>Loading</h2> }
        <Router>
          <Auth path='/login' />
          <Editor path='/new' blank id={newId} scenes={scenes} updateScene={this.updateScene} />
          <Editor path='/:id/edit' scenes={scenes} updateScene={this.updateScene} />
          <Reader path='/' id='1' scenes={scenes} />
          <Reader path='/:id?' scenes={scenes} />
        </Router>
      </main>
    )
  }
}

export default App
