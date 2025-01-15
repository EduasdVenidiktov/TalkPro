import { useEffect } from 'react'
import { useAuthState } from 'react-firebase-hooks/auth'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { useForm } from 'react-hook-form'
import { yupResolver } from '@hookform/resolvers/yup'
import { handleEscapeKey } from '../../../utils/utils'
import css from './Lesson.module.css'
import close from '/src/assets/icons/sprite.svg'
import { ReasonBox } from './ReasonBox/ReasonBox'
import { lessonValidationSchema } from '../../../validation/validationSchema'
import { toast } from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

export function Lesson({ onClose, avatar_url, name, surname }) {
  const auth = getAuth()
  const [user] = useAuthState(auth)
  const navigate = useNavigate()

  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleRegisterOrLogin = async (data) => {
    try {
      if (!user) {
        const userCredential = await createUserWithEmailAndPassword(
          auth,
          data.email,
          data.password
        )
        const user = userCredential.user
        await updateProfile(user, { displayName: data.name })
        toast.success('User registered successfully!', {
          className: 'toastSuccess',
          duration: 1500,
        })
        navigate('/logIn')
      } else {
        toast.success('Booking trial lesson!', {
          className: 'toastSuccess',
          duration: 1500,
        })
      }
      onClose()
    } catch (error) {
      toast.error('Error during registration or booking: ' + error.message, {
        className: 'toastError',
        duration: 1500,
      })
      reset({
        fullName: '',
        email: '',
        phoneNumber: '',
      })
    }
  }

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm({
    resolver: yupResolver(lessonValidationSchema),
  })

  return (
    <div className={css.backdrop} onClick={handleBackdropClick}>
      <div className={css.lessonSection}>
        <svg className={css.closeIcon} onClick={onClose}>
          <use href={`${close}#close`} />
        </svg>
        <h1 className={css.title}>Book trial lesson</h1>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>
        <div className={css.teacherBox}>
          <img
            src={avatar_url}
            alt="Teacher's avatar"
            className={css.teacherImage}
          />
          <div className={css.teacherInfo}>
            <p className={css.titleTeacher}>Your teacher</p>
            <p className={css.nameTeacher}>{`${name} ${surname}`}</p>
          </div>
        </div>
        <div className={css.reasonBox}>
          <ReasonBox />
        </div>
        <form onSubmit={handleSubmit(handleRegisterOrLogin)}>
          <div className={css.inputWrapper}>
            <input
              type="text"
              placeholder="Full name"
              className={css.inputField}
              {...register('fullName')}
            />
            {errors.fullName && (
              <div className={css.error}>{errors.fullName.message}</div>
            )}
            <input
              type="email"
              placeholder="Email"
              className={css.inputField}
              {...register('email')}
            />
            {errors.email && (
              <div className={css.error}>{errors.email.message}</div>
            )}
            <input
              type="tel"
              placeholder="Phone number"
              className={css.inputField}
              {...register('phoneNumber')}
            />
            {errors.phoneNumber && (
              <div className={css.error}>{errors.phoneNumber.message}</div>
            )}
          </div>
          <button type="submit" className={css.btnSignIn}>
            Book
          </button>
        </form>
      </div>
    </div>
  )
}
