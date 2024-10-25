import { useEffect } from 'react'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { loginValidationSchema } from '../../validation/validationSchema'
import { handleEscapeKey, handleBackdropClick } from '../../utils/utils'
import css from './LogIn.module.css'
import close from '../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'

export function LogIn({ onClose }) {
  const auth = getAuth()

  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      alert('Користувач увійшов:', userCredential.user)
      onClose()
    } catch (error) {
      alert('Помилка при вході:', error.message)
    }
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
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
        <Formik
          initialValues={{ email: '', password: '', showPassword: false }}
          validationSchema={loginValidationSchema}
          onSubmit={handleLogin}
        >
          {({ values, setFieldValue, handleChange, handleBlur }) => (
            <Form>
              <div className={css.inputWrapper}>
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
                    <LuEyeOff />
                  </button>
                </div>
                <ErrorMessage
                  name="password"
                  component="div"
                  className={css.error}
                />
              </div>
              <button type="submit" className={css.btnLogin}>
                Log In
              </button>
            </Form>
          )}
        </Formik>
      </div>
    </div>
  )
}

//=============== ok ok ok =================================================

// import { useEffect } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import * as Yup from 'yup'
// import css from './LogIn.module.css'
// import close from '../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'

// // Виправлені повідомлення про помилки та довжину
// const validationSchema = Yup.object().shape({
//   email: Yup.string()
//     .email('Невірний формат електронної пошти')
//     .required('Обов’язкове поле')
//     .min(5, 'Електронна пошта повинна містити не менше 5 символів') // Мінімальна довжина
//     .max(50, 'Електронна пошта повинна містити не більше 50 символів'), // Максимальна довжина
//   password: Yup.string()
//     .required('Обов’язкове поле')
//     .min(8, 'Пароль повинен містити не менше 8 символів') // Мінімальна довжина
//     .max(20, 'Пароль повинен містити не більше 20 символів'), // Максимальна довжина
// })

// export function LogIn({ onClose }) {
//   const auth = getAuth()

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

//   const handleLogin = async (values) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       )
//       const user = userCredential.user
//       alert('Користувач увійшов:', user)
//       onClose() // Закриття модального вікна після успішного входу
//     } catch (error) {
//       alert('Помилка при вході:', error)
//     }
//   }

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick}>
//       <div className={css.LoginSection}>
//         <svg
//           className={css.closeIcon}
//           aria-label="close log in Icon"
//           onClick={onClose}
//         >
//           <use href={`${close}#x`} />
//         </svg>
//         <h2 className={css.titleLogin}>Log In</h2>
//         <p className={css.textLogin}>
//           Welcome back! Please enter your credentials to access your account and
//           continue your search for a teacher.
//         </p>

//         <Formik
//           initialValues={{ email: '', password: '', showPassword: false }} // Додано showPassword до initialValues
//           validationSchema={validationSchema}
//           onSubmit={handleLogin}
//         >
//           {({ values, handleChange, handleBlur, setFieldValue }) => (
//             <Form>
//               <div className={css.inputWrapper}>
//                 <Field
//                   type="email"
//                   name="email"
//                   placeholder="Email"
//                   className={css.inputField}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.email}
//                 />
//                 <ErrorMessage
//                   name="email"
//                   component="div"
//                   className={css.error}
//                 />{' '}
//                 {/* Додано для відображення помилки */}
//                 <div className={css.passwordContainer}>
//                   <Field
//                     type={values.showPassword ? 'text' : 'password'} // Використовуйте showPassword з values
//                     name="password"
//                     placeholder="Password"
//                     className={css.inputField}
//                     onChange={handleChange}
//                     onBlur={handleBlur}
//                     value={values.password}
//                   />
//                   <button
//                     type="button"
//                     onClick={() =>
//                       setFieldValue('showPassword', !values.showPassword)
//                     }
//                     className={css.eyeIcon}
//                   >
//                     <LuEyeOff />
//                   </button>
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className={css.error}
//                 />
//                 {/* Додано для відображення помилки */}
//               </div>
//               <button type="submit" className={css.btnLogin}>
//                 Log In
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   )
// }

//=============== 4 super ==================================
// import { useEffect, useState } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import css from './LogIn.module.css'
// import close from '../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'

// export function LogIn({ onClose }) {
//   const [email, setEmail] = useState('')
//   const [password, setPassword] = useState('')
//   const [showPassword, setShowPassword] = useState(false)

//   const auth = getAuth()

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

//   const handleLogin = async () => {
//     try {
//       // Вход пользователя
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         email,
//         password
//       )
//       const user = userCredential.user
//       alert('Користувач увійшов:', user)

//       // Закрытие модального окна после успешного входа
//       onClose()
//     } catch (error) {
//       alert('Помилка при вході:', error)
//     }
//   }

//   const toggleShowPassword = () => {
//     setShowPassword(!showPassword)
//   }

//   const handleBackdropClick = (e) => {
//     if (e.target === e.currentTarget) {
//       onClose()
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick}>
//       <div className={css.LoginSection}>
//         <svg
//           className={css.closeIcon}
//           aria-label="close log in Icon"
//           onClick={onClose}
//         >
//           <use href={`${close}#x`} />
//         </svg>
//         <h2 className={css.titleLogin}>Log In</h2>
//         <p className={css.textLogin}>
//           Welcome back! Please enter your credentials to access your account and
//           continue your search for a teacher.
//         </p>
//         <div className={css.inputWrapper}>
//           <input
//             type="email"
//             placeholder="Email"
//             value={email}
//             onChange={(e) => setEmail(e.target.value)}
//             className={css.inputField}
//           />
//           {/* Контейнер для інпута і іконки */}
//           <div className={css.passwordContainer}>
//             <input
//               type={showPassword ? 'text' : 'password'} // Зміна типу input між text та password
//               placeholder="Password"
//               value={password}
//               onChange={(e) => setPassword(e.target.value)}
//               className={css.inputField}
//             />
//             {/* Іконка ока всередині поля */}
//             <button
//               type="button"
//               onClick={toggleShowPassword}
//               className={css.eyeIcon}
//             >
//               <LuEyeOff />
//             </button>
//           </div>
//         </div>
//         <button type="button" className={css.btnLogin} onClick={handleLogin}>
//           Log In
//         </button>
//       </div>
//     </div>
//   )
// }

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
