import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherCard } from './TeacherCard/TeacherCard'
import { database, ref, get, child } from '../../firebase/firebase' // Подключите Firebase
import { Filters } from '/src/components/Filters/Filters'

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
      <Filters />
      {teachers.map((teacher) => (
        <TeacherCard key={teacher.id} {...teacher} />
      ))}
    </div>
  )
}
