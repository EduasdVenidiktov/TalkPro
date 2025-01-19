import * as Yup from 'yup'

export const loginValidationSchema = Yup.object().shape({
  email: Yup.string()
    .email('Invalid email format')
    .required('Required field')
    .min(5, 'Email must be at least 5 characters long')
    .max(50, 'Email must be at most 50 characters long'),
  password: Yup.string()
    .required('Required field')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long'),
})

export const registrationValidationSchema = Yup.object().shape({
  name: Yup.string()
    .required('Required field')
    .min(2, 'Name must be at least 2 characters long')
    .trim(),
  email: Yup.string()
    .email('Invalid email format')
    .required('Required field')
    .min(5, 'Email must be at least 5 characters long')
    .max(50, 'Email must be at most 50 characters long')
    .trim(),
  password: Yup.string()
    .required('Required field')
    .min(8, 'Password must be at least 8 characters long')
    .max(20, 'Password must be at most 20 characters long'),
})

export const lessonValidationSchema = Yup.object().shape({
  fullName: Yup.string()
    .required('Required field')
    .min(2, 'Name must be at least 2 characters long')
    .matches(
      /^[A-Za-zА-Яа-яІіЇїЄєҐґ]{2,} [A-Za-zА-Яа-яІіЇїЄєҐґ]{2,}$/,
      'Please enter your first and last name'
    ), // Проверка на имя и фамилию
  email: Yup.string()
    .email('Invalid email format')
    .required('Required field')
    .min(5, 'Email must be at least 5 characters long')
    .max(50, 'Email must be at most 50 characters long'),
  phoneNumber: Yup.string()
    .required('Required field')
    .matches(/^\+?[0-9]{10,15}$/, 'Invalid phone number format'), // Проверка на формат номера телефона
})
