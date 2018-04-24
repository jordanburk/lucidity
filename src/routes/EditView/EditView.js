import styles from './EditView.scss'
import { Component } from 'preact'
import Editor from './Editor'

class EditView extends Component {
  render (props) {
    const { id = '1', blank, scenes, updateScene } = props
    const scene = blank ? { text: '' } : scenes[id]
    return (
      <div className={styles.main}>
        <h2>Edit view</h2>
        <a href='/login'>Log In</a>
        { scene && <Editor scene={scene} id={id} updateScene={updateScene} /> }
      </div>
    )
  }
}

export default EditView
