import { useEffect, useState } from 'react'
import { TeacherCard } from './TeacherCard/TeacherCard'
import { getTeachersData } from '/src/data/firebase.js'

import { Filters } from '/src/components/Filters/Filters'
import css from './TeachersPage.module.css'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import { TbArrowBigUpLinesFilled } from 'react-icons/tb'
import { useAuth } from '/src/AuthProvider'
import { handleToggleFavorite } from '/src/data/firebase.js'
import Loader from '/src/components/Loader/Loader'

export default function TeachersPage() {
  const [teachers, setTeachers] = useState([])
  const [filteredTeachers, setFilteredTeachers] = useState([])
  const [visibleTeachers, setVisibleTeachers] = useState(4)
  const [filters, setFilters] = useState({ language: '', level: '', price: '' })
  const [isFirstRender, setIsFirstRender] = useState(true)
  const [favorites, setFavorites] = useState([]) // Стан для обраних викладачів
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userToken')
  ) // Авторизація

  const [isLoading, setIsLoading] = useState(true) // Стан для відображення Loader'а

  const { isNewUser } = useAuth() // Достаємо isNewUser з контексту

  useEffect(() => {
    const fetchTeachers = async () => {
      setIsLoading(true)

      const teachersArray = await getTeachersData() // Викликаємо асинхронну функцію
      console.log('teachersArray', teachersArray)

      if (Array.isArray(teachersArray)) {
        // Перевіряємо, чи це масив
        const teachersWithId = teachersArray.map((teacher, index) => ({
          id: index + 1,
          ...teacher,
        }))
        setTeachers(teachersWithId) // Оновлюємо стан для вчителів
        setFilteredTeachers(teachersWithId) // Оновлюємо стан для відфільтрованих вчителів
      } else {
      }
      setIsLoading(false)
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
          top: 496,
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

  const handleLogOut = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)

    setFavorites([])
  }

  return (
    <div>
      <HomeHeader isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />
      <Filters setFilters={setFilters} />

      {isLoading ? (
        <div className={css.loaderContainer}>
          <Loader />
        </div>
      ) : filteredTeachers.length === 0 ? (
        <p className={css.commentFilters}>
          No teachers match the selected filters.
        </p>
      ) : (
        <>
          {filteredTeachers.slice(0, visibleTeachers).map((teacher) => (
            <TeacherCard
              key={teacher.id}
              {...teacher}
              selectedLevel={filters.level}
              onToggleFavorite={handleToggleFavorite}
              isFavorite={favorites.includes(teacher.id)}
              isNewUser={isNewUser}
            />
          ))}

          {visibleTeachers < filteredTeachers.length ? (
            <button onClick={handleLoadMore} className={css.btnLoadMore}>
              Load more
            </button>
          ) : (
            <p className={css.noMoreTeachers}>All teachers have been loaded.</p>
          )}
          {filteredTeachers.slice(0, visibleTeachers).length >= 3 &&
            visibleTeachers >= filteredTeachers.length && (
              <button onClick={scrollToTop} className={css.scrollToTopBtn}>
                <span>
                  <TbArrowBigUpLinesFilled />
                </span>
                Scroll to Top
              </button>
            )}
        </>
      )}
    </div>
  )
}
