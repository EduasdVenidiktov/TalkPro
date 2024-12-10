import { useEffect, useState } from 'react'
import { TeacherCard } from './TeacherCard/TeacherCard'
import teachersData from '../../data/teachers.json' // Импорт JSON
import { Filters } from '/src/components/Filters/Filters'
import css from './TeachersPage.module.css'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import toast from 'react-hot-toast'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [visibleTeachers, setVisibleTeachers] = useState(4)
  const [filters, setFilters] = useState({ language: '', level: '', price: '' })
  const [isFirstRender, setIsFirstRender] = useState(true)

  useEffect(() => {
    const fetchTeachers = () => {
      const teachersArray = teachersData.map((teacher, index) => ({
        id: index + 1,
        ...teacher,
      }))
      setTeachers(teachersArray)
      setFilteredTeachers(teachersArray)
    }
    fetchTeachers()
  }, [])

  useEffect(() => {
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

      if (!isFirstRender && filtered.length === 0) {
        toast.error('Please select a higher price.', {
          className: css.toastError,
          duration: 2000,
        })
      }
    }

    applyFilters()
  }, [teachers, filters, isFirstRender])

  useEffect(() => {
    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  const handleLoadMore = () => {
    setVisibleTeachers((prevVisible) => prevVisible + 4)
    setTimeout(() => {
      const cards = document.querySelectorAll('.card')
      if (cards.length > 0) {
        const maxCardHeight = Math.max(
          ...Array.from(cards).map((card) => card.offsetHeight)
        )
        window.scrollBy({
          top: maxCardHeight * 3,
          behavior: 'smooth',
        })
      } else {
        window.scrollBy({
          top: 600,
          behavior: 'smooth',
        })
      }
    }, 200)
  }

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    })
  }

  return (
    <div>
      <HomeHeader />
      <Filters setFilters={setFilters} />

      {filteredTeachers.slice(0, visibleTeachers).map((teacher) => (
        <TeacherCard
          key={teacher.id}
          {...teacher}
          selectedLevel={filters.level}
        />
      ))}

      {visibleTeachers < filteredTeachers.length ? (
        <button onClick={handleLoadMore} className={css.btnLoadMore}>
          Load more
        </button>
      ) : (
        <p className={css.noMoreTeachers}>All teachers have been loaded.</p>
      )}

      {filteredTeachers.length === 0 ? (
        <p className={css.commentFilters}>
          No teachers match the selected filters.
        </p>
      ) : (
        visibleTeachers >= filteredTeachers.length && (
          <button onClick={scrollToTop} className={css.scrollToTopBtn}>
            ↑ Scroll to Top
          </button>
        )
      )}
    </div>
  )
}

// import { useEffect, useState } from 'react'
// import { TeacherCard } from './TeacherCard/TeacherCard'
// import teachersData from '../../data/teachers.json' // Импорт JSON

// // import { database, ref, get, child } from '../../firebase/firebase'
// import { Filters } from '/src/components/Filters/Filters'
// import css from './TeachersPage.module.css'
// import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
// import toast from 'react-hot-toast'

// // import { Navigate } from 'react-router-dom'

// export default function TeachersPage() {
//   const [teachers, setTeachers] = useState([]) // Стан для всіх викладачів
//   const [filteredTeachers, setFilteredTeachers] = useState([]) // Стан для фільтрованих викладачів
//   const [visibleTeachers, setVisibleTeachers] = useState(4) // Стан для кількості видимих карток
//   const [filters, setFilters] = useState({
//     language: '',
//     level: '',
//     price: '',
//   })

//   const [isFirstRender, setIsFirstRender] = useState(true) // Стан для перевірки першого рендеру

//   useEffect(() => {
//     // Загрузка данных из teachers.json
//     const fetchTeachers = () => {
//       const teachersArray = teachersData.map((teacher, index) => ({
//         id: index + 1, // Добавляем уникальный ID, если его нет
//         ...teacher,
//       }))
//       setTeachers(teachersArray)
//       setFilteredTeachers(teachersArray) // Початково всі викладачі — це фільтровані
//     }
//     fetchTeachers()
//   }, [])
//   //                  DATA Firebase
//   // useEffect(() => {
//   //   const fetchTeachers = async () => {
//   //     const dbRef = ref(database)
//   //     try {
//   //       const snapshot = await get(child(dbRef, 'teachers'))
//   //       if (snapshot.exists()) {
//   //         const data = snapshot.val()
//   //         const teachersArray = Object.keys(data).map((key) => ({
//   //           id: key,
//   //           ...data[key],
//   //         }))
//   //         setTeachers(teachersArray)
//   //         setFilteredTeachers(teachersArray) // Початково всі викладачі — це фільтровані
//   //       } else {
//   //         console.log('Дані не знайдено')
//   //       }
//   //     } catch (error) {
//   //       console.error('Помилка при отриманні даних:', error)
//   //     }
//   //   }

//   //   fetchTeachers()
//   // }, [])

//   useEffect(() => {
//     // Фільтрація викладачів
//     const applyFilters = () => {
//       const filtered = teachers.filter((teacher) => {
//         const matchesLanguage = filters.language
//           ? teacher.languages.includes(filters.language)
//           : true
//         const matchesLevel = filters.level
//           ? teacher.levels.includes(filters.level)
//           : true
//         const matchesPrice = filters.price
//           ? teacher.price_per_hour <= parseInt(filters.price)
//           : true

//         return matchesLanguage && matchesLevel && matchesPrice
//       })
//       setFilteredTeachers(filtered)

//       // Показуємо повідомлення тільки коли немає результатів і фільтри змінено
//       if (!isFirstRender && filtered.length === 0) {
//         toast.error('Please select a higher price.', {
//           className: css.toastError,
//           duration: 1500,
//         })
//       }
//     }

//     applyFilters()
//   }, [teachers, filters, isFirstRender]) // Залежність від teachers та filters

//   useEffect(() => {
//     // Після першого рендеру змінюємо isFirstRender на false
//     if (isFirstRender) {
//       setIsFirstRender(false)
//     }
//   }, [isFirstRender])

//   const handleLoadMore = () => {
//     setVisibleTeachers((prevVisible) => prevVisible + 4)
//     setTimeout(() => {
//       // Находим все карточки на странице
//       const cards = document.querySelectorAll('.card') // Используйте общий класс для всех карточек
//       if (cards.length > 0) {
//         // Вычисляем максимальную высоту карточки
//         const maxCardHeight = Math.max(
//           ...Array.from(cards).map((card) => card.offsetHeight)
//         )

//         // Прокручиваем на высоту двух карточек
//         window.scrollBy({
//           top: maxCardHeight * 3,
//           behavior: 'smooth',
//         })
//       } else {
//         // Если карточки не найдены, можно задать стандартную высоту
//         window.scrollBy({
//           top: 600, // Стандартное значение, если карточки не найдены
//           behavior: 'smooth',
//         })
//       }
//     }, 200)
//   }

//   // const isLoggedIn = !!localStorage.getItem('authToken') // Проверяем, есть ли токен

//   // if (!isLoggedIn) {
//   //   return <Navigate to="/" replace /> // Перенаправляем на главную страницу
//   // }

//   return (
//     <div>
//       <HomeHeader />
//       <Filters setFilters={setFilters} />

//       {/* Відображення фільтрованих карток, обмежених значенням visibleTeachers */}
//       {filteredTeachers.slice(0, visibleTeachers).map((teacher) => (
//         <TeacherCard
//           key={teacher.id}
//           {...teacher}
//           selectedLevel={filters.level}
//         />
//       ))}

//       {/* Кнопка "Load more" з умовою */}
//       {visibleTeachers < filteredTeachers.length ? (
//         <button onClick={handleLoadMore} className={css.btnLoadMore}>
//           Load more
//         </button>
//       ) : (
//         <p className={css.noMoreTeachers}>No more teachers to load.</p>
//       )}

//       {/* Повідомлення, якщо немає результатів за фільтрами */}
//       {filteredTeachers.length === 0 && (
//         <p className={css.commentFilters}>
//           No teachers match the selected filters.
//         </p>
//       )}
//     </div>
//   )
// }
