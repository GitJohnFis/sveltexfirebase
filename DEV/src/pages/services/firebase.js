import firebase from 'firebase/app';
import 'firebase/auth'
import 'firebase/firestore'
import 'firebase/database'

let DATABASE_NAME = 'pokemons'
let COLLECTION_USERS = 'USERS'

export function CREATE_USER_COLLECTION(userId) {
    return new Promise((res,rej) => {
        let userRef = firebase.firestore().collection(COLLECTION_USERS).doc(userId)

        userRef
        .get()
        .then((userDoc) => {
            if(!userDoc.exists) {
                userRef.set({
                    favorites: []
                })
            }
            resolve()
        })

                .catch((error) => {
                    reject(error)
                })
        })
    })
}