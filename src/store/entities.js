import { db } from 'utils/firebase'

export const entityActions = store => {
  return {
    addEntity (state, name) {
      db.collection('entities').doc(name).set({
        name,
        other: 'hello'
      })
        .then(docRef => {
          console.log({ docRef })
        })
        .catch(err => {
          console.log({ err })
        })
    },
    getEntity (state, name) {
      const ref = db.collection('entities').doc(name)
      ref.get()
        .then(doc => {
          if (doc.exists) {
            console.log({ data: doc.data() })
          } else {
            console.log('no such document. yet.')
          }
        })
        .catch(err => {
          console.log({ err })
        })
    },
    getAllEntities (state) {
      db.collection('entities').get()
        .then(snapshot => {
          console.log({ snapshot })
        })
        .catch(err => {
          console.log({ err })
        })
    }
  }
}

export default { hm: 'a' }
