import styles from './Intro.scss'
import { Component } from 'preact'

class Intro extends Component {
  render (props) {
    const { scenes } = props
    const id = Object.keys(scenes).length
    return (
      <div className={styles.intro}>
        <a className={styles.recent} href={`/${id}`}>jump to most recent</a>
        <span className={styles.swipe}>swipe to continue</span>
      </div>
    )
  }
}

export default Intro
