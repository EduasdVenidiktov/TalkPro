import { useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registrationValidationSchema } from '../../../validation/validationSchema' // Import your validation schema here
import { handleEscapeKey, handleBackdropClick } from '../../../utils/utils'
import css from './Registration.module.css'
import close from '../../../assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

import { signInWithGoogle } from '/src/data/registrationGoogle.js' // Шлях до вашої функції
import { useAuth } from '/src/AuthProvider'

// Імпорт Firestore
// import { db } from '/src/data/firebase.js' // Імпортуйте ініціалізований Firestore
// import { setDoc, doc, getFirestore } from 'firebase/firestore'
// import { addUserToFirestore } from '/src/data/firebase'
import { db } from '/src/data/firebase.js' // Імпортуйте ініціалізований Firestore
import { doc, setDoc } from 'firebase/firestore'
import { auth } from '/src/data/firebase.js'

export function Registration({ onClose }) {
  // const auth = getAuth()
  const { login } = useAuth()

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
    resolver: yupResolver(registrationValidationSchema),
    defaultValues: {
      name: '',
      email: '',
      password: '',
      showPassword: false,
    },
  })

  const showPassword = watch('showPassword')

  const handleRegister = async (values) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        values.email,
        values.password
      )
      const user = userCredential.user
      await updateProfile(user, { displayName: values.name })

      // Додавання даних користувача в Firestore

      console.log('Firestore path:', `users/${user.uid}`)
      console.log('User data:', {
        name: user.displayName,
        email: values.email,
        createdAt: new Date().toISOString(),
      })

      await setDoc(doc(db, 'users', user.uid), {
        name: values.name,
        email: values.email,
        createdAt: new Date().toISOString(),
      })
      console.log('User added to Firestore:', {
        uid: user.uid,
        name: values.name,
        email: values.email,
      })

      const token = await user.getIdToken()

      console.log(token)

      login(token)

      onClose()
      toast.success(
        <div>
          <strong>Hello, {user.displayName || values.email} 👋 !</strong>
        </div>,
        {
          className: 'toastSuccess',
          duration: 1500,
          onClose: () => onClose(),
        }
      )
    } catch (error) {
      if (error.code === 'auth/email-already-in-use') {
        toast.error(
          'This email is already registered. Please use a different one.',
          {
            className: 'toastError',
            duration: 1500,
          }
        )
      } else {
        toast.error('Registration failed. Please try again.', {
          className: 'toastError',
          duration: 1500,
        })
      }
    }
  }

  // const handleRegister = async (values) => {
  //   try {
  //     const userCredential = await createUserWithEmailAndPassword(
  //       auth,
  //       values.email,
  //       values.password
  //       // values.favorite
  //     )
  //     const user = userCredential.user
  //     await updateProfile(user, { displayName: values.name })

  // Додавання даних користувача в Firestore
  // const db = getFirestore()

  // console.log('Firestore path:', `users/${user.uid}`)
  // console.log('User data:', {
  //   // name: values.name,
  //   name: user.displayName,
  //   email: values.email,
  //   createdAt: new Date().toISOString(),
  // })

  // await setDoc(doc(db, 'users', user.uid), {
  //   name: values.name,
  //   email: values.email,
  //   createdAt: new Date().toISOString(),
  // })
  // console.log('User added to Firestore:', {
  //   uid: user.uid,
  //   name: values.name,
  //   email: values.email,
  // })

  //     const token = await user.getIdToken()
  //     localStorage.setItem('userToken', token)

  //     login(token)

  //     onClose()

  //     toast.success(
  //       <div>
  //         <strong>Hello, {values.email} 👋!</strong>
  //       </div>,
  //       {
  //         className: 'toastSuccess',
  //         duration: 1500,
  //         onClose: () => onClose(),
  //       }
  //     )
  //   } catch (error) {
  //     if (error.code === 'auth/email-already-in-use') {
  //       toast.error(
  //         'This email is already registered. Please use a different one.',
  //         {
  //           className: 'toastError',
  //           duration: 1500,
  //         }
  //       )
  //     } else {
  //       toast.error('Something went wrong. Please try again.', {
  //         className: 'toastError',
  //         duration: 1500,
  //       })
  //     }
  //   }
  // }

  const handleGoogleSignIn = async () => {
    try {
      await signInWithGoogle()
    } catch {
      toast.error('Google sign-in failed.', {
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

        <form onSubmit={handleSubmit(handleRegister)}>
          <div className={css.inputWrapper}>
            <input
              type="text"
              placeholder="Name"
              {...register('name')}
              className={css.inputField}
            />
            {errors.name && (
              <div className={css.error}>{errors.name.message}</div>
            )}

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
                <LuEyeOff size={20} />
              </button>
            </div>
            {errors.password && (
              <div className={css.error}>{errors.password.message}</div>
            )}
          </div>

          <button type="submit" className={css.btnSignIn}>
            Sign Up
          </button>
          <div className={css.googleWrapper}>
            <p>or</p>

            <button type="button" onClick={handleGoogleSignIn}>
              <FcGoogle className={css.googleIcon} />
              Continue with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  )
}

// import { useEffect } from 'react'
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import { useForm } from 'react-hook-form'
// import { yupResolver } from '@hookform/resolvers/yup'
// import { registrationValidationSchema } from '../../../validation/validationSchema' // Import your validation schema here
// import { handleEscapeKey, handleBackdropClick } from '../../../utils/utils'
// import css from './Registration.module.css'
// import close from '../../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'
// import { toast } from 'react-hot-toast'
// import { FcGoogle } from 'react-icons/fc'

// import { signInWithGoogle } from '/src/firebase/registrationGoogle.js' // Шлях до вашої функції
// import { useAuth } from '/src/AuthProvider'

// export function Registration({ onClose }) {
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
//     resolver: yupResolver(registrationValidationSchema),
//     defaultValues: {
//       name: '',
//       email: '',
//       password: '',
//       showPassword: false,
//     },
//   })

//   const showPassword = watch('showPassword')

//   const handleRegister = async (values) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       )
//       const user = userCredential.user
//       await updateProfile(user, { displayName: values.name })

//       const token = await user.getIdToken()
//       localStorage.setItem('userToken', token)

//       login(token)

//       onClose()

//       toast.success(
//         <div>
//           <strong>Hello, {values.email} 👋!</strong>
//         </div>,
//         {
//           className: 'toastSuccess',
//           duration: 1500,
//           onClose: () => onClose(),
//         }
//       )
//     } catch (error) {
//       if (error.code === 'auth/email-already-in-use') {
//         toast.error(
//           'This email is already registered. Please use a different one.',
//           {
//             className: 'toastError',
//             duration: 1500,
//           }
//         )
//       } else {
//         toast.error('Something went wrong. Please try again.', {
//           className: 'toastError',
//           duration: 1500,
//         })
//       }
//     }
//   }

//   const handleGoogleSignIn = async () => {
//     try {
//       await signInWithGoogle()
//     } catch {
//       toast.error('Google sign-in failed.', { duration: 1500 })
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
//       <div className={css.modalSection}>
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
//           information.
//         </p>

//         <form onSubmit={handleSubmit(handleRegister)}>
//           <div className={css.inputWrapper}>
//             <input
//               type="text"
//               placeholder="Name"
//               {...register('name')}
//               className={css.inputField}
//             />
//             {errors.name && (
//               <div className={css.error}>{errors.name.message}</div>
//             )}

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
//                 <LuEyeOff size={20} />
//               </button>
//             </div>
//             {errors.password && (
//               <div className={css.error}>{errors.password.message}</div>
//             )}
//           </div>

//           <button type="submit" className={css.btnSignIn}>
//             Sign Up
//           </button>
//           <div className={css.googleWrapper}>
//             <p>or</p>

//             <button type="button" onClick={handleGoogleSignIn}>
//               <FcGoogle className={css.googleIcon} />
//               Continue with Google
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   )
// }
