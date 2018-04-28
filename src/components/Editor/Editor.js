import styles from './Editor.scss'
import { Component } from 'preact'
import { db } from 'utils/firebase'

class EditView extends Component {
  constructor (props) {
    super(props)
    this.state = this.buildState(props)
    this.textChange = this.textChange.bind(this)
    this.imageChange = this.imageChange.bind(this)
    this.insert = this.insert.bind(this)
    this.save = this.save.bind(this)
  }

  textChange (e) {
    this.setState({
      text: e.target.value
    })
  }

  imageChange (e) {
    this.setState({
      image: e.target.value
    })
  }

  insert (e) {
    this.setState({
      text: this.state.text + e.target.innerHTML
    })
  }

  save (e) {
    const { id } = this.props
    const { text, image } = this.state
    const scene = { text }
    if (image) {
      scene.image = image
    }
    db.collection('scenes').doc(id).set(scene)
      .then(() => this.props.updateScene(id, text))
      .catch(err => console.log(err))
  }

  buildState (props) {
    const { id, scenes, blank } = props
    if (blank) {
      return { text: '', image: '' }
    } else if (scenes && scenes[id]) {
      return {
        text: scenes[id].text || '',
        image: scenes[id].image || ''
      }
    }
  }

  componentWillReceiveProps (nextProps) {
    const state = this.buildState(nextProps)
    this.setState(state)
  }

  render (props, state) {
    const { scenes, blank } = props
    let { id } = props
    const loaded = (blank || (scenes && scenes[id]))
    if (!loaded) { return null }
    if (!id) {
      const length = Object.keys(scenes).length
      id = String(length + 1)
    }
    const { text, image } = state
    const Image = image && require(`components/svgs/${image}`).default

    return (
      <div className={styles.editor}>
        <div>
          <button className={styles.example} onClick={this.insert}>“</button>
          <button className={styles.example} onClick={this.insert}>”</button>
          <button className={styles.example} onClick={this.insert}>‘</button>
          <button className={styles.example} onClick={this.insert}>’</button>
          <button className={styles.example} onClick={this.insert}>—</button>
          <button className={styles.example} onClick={this.insert}>–</button>
        </div>
        <textarea className={styles.text} onChange={this.textChange} value={text} />
        { image && <Image className={styles.image} /> }
        <div className={styles.left}>
          <input className={styles.imageName} onChange={this.imageChange} value={image} />
          <button className={styles.save} onClick={this.save}>Save</button>
          <a href={`/${id}`}><button className={styles.view}>View</button></a>
        </div>
      </div>
    )
  }
}

export default EditView
