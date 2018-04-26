import styles from './Header.scss'
import lucidity from 'assets/decs/lucidity.png'

const Header = () => (
  <h1 className={styles.header}>
    <a href='/'>
      <img src={lucidity} alt='lucidity' />
    </a>
  </h1>
)

export default Header
