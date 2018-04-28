import styles from './Column.scss'
import { Component } from 'preact'
import Intro from '../Intro'
import spell from 'utils/spell'

class ReadView extends Component {
  render (props) {
    const { scenes, id, column } = props
    const scene = scenes[id]
    if (!scene) {
      return <div className={styles.column + ' ' + styles[`column_${column}`]} />
    }
    let Image
    if (scene.image) {
      Image = require(`components/svgs/${scene.image}.js`).default
    }
    return (
      <div className={styles.column + ' ' + styles[`column_${column}`]}>
        <span className={styles.number}>{spell(id)}</span>
        <p className={styles.text} dangerouslySetInnerHTML={{ __html: scene.text }} />
        { scene.image && <Image className={styles.image} /> }
        { id === '1' && <Intro scenes={scenes} /> }
      </div>
    )
  }
}

export default ReadView
