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
    this.y = null
    this.scrolling = false
    this.swiping = false
    this.flick = true
    this.flickFunc = null
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
    this.y = e.changedTouches[0].clientY
    this.flick = true
    this.flickFunc = setTimeout(() => {
      this.flick = false
    }, 300)
  }

  touchMove (e) {
    if (this.scrolling) { return }
    const touch = e.changedTouches[0]
    if (!this.swiping) {
      const deltaX = touch.clientX - this.x
      const deltaY = touch.clientY - this.y
      this.y = null
      if (Math.abs(deltaY / deltaX) > 1) {
        this.scrolling = true
        return
      }
      this.swiping = true
    }
    const { id, scenes } = this.props
    let offset = touch.clientX - this.x
    const first = id === '1' && offset > 0
    const last = offset < 0 && parseInt(id) === Object.keys(scenes).length
    if (first || last) {
      this.x = touch.clientX
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
    if (offset < -30 || (this.flick && offset < -4)) {
      forward = true
      this.animation = setTimeout(() => {
        this.setState({ forward: false })
        route(`/${parseInt(id) + 1}`, true)
      }, 1000 * this.slideSpeed)
    } else if (offset > 30 || (this.flick && offset > 4)) {
      backward = true
      this.animation = setTimeout(() => {
        this.setState({ backward: false })
        route(`/${parseInt(id) - 1}`, true)
      }, 1000 * this.slideSpeed)
    }
    this.x = 0
    this.scrolling = false
    this.swiping = false
    this.flick = false
    this.flickFunc && clearTimeout(this.flickFunc)
    this.setState({
      offset: 0,
      forward,
      backward
    })
  }

  render (props, state) {
    const { id, scenes } = props
    if (!scenes) { return <div className={styles.reader} /> }

    if (scenes[1] && !scenes[id]) {
      route('/', true)
    }
    const nextId = parseInt(id) + 1
    const prevId = parseInt(id) - 1

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
        <Column column='side' scenes={scenes} id={prevId} />
        <Column column='' scenes={scenes} id={id} />
        <Column column='side' scenes={scenes} id={nextId} />
      </div>
    )
  }
}

export default ReadView
