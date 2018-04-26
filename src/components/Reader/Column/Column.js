import styles from './Column.scss'
import { Component } from 'preact'
import spell from 'utils/spell'

class ReadView extends Component {
  render (props) {
    const { scene, id, column } = props
    return (
      <div className={styles.column + ' ' + styles[`column_${column}`]}>
        <span className={styles.number}>{spell(id)}</span>
        <p className={styles.text} dangerouslySetInnerHTML={{ __html: scene.text }} />
        { scene.image &&
          <img
            className={styles.image}
            src={require(`assets/imgs/${scene.image}.png`)}
            alt={scene.image}
          />
        }
      </div>
    )
  }
}

export default ReadView
