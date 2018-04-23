import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

firebase.initializeApp({
  projectId: 'genesis-d3636',
  apiKey: 'AIzaSyDwpR0oompq46GpKURdM7qqyJXF1S5BcKI'
  // authDomain: 'genesis-d3636.firebaseapp.com'
  // databaseURL: 'https://genesis-d3636.firebaseio.com',
  // storageBucket: 'genesis-d3636.appspot.com',
  // messagingSenderId: '136680810242',
})

export const auth = firebase.auth
export const db = firebase.firestore()
