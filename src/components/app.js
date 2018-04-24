import { Component } from 'preact'
import Router from 'preact-router'
import AuthView from 'routes/AuthView'
import ReadView from 'routes/ReadView'
import EditView from 'routes/EditView'
import Nav from 'components/Nav'
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
    const id = String(Object.keys(scenes).length + 1)
    return (
      <main id='app'>
        <h1>lucidity</h1>
        <Nav scenes={scenes} />
        <Router>
          <AuthView path='/login' />
          <EditView path='/new' blank id={id} scenes={scenes} updateScene={this.updateScene} />
          <EditView path='/:id/edit' scenes={scenes} updateScene={this.updateScene} />
          <ReadView path='/:id?' scenes={scenes} />
        </Router>
      </main>
    )
  }
}

export default App
