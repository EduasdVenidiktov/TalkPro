import { useEffect } from 'react'
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

import { toast } from 'react-toastify' // Для уведомлений
import { useNavigate } from 'react-router-dom' // Для перенаправления

export function Lesson({ onClose, avatar_url, name, surname }) {
  const auth = getAuth()
  const navigate = useNavigate() // Инициализация navigate для перенаправления

  // Добавляем только обработчик для Escape
  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [onClose])

  const handleBackdropClick = (e) => {
    // Проверяем, если клик был непосредственно на фоне (backdrop), закрываем модальное окно
    if (e.target === e.currentTarget) {
      onClose()
    }
  }

  const handleRegister = async (data) => {
    try {
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        data.email,
        data.password
      )
      const user = userCredential.user

      await updateProfile(user, { displayName: data.name })
      // alert('Користувач зареєстрований:', user)
      toast.success('Користувач зареєстрований!') // Уведомление об успешной регистрации

      navigate('/logIn')

      reset({
        fullName: '',
        email: '',
        phoneNumber: '',
      }) // Очищаем форму

      onClose()
    } catch (error) {
      alert('Помилка при реєстрації:', error.message)
      console.error('Error during registration:', error) // Додаткове логування

      toast.error('Помилка при реєстрації: ' + error.message) // Уведомление о ошибке
    }
  }

  // Використання react-hook-form
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
        <div className={css.lessonContent}>
          <svg
            className={css.closeIcon}
            aria-label="close registration Icon"
            onClick={onClose}
          >
            <use href={`${close}#close`} />
          </svg>

          <h1 className={css.title}>Book trial lesson</h1>
          <p className={css.text}>
            Our experienced tutor will assess your current language level,
            discuss your learning goals, and tailor the lesson to your specific
            needs.
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

          <form onSubmit={handleSubmit(handleRegister)}>
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

              <div className={css.passwordContainer}>
                <input
                  type="tel" // Тип для ввода номера телефона
                  placeholder="Phone number" // Плейсхолдер с текстом "Phone number"
                  className={css.inputField}
                  {...register('phoneNumber')} // Здесь предполагается, что в форме используется поле 'phoneNumber'
                />
              </div>
              {errors.phoneNumber && ( // Используем 'phoneNumber' для отображения ошибки
                <div className={css.error}>{errors.phoneNumber.message}</div>
              )}
            </div>

            <button type="submit" className={css.btnSignIn}>
              Book
            </button>
          </form>
        </div>
      </div>
    </div>
  )
}
