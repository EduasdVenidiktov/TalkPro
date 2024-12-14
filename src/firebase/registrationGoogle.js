import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase' // Імпортуйте з вашого firebase.js

export const signInWithGoogle = () => {
  signInWithPopup(auth, googleProvider)
    .then((result) => {
      // Успішний вхід
      const user = result.user
      console.log('Користувач:', user)
    })
    .catch((error) => {
      console.error('Помилка входу через Google:', error)
    })
}
