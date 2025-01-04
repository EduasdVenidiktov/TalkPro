import { useEffect } from 'react'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { loginValidationSchema } from '../../../validation/validationSchema'
import css from './LogIn.module.css'
import close from '../../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'
import { handleBackdropClick, handleEscapeKey } from '../../../utils/utils'
import { toast } from 'react-hot-toast'
import { auth } from '/src/data/firebase.js'

export function LogIn({ onClose }) {
  // const auth = getAuth()

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
      const user = userCredential.user // Отримуємо об'єкт користувача
      const uid = user.uid // Отримуємо UID користувача
      console.log('User UID:', uid) // Тепер ви використовуєте значення

      toast.success(
        <strong>
          <> Hello 👋, </>
          {values.email} !
        </strong>,
        {
          className: 'toastSuccess',
          duration: 2000,
        }
      )
      onClose()
    } catch {
      toast.error('Login error', {
        className: 'toastError',
        duration: 1500,
      })
    }
  }

  return (
    <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
      <div className={css.modalSection}>
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
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
// import { loginValidationSchema } from '../../../validation/validationSchema'
// import css from './LogIn.module.css'
// import close from '../../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'
// import { handleBackdropClick, handleEscapeKey } from '../../../utils/utils'
// import { toast } from 'react-hot-toast'
// import { useAuth } from '/src/AuthProvider'

// export function LogIn({ onClose }) {
//   const auth = getAuth()
//   const { login } = useAuth()

//   useEffect(() => {
//     const handleEscape = handleEscapeKey(onClose)
//     document.addEventListener('keydown', handleEscape)
//     return () => document.removeEventListener('keydown', handleEscape)
//   }, [onClose])

//   const {
//     register,
//     handleSubmit,
//     formState: { errors },
//     setValue,
//     watch,
//   } = useForm({
//     resolver: yupResolver(loginValidationSchema),
//     defaultValues: {
//       email: '',
//       password: '',
//       showPassword: false,
//     },
//   })

//   const showPassword = watch('showPassword')

//   const handleLogin = async (values) => {
//     try {
//       const userCredential = await signInWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       )
//       const token = await userCredential.user.getIdToken() // Отримання токена
//       localStorage.setItem('userToken', token) // Збереження токена

//       onClose()
//       toast.success(
//         <strong>
//           <> Hello 👋, </>
//           {values.email} !
//         </strong>,
//         {
//           className: 'toastSuccess',
//           duration: 2000,
//         }
//       )
//     } catch {
//       toast.error('Login error', {
//         className: 'toastError',
//         duration: 1500,
//       })
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
//       <div className={css.modalSection}>
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
//         <form onSubmit={handleSubmit(handleLogin)}>
//           <div className={css.inputWrapper}>
//             <input
//               type="email"
//               placeholder="Email"
//               {...register('email')}
//               className={css.inputField}
//             />
//             {errors.email && (
//               <div className={css.error}>{errors.email.message}</div>
//             )}

//             <div className={css.passwordContainer}>
//               <input
//                 type={showPassword ? 'text' : 'password'}
//                 placeholder="Password"
//                 {...register('password')}
//                 className={css.inputField}
//               />
//               <button
//                 type="button"
//                 onClick={() => setValue('showPassword', !showPassword)}
//                 className={css.eyeIcon}
//               >
//                 <LuEyeOff />
//               </button>
//             </div>
//             {errors.password && (
//               <div className={css.error}>{errors.password.message}</div>
//             )}
//           </div>
//           <button type="submit" className={css.btnLogin} onClick={login}>
//             Log In
//           </button>
//         </form>
//       </div>
//     </div>
//   )
// }
