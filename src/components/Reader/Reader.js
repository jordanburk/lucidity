import styles from './Reader.scss'
import { Component } from 'preact'
import Column from './Column'
import { route } from 'preact-router'

class ReadView extends Component {
  constructor (props) {
    super(props)
    this.touchStart = this.touchStart.bind(this)
    this.touchMove = this.touchMove.bind(this)
    this.touchEnd = this.touchEnd.bind(this)
    this.state = {
      offset: 0,
      forward: false,
      backward: false
    }
    this.x = 0
  }

  touchStart (e) {
    this.x = e.changedTouches[0].clientX
  }

  touchMove (e) {
    let offset = e.changedTouches[0].clientX - this.x
    if (this.props.id === '1' && offset > 0) {
      this.x = e.changedTouches[0].clientX
      offset = 0
    }
    this.setState({
      offset
    })
  }

  touchEnd (e) {
    const { id } = this.props
    const { offset } = this.state
    let forward, backward
    if (offset < -10) {
      forward = true
      setTimeout(() => {
        this.setState(
          { forward: false },
          () => route(`/${parseInt(id) + 1}`, true)
        )
      }, 200)
    } else if (offset > 10) {
      backward = true
      setTimeout(() => {
        this.setState({ backward: false })
        route(`/${parseInt(id) - 1}`, true)
      }, 200)
    }
    this.x = 0
    this.setState({
      offset: 0,
      forward,
      backward
    })
  }

  render (props, state) {
    const { id, scenes } = props
    if (!scenes) { return null }
    const scene = scenes[id]
    if (scenes[1] && !scene) {
      route('/', true)
    }
    const nextId = parseInt(id) + 1
    const prevId = parseInt(id) - 1
    const next = scenes[nextId]
    const prev = scenes[prevId]
    const { offset, forward, backward } = state
    let transform = null
    let transition = 'transform 0.2s'
    if (forward) {
      transform = 'translateX(-100%)'
    } else if (backward) {
      transform = 'translateX(100%)'
    } else if (offset) {
      transform = `translateX(${offset}px)`
    } else {
      // if we don't have a specified translate, we are resetting
      transition = null
    }
    return (
      <div
        className={styles.reader}
        onTouchStart={this.touchStart}
        onTouchMove={this.touchMove}
        onTouchEnd={this.touchEnd}
        style={{
          transform,
          transition
        }}
      >
        { prev && <Column column='prev' scene={prev} id={prevId} /> }
        { scene && <Column column='' scene={scene} id={id} /> }
        { next && <Column column='next' scene={next} id={nextId} /> }
      </div>
    )
  }
}

export default ReadView
