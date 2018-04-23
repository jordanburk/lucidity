import createStore from 'unistore'

import auth from './auth'
import entities from './entities'

const store = createStore({
  auth,
  entities
})

export default store
