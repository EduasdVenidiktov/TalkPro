// import css from './Teachers.module.css'
// import { ref, get } from 'firebase/database'
// import { useState, useEffect } from 'react'
// import { useDispatch } from 'react-redux'
// import { setTeachers } from './redux/teachersSlice' // Імпорт дії для збереження в Redux (якщо використовується)
// import TeacherCard from '../../components/TeacherCard/TeacherCard'

// TeachersPage.jsx
import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherCard } from './TeacherCard/TeacherCard'
import { database, ref, get, child } from '../../firebase/firebase' // Подключите Firebase

export function TeachersPage() {
  const [teachers, setTeachers] = useState([])

  useEffect(() => {
    const fetchTeachers = async () => {
      const dbRef = ref(database)
      try {
        const snapshot = await get(child(dbRef, 'teachers'))
        if (snapshot.exists()) {
          const data = snapshot.val()
          const teachersArray = Object.keys(data).map((key) => ({
            id: key,
            ...data[key],
          }))
          setTeachers(teachersArray)
        } else {
          console.log('Дані не знайдено')
        }
      } catch (error) {
        console.error('Помилка при отриманні даних:', error)
      }
    }

    fetchTeachers()
  }, [])

  return (
    <div>
      <Link to="/">Go to main page</Link>
      <h1>TeacherPage</h1>
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} {...teacher} />
      ))}
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
