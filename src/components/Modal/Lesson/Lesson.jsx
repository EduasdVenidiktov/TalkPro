import { useEffect } from 'react'
import {
  getAuth,
  createUserWithEmailAndPassword,
  updateProfile,
} from 'firebase/auth'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import { lessonValidationSchema } from '../../../validation/validationSchema'
import { handleEscapeKey, handleBackdropClick } from '../../../utils/utils'
import css from './Lesson.module.css'
import { LuEyeOff } from 'react-icons/lu'
import { ReasonBox } from '../../reasonBox/reasonBox'
import close from '../../../assets/icons/sprite.svg'

export function Lesson({ onClose }) {
  const auth = getAuth()

  useEffect(() => {
    const handleEscape = handleEscapeKey(onClose)
    document.addEventListener('keydown', handleEscape)
    return () => document.removeEventListener('keydown', handleEscape)
  }, [onClose])

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
      <div className={css.lessonSection}>
        <svg
          className={css.closeIcon}
          aria-label="close registration Icon"
          onClick={onClose}
        >
          <use href={`${close}#close`} />
        </svg>

        <h1 className={css.title}>Book trial lesson</h1>
        <p className={css.text}>
          Our experienced tutor will assess your current language level, discuss
          your learning goals, and tailor the lesson to your specific needs.
        </p>

        <div className={css.teacherBox}>
          <p className={css.titleTeacher}>Your teacher</p>
          <div className={css.tacherInfo}>
            <img
              src="../../../assets/Images/Avatar.png"
              alt="Teacher`s avatar"
            />
            <h2 className={css.nameTeacher}>Jane Smith</h2>
          </div>
        </div>

        <div className={css.reasonBox}>
          <ReasonBox />
        </div>

        <Formik
          initialValues={{
            name: '',
            email: '',
            password: '',
            showPassword: false,
          }}
          validationSchema={lessonValidationSchema}
          onSubmit={handleRegister}
        >
          {({ values, setFieldValue, handleChange, handleBlur }) => (
            <Form>
              <div className={css.inputWrapper}>
                <Field
                  type="text"
                  name="name"
                  placeholder="Full name"
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
