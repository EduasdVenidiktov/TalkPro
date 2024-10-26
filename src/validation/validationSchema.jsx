import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Невірний формат електронної пошти')
    .required('Обов’язкове поле')
    .min(5, 'Електронна пошта повинна містити не менше 5 символів')
    .max(50, 'Електронна пошта повинна містити не більше 50 символів'),
  password: Yup.string()
    .required('Обов’язкове поле')
    .min(8, 'Пароль повинен містити не менше 8 символів')
    .max(20, 'Пароль повинен містити не більше 20 символів'),
})

export const registrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Обов’язкове поле')
    .min(2, "Ім'я повинно містити не менше 2 символів"),
  email: Yup.string()
    .email('Невірний формат електронної пошти')
    .required('Обов’язкове поле')
    .min(5, 'Електронна пошта повинна містити не менше 5 символів')
    .max(50, 'Електронна пошта повинна містити не більше 50 символів'),
  password: Yup.string()
    .required('Обов’язкове поле')
    .min(8, 'Пароль повинен містити не менше 8 символів')
    .max(20, 'Пароль повинен містити не більше 20 символів'),
})

export const lessonValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Обов’язкове поле')
    .min(2, "Ім'я повинно містити не менше 2 символів"),
  email: Yup.string()
    .email('Невірний формат електронної пошти')
    .required('Обов’язкове поле')
    .min(5, 'Електронна пошта повинна містити не менше 5 символів')
    .max(50, 'Електронна пошта повинна містити не більше 50 символів'),
  password: Yup.string()
    .required('Обов’язкове поле')
    .min(8, 'Пароль повинен містити не менше 8 символів')
    .max(20, 'Пароль повинен містити не більше 20 символів'),
})
