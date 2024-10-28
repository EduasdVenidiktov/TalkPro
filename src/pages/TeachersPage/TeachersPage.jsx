// import css from './Teachers.module.css'
// import { ref, get } from 'firebase/database'
// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { setTeachers } from './redux/teachersSlice' // Імпорт дії для збереження в Redux (якщо використовується)
// import TeacherCard from '../../components/TeacherCard/TeacherCard'

import { Link } from 'react-router-dom'

export function TeachersPage() {
  return (
    <div>
      <Link to="/">Go to main page</Link>
      <h1>TeacherPage</h1>
    </div>
  )
}

// // Функція для отримання даних про викладачів
// export function TeachersPage(database) {
//   const dbRef = ref(database, 'teachers')
//   return get(dbRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         return snapshot.val()
//       } else {
//         console.log('Дані не знайдено')
//         return []
//       }
//     })
//     .catch((error) => {
//       console.error('Помилка при отриманні даних:', error)
//       return []
//     })
// }

// // Використання функції у компоненті
// function TeachersPage() {
//   const [teachers, setTeachers] = useState([])
//   const dispatch = useDispatch()
//   const database = getDatabase() // Використовуйте вашу ініціалізовану базу даних Firebase

//   useEffect(() => {
//     fetchTeachers(database).then((data) => {
//       setTeachers(data)
//       dispatch(setTeachers(data)) // Додавання до Redux, якщо потрібно
//     })
//   }, [database, dispatch])

//   return (
//     <div>
//       {teachers.map((teacher, index) => (
//         <TeacherCard key={index} {...teacher} />
//       ))}
//     </div>
//   )
// }
