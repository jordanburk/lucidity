import styles from './Reader.scss'
import { Component } from 'preact'

class Reader extends Component {
  render (props) {
    const { scene } = props
    return (
      <div className={styles.main}>
        <h2>Reader!</h2>
        <a href='/login'>Log In</a>
        <p>{scene.text}</p>
      </div>
    )
  }
}

export default Reader
