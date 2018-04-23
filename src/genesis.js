import { render } from 'preact'
import { Provider } from 'unistore/preact'
import store from 'store'
import App from './components/app'

document.addEventListener('DOMContentLoaded', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>,
    document.body
  )
})
