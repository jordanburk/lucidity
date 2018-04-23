import styles from './HomeView.scss'

const HomeView = () => {
  return (
    <div className={styles.main}>
      <h2>Home screen</h2>
      <a href='/login'>Log In</a>
    </div>
  )
}

export default HomeView
