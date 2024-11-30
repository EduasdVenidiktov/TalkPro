import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import { loginValidationSchema } from '../../../validation/validationSchema'
import css from './LogIn.module.css'
import close from '../../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'
import { handleBackdropClick, handleEscapeKey } from '../../../utils/utils'

export function LogIn({ onClose }) {
  const auth = getAuth()

  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    resolver: yupResolver(loginValidationSchema),
    defaultValues: {
      email: '',
      password: '',
      showPassword: false,
    },
  })

  const showPassword = watch('showPassword')

  const handleLogin = async (values) => {
    try {
      const userCredential = await signInWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const token = await userCredential.user.getIdToken() // Отримання токена
      localStorage.setItem('authToken', token) // Збереження токена

      alert('Користувач увійшов:', userCredential.user)
      onClose()
    } catch (error) {
      alert('Помилка при вході:', error.code)
    }
  }

  return (
    // <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
    <div
      className={css.backdrop}
      onClick={(e) => handleBackdropClick(e, onClose)}
    >
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
        <form onSubmit={handleSubmit(handleLogin)}>
          <div className={css.inputWrapper}>
            <input
              type="email"
              placeholder="Email"
              {...register('email')}
              className={css.inputField}
            />
            {errors.email && (
              <div className={css.error}>{errors.email.message}</div>
            )}

            <div className={css.passwordContainer}>
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                {...register('password')}
                className={css.inputField}
              />
              <button
                type="button"
                onClick={() => setValue('showPassword', !showPassword)}
                className={css.eyeIcon}
              >
                <LuEyeOff />
              </button>
            </div>
            {errors.password && (
              <div className={css.error}>{errors.password.message}</div>
            )}
          </div>
          <button type="submit" className={css.btnLogin}>
            Log In
          </button>
        </form>
      </div>
    </div>
  )
}

// import { useEffect } from 'react'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { loginValidationSchema } from '../../../validation/validationSchema'
// import css from './LogIn.module.css'
// import close from '../../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'
// import { handleBackdropClick, handleEscapeKey } from '../../../utils/utils'

// export function LogIn({ onClose }) {
//   const auth = getAuth()

//   useEffect(() => {
//     const handleEscape = handleEscapeKey(onClose)
//     document.addEventListener('keydown', handleEscape)
//     return () => document.removeEventListener('keydown', handleEscape)
//   }, [onClose])

//   const handleLogin = async (values) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       )
//       alert('Користувач увійшов:', userCredential.user)
//       onClose()
//     } catch (error) {
//       alert('Помилка при вході:', error.message)
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
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
//           initialValues={{ email: '', password: '', showPassword: false }}
//           validationSchema={loginValidationSchema}
//           onSubmit={handleLogin}
//         >
//           {({ values, setFieldValue, handleChange, handleBlur }) => (
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
//                 />
//                 <div className={css.passwordContainer}>
//                   <Field
//                     type={values.showPassword ? 'text' : 'password'}
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
