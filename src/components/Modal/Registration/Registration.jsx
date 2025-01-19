import { useEffect } from 'react'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { registrationValidationSchema } from '/src/validation/validationSchema' // Import your validation schema here
import { handleEscapeKey, handleBackdropClick } from '/src/data/options.js'
import css from './Registration.module.css'
import close from '/src/assets/icons/sprite.svg'
import { LuEyeOff } from 'react-icons/lu'
import { toast } from 'react-hot-toast'
import { FcGoogle } from 'react-icons/fc'

import { signInWithGoogle } from '/src/data/registrationGoogle.js' // Шлях до вашої функції
import { useAuth } from '/src/AuthProvider'

import { db } from '/src/data/firebase.js' // Імпортуйте ініціалізований Firestore
import { doc, setDoc } from 'firebase/firestore'
import { auth } from '/src/data/firebase.js'

export function Registration({ onClose }) {
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

      await setDoc(doc(db, 'users', user.uid), {
        name: values.name,
        email: values.email,
        createdAt: new Date().toISOString(),
      })

      const token = await user.getIdToken()

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
            duration: 2500,
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
