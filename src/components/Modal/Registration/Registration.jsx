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

// import { useEffect } from 'react'
// import {
//   getAuth,
//   createUserWithEmailAndPassword,
//   updateProfile,
// } from 'firebase/auth'
// import { Formik, Form, Field, ErrorMessage } from 'formik'
// import { registrationValidationSchema } from '../../../validation/validationSchema' // Import your validation schema here
// import { handleEscapeKey, handleBackdropClick } from '../../../utils/utils'
// import css from './Registration.module.css'
// import close from '../../../assets/icons/sprite.svg'
// import { LuEyeOff } from 'react-icons/lu'

// export function Registration({ onClose }) {
//   const auth = getAuth()

//   // Закриття модального вікна по натисканню клавіші Esc
//   useEffect(() => {
//     const handleEscape = handleEscapeKey(onClose)
//     document.addEventListener('keydown', handleEscape)
//     return () => document.removeEventListener('keydown', handleEscape)
//   }, [onClose])

//   // Асинхронна функція для реєстрації
//   const handleRegister = async (values) => {
//     try {
//       const userCredential = await createUserWithEmailAndPassword(
//         auth,
//         values.email,
//         values.password
//       )
//       const user = userCredential.user

//       await updateProfile(user, { displayName: values.name })
//       alert('Користувач зареєстрований:', user)

//       onClose()
//     } catch (error) {
//       alert('Помилка при реєстрації:', error.message)
//     }
//   }

//   return (
//     <div className={css.backdrop} onClick={handleBackdropClick(onClose)}>
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
//           information.
//         </p>

//         <Formik
//           initialValues={{
//             name: '',
//             email: '',
//             password: '',
//             showPassword: false,
//           }}
//           validationSchema={registrationValidationSchema}
//           onSubmit={handleRegister}
//         >
//           {({ values, setFieldValue, handleChange, handleBlur }) => (
//             <Form>
//               <div className={css.inputWrapper}>
//                 <Field
//                   type="text"
//                   name="name"
//                   placeholder="Name"
//                   className={css.inputField}
//                   onChange={handleChange}
//                   onBlur={handleBlur}
//                   value={values.name}
//                 />
//                 <ErrorMessage
//                   name="name"
//                   component="div"
//                   className={css.error}
//                 />

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
//                     <LuEyeOff size={20} />
//                   </button>
//                 </div>
//                 <ErrorMessage
//                   name="password"
//                   component="div"
//                   className={css.error}
//                 />
//               </div>

//               <button type="submit" className={css.btnSignIn}>
//                 Sign Up
//               </button>
//             </Form>
//           )}
//         </Formik>
//       </div>
//     </div>
//   )
// }
