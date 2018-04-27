import { Component } from 'preact'
import Router, { route } from 'preact-router'
import styles from './Nav.scss'
import FirstArrow from 'components/svgs/first'
import PrevArrow from 'components/svgs/prev'
import NextArrow from 'components/svgs/next'
import LastArrow from 'components/svgs/last'

class InnerNav extends Component {
  constructor (props) {
    super(props)
    this.keyPress = this.keyPress.bind(this)
  }

  keyPress (e) {
    const { edit, scenes } = this.props
    if (edit) { return }

    const { key } = e
    const id = parseInt(this.props.id)
    const last = Object.keys(scenes).length

    if (key === 'ArrowRight' && id < last) {
      route(`/${id + 1}`)
    } else if (key === 'ArrowLeft' && id > 1) {
      route(`/${id - 1}`)
    }
  }

  componentWillMount () {
    window.addEventListener('keydown', this.keyPress)
  }

  componentWillUnmount () {
    window.removeEventListener('keydown', this.keyPress)
  }

  render (props) {
    const { id, edit, scenes } = props
    const last = Object.keys(scenes).length
    const current = parseInt(id) || 1
    const isFirst = current === 1
    const isLast = current >= last
    const s = edit ? '/edit' : ''
    return (
      <div className={styles.nav}>
        <span className={styles.rule} />
        { !isFirst && [
          <a href={`/1${s}`} className={styles.link + ' ' + styles.first}>
            <FirstArrow className={styles.arrow} />
          </a>,
          <a href={`/${current - 1}${s}`} className={styles.link + ' ' + styles.previous}>
            <PrevArrow className={styles.arrow} />
          </a>
        ] }
        { !isLast && [
          <a href={`/${current + 1}${s}`} className={styles.link + ' ' + styles.next}>
            <NextArrow className={styles.arrow} />
          </a>,
          <a href={`/${last}${s}`} className={styles.link + ' ' + styles.last}>
            <LastArrow className={styles.arrow} />
          </a>
        ] }
      </div>
    )
  }
}

const Nav = ({ scenes }) => {
  if (!scenes) { return <div className={styles.nav} /> }
  return <Router>
    <InnerNav path=':id?/:edit?' scenes={scenes} />
  </Router>
}

export default Nav
