import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  projectId: 'lucidity-bc272',
  apiKey: 'AIzaSyC_e4t0qNme0ctb6SpZ0tQBELrEBphbYr4'
})

export const auth = firebase.auth
export const db = firebase.firestore()
