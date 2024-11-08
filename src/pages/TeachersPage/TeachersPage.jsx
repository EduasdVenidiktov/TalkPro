import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { TeacherCard } from './TeacherCard/TeacherCard'
import { database, ref, get, child } from '../../firebase/firebase' // Подключите Firebase
import { Filters } from '/src/components/Filters/Filters'

export function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([]) // Доданий стан для фільтрованих викладачів
  const [filters, setFilters] = useState({
    language: '',
    level: '',
    price: '',
  })

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
          setFilteredTeachers(teachersArray) // Початкове значення фільтрованих викладачів
        } else {
          console.log('Дані не знайдено')
        }
      } catch (error) {
        console.error('Помилка при отриманні даних:', error)
      }
    }

    fetchTeachers()
  }, [])

  useEffect(() => {
    // Функція для фільтрації викладачів за вибраними фільтрами
    const applyFilters = () => {
      const filtered = teachers.filter((teacher) => {
        const matchesLanguage = filters.language
          ? teacher.languages.includes(filters.language)
          : true
        const matchesLevel = filters.level
          ? teacher.levels.includes(filters.level)
          : true
        const matchesPrice = filters.price
          ? teacher.price_per_hour <= parseInt(filters.price)
          : true

        return matchesLanguage && matchesLevel && matchesPrice
      })
      setFilteredTeachers(filtered)
    }

    applyFilters()
  }, [teachers, filters])

  return (
    <div>
      <Link to="/">Go to main page</Link>
      <Filters setFilters={setFilters} />

      {/* Перевірка, чи є картки, що відповідають фільтрам */}
      {filteredTeachers.length > 0 ? (
        filteredTeachers.map((teacher) => (
          <TeacherCard key={teacher.id} {...teacher} />
        ))
      ) : (
        <p>Немає викладачів, що відповідають обраним фільтрам.</p>
      )}
    </div>
  )
}
