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

export function Registration({ onClose }) {
  const auth = getAuth()

  // Закриття модального вікна по натисканню клавіші Esc
  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

  // Ініціалізація форми з react-hook-form
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

      const token = await user.getIdToken() // Отримання токена
      localStorage.setItem('userToken', token) // Збереження токена

      toast.success(
        <div>
          <strong>
            <> Hello, </>
            {values.email} 👋!
          </strong>
        </div>,
        {
          style: {
            backgroundColor: '#4bb543',
            color: '#fff',
            fontSize: '24px',
            borderRadius: '24px',
            padding: '12px 20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          },
          duration: 3000, // Продолжительность в миллисекундах (5000 = 5 секунд)
        }
      )

      onClose()
    } catch {
      toast.error(
        'This email is already registered. Please use a different one.',
        {
          style: {
            backgroundColor: '#d32f2f',
            color: '#fff',
            fontSize: '24px',
            borderRadius: '24px',
            padding: '12px 20px',
            boxShadow: '0 2px 8px rgba(0, 0, 0, 0.2)',
          },
          duration: 3000, // Продолжительность в миллисекундах (5000 = 5 секунд)
        }
      )
    }
    // } catch (error) {
    //   toast.error(`Error during registration:            ${error.message}`)
    // }
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
        </form>
      </div>
    </div>
  )
}
