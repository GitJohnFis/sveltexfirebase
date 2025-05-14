import firebase from 'firebase/app';
import 'firebase/auth';
import { firebaseConfig } from './config.js'
import { readable } from 'svelte/store'
import { } from '../services/firbase';
import { CREATE_USER_COLLECTION } from '../pages/services/firebase.js';

firebase.initializeApp(firebaseConfig)

const userMapper = claims => ({
id: claims.user_id,
name: claims.name,
email: claims.email,
picture: claims.picture
    })

    export const initAuth = (useRedirect = false) => {
        const auth = new firebase.auth();
    const logout = () => auth.signOut();
    const loginWithGoogle = () => {
        const provider = new firebase.auth.GoogleAuthProvider();
        if (useRedirect) {
            return auth.signInWithRedirect(provider);
        } else {
                return auth.signInWithPopup(provider);
            }
        }

    const user = readable(null, set => {
        const unsub = auth.onAuthStateChanged(async fireUser => {
            if (fireUser) {
                const token = await fireUser.getIdTokenResult();
                const user = userMapper(token.claims);
                CREATE_USER_COLLECTION(user.id)
                set(user);
            } else {
                set(null);
            }
        });
        return unsub
        });
        
     return {
        user,
        loginWithGoogle,
        signOut
    };
};