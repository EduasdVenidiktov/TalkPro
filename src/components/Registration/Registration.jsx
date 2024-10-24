import { useState } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import css from './Registration.module.css'
import close from '../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'

export function Registration({ onClose }) {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)

  const auth = getAuth()

  // Асинхронная функция для регистрации
  const handleRegister = async () => {
    try {
      // Создание пользователя
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user

      // Обновление профиля пользователя
      await updateProfile(user, { displayName: name })
      alert('Користувач зареєстрований:', user)

      // Закрываем модальное окно после успешной регистрации
      onClose()
    } catch (error) {
      alert('Помилка при реєстрації:', error)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={css.registrationSection}>
      <svg
        className={css.closeIcon}
        aria-label="close registration Icon"
        onClick={onClose}
      >
        <use href={`${close}#close`} />
      </svg>

      <h2 className={css.titleRegistration}>Registration</h2>
      <p className={css.textRegistration}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <div className={css.inputWrapper}>
        <input
          type="text"
          placeholder="Name"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className={css.inputField}
        />
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.inputField}
        />

        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'} // Зміна типу input між text та password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.inputField}
          />
          <button
            type="button"
            onClick={toggleShowPassword}
            className={css.eyeIcon}
          >
            <LuEyeOff />
          </button>
        </div>
      </div>
      <button type="button" className={css.btnSignIn} onClick={handleRegister}>
        Sign Up
      </button>
    </div>
  )
}

//========================== 2 ============================================
// import { useState } from 'react'
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import css from './Registration.module.css'
// import close from '../../assets/icons/sprite.svg'

// export function Registration({ onClose }) {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const auth = getAuth()

//   const handleRegister = () => {
//     createUserWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user
//         return updateProfile(user, { displayName: name }).then(() => {
//           console.log('Користувач зареєстрований:', user)
//           onClose() // Закриваємо модальне вікно після успішної реєстрації
//         })
//       })
//       .catch((error) => {
//         console.error('Помилка при реєстрації:', error)
//       })
//   }

//   return (
//     <div className={css.registrationSection}>
//       <svg
//         className={css.closeIcon}
//         aria-label="close registration Icon"
//         onClick={onClose}
//       >
//         <use href={`${close}#close`} />
//       </svg>

//       <h2 className={css.titleRegistration}>Registration</h2>
//       <p className={css.textRegistration}>
//         Thank you for your interest in our platform! In order to register, we
//         need some information. Please provide us with the following information
//       </p>

//       <div className={css.inputWrapper}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={name}
//           onChange={(e) => setName(e.target.value)}
//           className={css.inputField}
//         />
//         <input
//           type="email"
//           placeholder="Email"
//           value={email}
//           onChange={(e) => setEmail(e.target.value)}
//           className={css.inputField}
//         />
//         <input
//           type="password"
//           placeholder="Password"
//           value={password}
//           onChange={(e) => setPassword(e.target.value)}
//           className={css.inputField}
//         />
//       </div>
//       <button type="button" className={css.btnSignIn} onClick={handleRegister}>
//         Sign Up
//       </button>
//     </div>
//   )
// }

//============================ 1 ==============================================
// import css from './Registration.module.css'
// import close from '../../assets/icons/sprite.svg'

// export function Registration() {
//   return (
//     <div className={css.registrationSection}>
//       <svg className={css.closeIcon} aria-label="close log in Icon">
//         <use href={`${close}#close`} />
//       </svg>

//       <h2 className={css.titleRegistration}>Registration</h2>
//       <p className={css.textRegistration}>
//         Thank you for your interest in our platform! In order to register, we
//         need some information. Please provide us with the following information
//       </p>

//       <div className={css.inputWrapper}>
//         <input type="text" placeholder="Name" className={css.inputField} />
//         <input type="mail" placeholder="Email" className={css.inputField} />
//         <input
//           type="Password"
//           placeholder="Password"
//           className={css.inputField}
//         />
//       </div>
//       <button type="submit" className={css.btnSignIn}>
//         Sign In
//       </button>
//     </div>
//   )
// }
