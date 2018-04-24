import styles from './ReadView.scss'
import { Component } from 'preact'
import Reader from './Reader'

class ReadView extends Component {
  render (props) {
    const { id = '1', scenes } = props
    const scene = scenes[id]
    return (
      <div className={styles.main}>
        <h2>Read view</h2>
        { scene && <Reader scene={scene} id={id} /> }
      </div>
    )
  }
}

export default ReadView
