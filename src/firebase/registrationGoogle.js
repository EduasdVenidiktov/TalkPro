import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { toast } from 'react-hot-toast'

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider) // Використовуємо signInWithPopup
    const user = result.user // Отримуємо дані про користувача

    const isNewUser = result._tokenResponse?.isNewUser

    const token = await result.user.getIdToken()
    localStorage.setItem('userToken', token)

    // Показуємо успішне повідомлення для нових та існуючих користувачів
    toast.success(
      isNewUser
        ? `Your registration was successful. Welcome ${user.displayName}!`
        : `Welcome back! ${user.displayName} was successful.`,
      {
        duration: 2500,
      }
    )
    window.location.href = '/'
  } catch {
    toast.error('An error occurred during login. Please try again.', {
      duration: 1500,
    })
  }
}
