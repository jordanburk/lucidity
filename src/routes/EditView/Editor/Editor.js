import styles from './Editor.scss'
import { Component } from 'preact'
import { db } from 'utils/firebase'

class Editor extends Component {
  constructor (props) {
    super(props)
    this.state = {
      text: props.scene.text
    }
    this.change = this.change.bind(this)
    this.save = this.save.bind(this)
  }

  change (e) {
    this.setState({
      text: e.target.value
    })
  }

  save (e) {
    const { id } = this.props
    const { text } = this.state
    db.collection('scenes').doc(id).set({ text })
      .then(() => this.props.updateScene(id, text))
      .catch(err => console.log(err))
  }

  componentWillReceiveProps (nextProps) {
    this.setState({
      text: nextProps.scene.text
    })
  }

  render (props, state) {
    console.log(props)
    const { text } = state
    return (
      <div className={styles.main}>
        <h2>Editor!</h2>
        <a href='/login'>Log In</a>
        <textarea className={styles.text} onChange={this.change} value={text} />
        <button onClick={this.save}>Save</button>
      </div>
    )
  }
}

export default Editor
