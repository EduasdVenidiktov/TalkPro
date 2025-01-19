import { signInWithRedirect, GoogleAuthProvider } from 'firebase/auth'
import { doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from '/src/data/firebase'
import toast from 'react-hot-toast'

const provider = new GoogleAuthProvider()

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithRedirect(auth, provider)
    const user = result.user

    const userDocRef = doc(db, 'users', user.uid)
    const userDocSnap = await getDoc(userDocRef)

    if (!userDocSnap.exists()) {
      await setDoc(userDocRef, {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName,
        photoURL: user.photoURL,
        favoriteCards: [],
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
