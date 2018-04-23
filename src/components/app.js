import Router from 'preact-router'
import AuthView from 'routes/AuthView'
import HomeView from 'routes/HomeView'

const App = () => {
  return (
    <main id='app'>
      <Router>
        <HomeView path='/' />
        <AuthView path='/login' />
      </Router>
    </main>
  )
}

export default App
