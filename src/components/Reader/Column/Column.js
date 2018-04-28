import styles from './Column.scss'
import { Component } from 'preact'
import spell from 'utils/spell'

class ReadView extends Component {
  render (props) {
    const { scene, id, column } = props
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
      </div>
    )
  }
}

export default ReadView
