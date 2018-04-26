import { Router } from 'preact-router'
import styles from './Nav.scss'
import firstArrow from 'assets/decs/first.png'
import prevArrow from 'assets/decs/prev.png'
import nextArrow from 'assets/decs/next.png'
import lastArrow from 'assets/decs/last.png'

const InnerNav = ({ id, edit, scenes }) => {
  const last = Object.keys(scenes).length
  const current = parseInt(id) || 1
  const isFirst = current === 1
  const isLast = current === last
  const s = edit ? '/edit' : ''
  return (
    <div className={styles.nav}>
      <span className={styles.rule} />
      { !isFirst && [
        <a href={`/1${s}`} className={styles.arrow + ' ' + styles.first}>
          <img src={firstArrow} alt='first' />
        </a>,
        <a href={`/${current - 1}${s}`} className={styles.arrow + ' ' + styles.previous}>
          <img src={prevArrow} alt='previous' />
        </a>
      ] }
      { !isLast && [
        <a href={`/${current + 1}${s}`} className={styles.arrow + ' ' + styles.next}>
          <img src={nextArrow} alt='next' />
        </a>,
        <a href={`/${last}${s}`} className={styles.arrow + ' ' + styles.last}>
          <img src={lastArrow} alt='last' />
        </a>
      ] }
    </div>
  )
}

const Nav = ({ scenes }) => (
  <Router>
    <InnerNav path=':id?/:edit?' scenes={scenes} />
  </Router>
)

export default Nav
