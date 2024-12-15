import { signInWithPopup } from 'firebase/auth'
import { auth, googleProvider } from './firebase'
import { toast } from 'react-hot-toast'

export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider)
    const user = result.user // Отримуємо дані про користувача

    const isNewUser = result._tokenResponse?.isNewUser

    const token = await result.user.getIdToken()
    localStorage.setItem('userToken', token)

    // Show success message for both new and existing users
    toast.success(
      isNewUser
        ? `Your registration was successful. Welcome ${user.displayName}!`
        : `Welcome back! ${user.displayName} was successful.`,
      {
        duration: 2500, // Продолжительность в миллисекундах (5000 = 5 секунд)
      }
    )
  } catch (error) {
    console.error('Error during Google login:', error)
    // Show generic error message
    toast.error('An error occurred during login. Please try again.')
  }
}

// import { signInWithPopup } from 'firebase/auth'
// import { auth, googleProvider } from './firebase' // Імпортуйте ваші Firebase модулі
// import { toast } from 'react-hot-toast'

// export const signInWithGoogle = () => {
//   signInWithPopup(auth, googleProvider)
//     .then((result) => {
//       if (result._tokenResponse.isNewUser) {
//         // Якщо це новий користувач
//         toast.success('Реєстрація успішна! Ласкаво просимо!') // Показуємо успішний тост
//         // Ви можете додатково записати дані користувача в базу
//       } else {
//         // Якщо користувач вже зареєстрований
//         toast.info('Ви вже зареєстровані. Ласкаво просимо назад!') // Показуємо інший тост
//       }
//     })
//     .catch((error) => {
//       console.error('Помилка входу через Google:', error)
//       toast.error('Сталася помилка під час входу. Спробуйте ще раз.') // Показуємо помилку
//     })
// }
