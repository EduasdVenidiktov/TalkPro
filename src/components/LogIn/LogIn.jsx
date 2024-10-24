import { useState } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import css from './LogIn.module.css'
import close from '../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'

export function LogIn({ onClose }) {
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const auth = getAuth()

  const handleLogin = async () => {
    try {
      // Вход пользователя
      const userCredential = await signInWithEmailAndPassword(
        auth,
        email,
        password
      )
      const user = userCredential.user
      alert('Користувач увійшов:', user)

      // Закрытие модального окна после успешного входа
      onClose()
    } catch (error) {
      alert('Помилка при вході:', error)
    }
  }

  const toggleShowPassword = () => {
    setShowPassword(!showPassword)
  }

  return (
    <div className={css.LoginSection}>
      <svg
        className={css.closeIcon}
        aria-label="close log in Icon"
        onClick={onClose}
      >
        <use href={`${close}#x`} />
      </svg>
      <h2 className={css.titleLogin}>Log In</h2>
      <p className={css.textLogin}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for a teacher.
      </p>
      <div className={css.inputWrapper}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className={css.inputField}
        />
        {/* Контейнер для інпута і іконки */}
        <div className={css.passwordContainer}>
          <input
            type={showPassword ? 'text' : 'password'} // Зміна типу input між text та password
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className={css.inputField}
          />
          {/* Іконка ока всередині поля */}
          <button
            type="button"
            onClick={toggleShowPassword}
            className={css.eyeIcon}
          >
            <LuEyeOff />
          </button>
        </div>
      </div>
      <button type="button" className={css.btnLogin} onClick={handleLogin}>
        Log In
      </button>
    </div>
  )
}

//========================= 2 ============================================
// import { useState } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import css from './LogIn.module.css'
// import close from '../../assets/icons/sprite.svg'

// export function LogIn({ onClose }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const auth = getAuth()

//   const handleLogin = () => {
//     signInWithEmailAndPassword(auth, email, password)
//       .then((userCredential) => {
//         const user = userCredential.user
//         console.log('Користувач увійшов:', user)
//         onClose() // Закриваємо модальне вікно після успішного входу
//       })
//       .catch((error) => {
//         console.error('Помилка при вході:', error)
//       })
//   }

//   return (
//     <div className={css.LoginSection}>
//       <svg
//         className={css.closeIcon}
//         aria-label="close log in Icon"
//         onClick={onClose}
//       >
//         <use href={`${close}#x`} />
//       </svg>
//       <h2 className={css.titleLogin}>Log In</h2>
//       <p className={css.textLogin}>
//         Welcome back! Please enter your credentials to access your account and
//         continue your search for a teacher.
//       </p>
//       <div className={css.inputWrapper}>
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
//       <button type="button" className={css.btnLogin} onClick={handleLogin}>
//         Log In
//       </button>
//     </div>
//   )
// }

//============================ 1 ======================================================
// import css from './LogIn.module.css'
// import close from '../../assets/icons/sprite.svg'

// export function LogIn() {
//   return (
//     <div className={css.LoginSection}>
//       <svg className={css.closeIcon} aria-label="close log in Icon">
//         <use href={`${close}#x`} />
//       </svg>
//       <h2 className={css.titleLogin}>Log In</h2>
//       <p className={css.textLogin}>
//         Welcome back! Please enter your credentials to access your account and
//         continue your search for an teacher.
//       </p>
//       <div className={css.inputWrapper}>
//         <input type="text" placeholder="Email" className={css.inputField} />
//         <input
//           type="password"
//           placeholder="Password"
//           className={css.inputField}
//         />
//       </div>
//       <button type="submit" className={css.btnLogin}>
//         Log In
//       </button>
//     </div>
//   )
// }
