import styles from './Header.scss'
import Lucidity from 'components/svgs/lucidity.js'

const Header = () => (
  <h1 className={styles.header}>
    <a className={styles.frame} href='/'>
      <Lucidity className={styles.lucidity} />
    </a>
  </h1>
)

export default Header
