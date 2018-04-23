import { auth } from 'utils/firebase'

export const authActions = store => {
  return {
    logIn (state, password) {
      auth().signInWithEmailAndPassword('jordan@genesis.firebase', password)
        .then(res => store.setState({ auth: res }))
        .catch(error => store.setState({ auth: { error } }))
    }
  }
}

export default {
  user: null,
  error: null
}
