import { useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { registrationValidationSchema } from '../../../validation/validationSchema' // Import your validation schema here
import { handleEscapeKey, handleBackdropClick } from '../../../utils/utils'
import css from './Registration.module.css'
import close from '../../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'

export function Registration({ onClose }) {
  const auth = getAuth()

  // Закриття модального вікна по натисканню клавіші Esc
  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Асинхронна функція для реєстрації
  const handleRegister = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user

      await updateProfile(user, { displayName: values.name })
      alert('Користувач зареєстрований:', user)

      onClose()
    } catch (error) {
      alert('Помилка при реєстрації:', error.message)
    }
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
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
          need some information. Please provide us with the following
          information.
        </p>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            showPassword: false,
          }}
          validationSchema={registrationValidationSchema}
          onSubmit={handleRegister}
        >
          {({ values, setFieldValue, handleChange, handleBlur }) => (
            <Form>
              <div className={css.inputWrapper}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Name"
                  className={css.inputField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.name}
                />
                <ErrorMessage
                  name="name"
                  component="div"
                  className={css.error}
                />

                <Field
                  type="email"
                  name="email"
                  placeholder="Email"
                  className={css.inputField}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  value={values.email}
                />
                <ErrorMessage
                  name="email"
                  component="div"
                  className={css.error}
                />

                <div className={css.passwordContainer}>
                  <Field
                    type={values.showPassword ? 'text' : 'password'}
                    name="password"
                    placeholder="Password"
                    className={css.inputField}
                    onChange={handleChange}
                    onBlur={handleBlur}
                    value={values.password}
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setFieldValue('showPassword', !values.showPassword)
                    }
                    className={css.eyeIcon}
                  >
                    <LuEyeOff size={20} />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>

              <button type="submit" className={css.btnSignIn}>
                Sign Up
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

// import { useEffect, useState } from 'react'
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import css from './Registration.module.css'
// import close from '../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'

// export function Registration({ onClose }) {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

//   const auth = getAuth()

//   // Закриття модального вікна по натисканню клавіші Esc
//   useEffect(() => {
//     const handleEscapeKey = (e) => {
//       if (e.key === 'Escape') {
//         onClose()
//       }
//     }

//     document.addEventListener('keydown', handleEscapeKey)

//     return () => {
//       document.removeEventListener('keydown', handleEscapeKey)
//     }
//   }, [onClose])

//   // Асинхронна функція для реєстрації
//   const handleRegister = async () => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user

//       await updateProfile(user, { displayName: name })
//       alert('Користувач зареєстрований:', user)

//       onClose()
//     } catch (error) {
//       alert('Помилка при реєстрації:', error)
//     }
//   }

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword)
//   }

//   // Закриття по кліку на `backdrop`
//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick}>
//       <div className={css.registrationSection}>
//         <svg
//           className={css.closeIcon}
//           aria-label="close registration Icon"
//           onClick={onClose}
//         >
//           <use href={`${close}#close`} />
//         </svg>

//         <h2 className={css.titleRegistration}>Registration</h2>
//         <p className={css.textRegistration}>
//           Thank you for your interest in our platform! In order to register, we
//           need some information. Please provide us with the following
//           information
//         </p>

//         <div className={css.inputWrapper}>
//           <input
//             type="text"
//             placeholder="Name"
//             value={name}
//             onChange={(e) => setName(e.target.value)}
//             className={css.inputField}
//           />
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={css.inputField}
//           />

//           <div className={css.passwordContainer}>
//             <input
//               type={showPassword ? 'text' : 'password'}
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={css.inputField}
//             />
//             <button
//               type="button"
//               onClick={toggleShowPassword}
//               className={css.eyeIcon}
//             >
//               <LuEyeOff size={20} />
//             </button>
//           </div>
//         </div>
//         <button
//           type="button"
//           className={css.btnSignIn}
//           onClick={handleRegister}
//         >
//           Sign Up
//         </button>
//       </div>
//     </div>
//   )
// }

//================= 3 ok ====================================
// import { useState } from 'react'
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import css from './Registration.module.css'
// import close from '../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'

// export function Registration({ onClose }) {
//   const [name, setName] = useState('')
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

//   const auth = getAuth()

//   // Асинхронная функция для регистрации
//   const handleRegister = async () => {
//     try {
//       // Создание пользователя
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user

//       // Обновление профиля пользователя
//       await updateProfile(user, { displayName: name })
//       alert('Користувач зареєстрований:', user)

//       // Закрываем модальное окно после успешной регистрации
//       onClose()
//     } catch (error) {
//       alert('Помилка при реєстрації:', error)
//     }
//   }

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword)
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

//         <div className={css.passwordContainer}>
//           <input
//             type={showPassword ? 'text' : 'password'} // Зміна типу input між text та password
//             placeholder="Password"
//             value={password}
//             onChange={(e) => setPassword(e.target.value)}
//             className={css.inputField}
//           />
//           <button
//             type="button"
//             onClick={toggleShowPassword}
//             className={css.eyeIcon}
//           >
//             <LuEyeOff />
//           </button>
//         </div>
//       </div>
//       <button type="button" className={css.btnSignIn} onClick={handleRegister}>
//         Sign Up
//       </button>
//     </div>
//   )
// }

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
