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
    this.slideSpeed = 0.25
    this.state = {
      offset: 0,
      forward: false,
      backward: false
    }
    this.x = 0
  }

  touchStart (e) {
    const { forward, backward } = this.state
    if (forward || backward) {
      const { id } = this.props
      this.animation && clearTimeout(this.animation)
      if (forward) {
        this.setState({ forward: false })
        route(`/${parseInt(id) + 1}`, true)
      }
      if (backward) {
        this.setState({ backward: false })
        route(`/${parseInt(id) - 1}`, true)
      }
    }
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
      this.animation = setTimeout(() => {
        this.setState({ forward: false })
        route(`/${parseInt(id) + 1}`, true)
      }, 1000 * this.slideSpeed)
    } else if (offset > 10) {
      backward = true
      this.animation = setTimeout(() => {
        this.setState({ backward: false })
        route(`/${parseInt(id) - 1}`, true)
      }, 1000 * this.slideSpeed)
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
    if (!scenes) { return <div className={styles.reader} /> }

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
    let transition = null
    if (forward) {
      transform = 'translateX(-66.666667%)'
      transition = `transform ${this.slideSpeed}s`
    } else if (backward) {
      transform = 'translateX(0)'
      transition = `transform ${this.slideSpeed}s`
    } else if (offset) {
      transform = `translateX(calc(-33% + ${offset}px))`
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
        { prev && <Column column='side' scene={prev} id={prevId} /> }
        { scene && <Column column='' scene={scene} id={id} /> }
        { next && <Column column='side' scene={next} id={nextId} /> }
      </div>
    )
  }
}

export default ReadView
