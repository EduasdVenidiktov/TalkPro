import { signInWithPopup, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '/src/data/firebase' // Импортируйте auth и db
import toast from 'react-hot-toast'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, provider)
    const user = result.user

    // Проверяем, существует ли уже документ пользователя в Firestore
    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (!userDocSnap.exists()) {
      // Если документа нет, создаем его
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        // Добавьте другие поля пользователя, которые вам нужны
        favoriteCards: [], // Инициализируем массив избранных карточек
      })
      toast.success('User registered successfully!', { duration: 1500 })
    } else {
      toast.success('User logged in successfully!', { duration: 1500 })
    }
  } catch (error) {
    console.error('Error signing in with Google', error)
    toast.error('Google sign-in failed.', { duration: 1500 })
  }
}

// import { signInWithPopup } from 'firebase/auth'
// import { auth, googleProvider } from '../data/firebase'
// import { toast } from 'react-hot-toast'

// export const signInWithGoogle = async () => {
//   try {
//     const result = await signInWithPopup(auth, googleProvider) // Використовуємо signInWithPopup
//     const user = result.user // Отримуємо дані про користувача

//     const isNewUser = result._tokenResponse?.isNewUser

//     const token = await result.user.getIdToken()
//     localStorage.setItem('userToken', token)

//     // Показуємо успішне повідомлення для нових та існуючих користувачів
//     toast.success(
//       isNewUser
//         ? `Your registration was successful. Welcome ${user.displayName}!`
//         : `Welcome back! ${user.displayName} was successful.`,
//       {
//         duration: 2500,
//       }
//     )
//     window.location.href = '/'
//   } catch {
//     toast.error('An error occurred during login. Please try again.', {
//       duration: 1500,
//     })
//   }
// }
