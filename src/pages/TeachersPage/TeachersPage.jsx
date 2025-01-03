import { useEffect, useState } from 'react'
import { TeacherCard } from './TeacherCard/TeacherCard'
// import teachersData from '../../data/teachers.json' // Імпорт JSON
import { getTeachersData } from '/src/data/firebase.js'

import { Filters } from '/src/components/Filters/Filters'
import css from './TeachersPage.module.css'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import toast from 'react-hot-toast'
import { TbArrowBigUpLinesFilled } from 'react-icons/tb'
import { useAuth } from '/src/AuthProvider'

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
  const [hasShownPriceMessage, setHasShownPriceMessage] = useState(false)

  // const [showMessage, setShowMessage] = useState(false) // Стан для перевірки повідомлення

  const { isNewUser } = useAuth() // Достаємо isNewUser з контексту

  // useEffect(() => {
  //   const fetchTeachers = () => {
  //     const teachersArray = getTeachersData.map((teacher, index) => ({
  //       id: index + 1,
  //       ...teacher,
  //     }))
  //     setTeachers(teachersArray)
  //     setFilteredTeachers(teachersArray)
  //   }
  //   fetchTeachers()
  // }, [])

  useEffect(() => {
    const fetchTeachers = async () => {
      const teachersArray = await getTeachersData() // Викликаємо асинхронну функцію
      if (Array.isArray(teachersArray)) {
        // Перевіряємо, чи це масив
        const teachersWithId = teachersArray.map((teacher, index) => ({
          id: index + 1,
          ...teacher,
        }))
        setTeachers(teachersWithId) // Оновлюємо стан для вчителів
        setFilteredTeachers(teachersWithId) // Оновлюємо стан для відфільтрованих вчителів
      } else {
        console.error('Отримані дані не є масивом')
      }
    }
    fetchTeachers()
  }, []) // Порожній масив залежностей означає, що викликається один раз після першого рендеру

  // useEffect(() => {
  //   const applyFilters = () => {
  //     const filtered = teachers.filter((teacher) => {
  //       const matchesLanguage = filters.language
  //         ? teacher.languages.includes(filters.language)
  //         : true
  //       const matchesLevel = filters.level
  //         ? teacher.levels.includes(filters.level)
  //         : true
  //       const matchesPrice = filters.price
  //         ? teacher.price_per_hour <= parseInt(filters.price)
  //         : true

  //       return matchesLanguage && matchesLevel && matchesPrice
  //     })
  //     setFilteredTeachers(filtered)

  //     if (!isFirstRender && filtered.length === 0) {
  //       toast.error('Please select a higher price.', {
  //         className: 'toastError',
  //         duration: 2000,
  //       })
  //     }
  //   }

  //   applyFilters()
  // }, [teachers, filters, isFirstRender])

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

      if (!isFirstRender && filtered.length === 0 && !hasShownPriceMessage) {
        toast.error('Please select a higher price.', {
          className: 'toastError',
          duration: 2000,
        })
        setHasShownPriceMessage(true) // Оновлюємо стан, щоб повідомлення показалося тільки один раз
      }
    }

    applyFilters()
  }, [teachers, filters, isFirstRender, hasShownPriceMessage])

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
          top: 580,
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

  const handleToggleFavorite = (id) => {
    setFavorites((prevFavorites) =>
      prevFavorites.includes(id)
        ? prevFavorites.filter((favId) => favId !== id)
        : [...prevFavorites, id]
    )
  }

  const handleLogOut = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
    // localStorage.removeItem('favoriteCards') // Очищаємо список улюблених

    setFavorites([])
  }

  return (
    <div>
      <HomeHeader isLoggedIn={isLoggedIn} onLogOut={handleLogOut} />
      <Filters setFilters={setFilters} />

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
      {filteredTeachers.length === 0 ? (
        <p className={css.commentFilters}>
          No teachers match the selected filters.
        </p>
      ) : (
        <>
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
