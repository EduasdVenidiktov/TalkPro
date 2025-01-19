import { useEffect, useState } from 'react'
import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
import css from './FavoriteCardsPage.module.css'
import toast from 'react-hot-toast'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import { getFavoriteCards } from '/src/data/firebase.js'
import { useAuth } from '/src/AuthProvider'
import Loader from '/src/components/Loader/Loader'
import { useNavigate } from 'react-router-dom'

export default function FavoriteCardsPage({ levels }) {
  const { user } = useAuth() // Отримуємо user з контексту

  const [favoriteCards, setFavoriteCards] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const selectedLevel = localStorage.getItem('selectedLevel') || ''
  const [isLoading, setIsLoading] = useState(true) // Стан для відображення Loader'а
  const navigate = useNavigate() // Ініціалізуємо useNavigate

  useEffect(() => {
    const fetchFavoriteCards = async () => {
      setIsLoading(true)
      if (user) {
        try {
          const favoriteCardsData = await getFavoriteCards(user.uid)

          setFavoriteCards(favoriteCardsData) // Або фільтруйте дані з TeacherCard за цими id
        } catch (error) {
          console.error('Error fetching favorite cards:', error)
          toast.error('Failed to load favoritecards. Please try again later.', {
            className: 'toastError',
            duration: 1500,
          })
        } finally {
          setIsLoading(false) // Вимикаємо Loader
        }
      } else {
        // Якщо user відсутній, очищаємо стан і вимикаємо Loader
        setFavoriteCards([])
        setIsLoading(false)
        navigate('/teachers') // Перенаправляємо на TeacherPage
      }
    }

    fetchFavoriteCards() // Викликаємо функцію при зміні user
  }, [user, navigate])
  useEffect(() => {
    // Після першого рендеру змінюємо isFirstRender на false
    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  return (
    <div className={css.favoritecardsPage}>
      <HomeHeader />
      <div>
        {isLoading ? (
          <div className={css.loaderContainer}>
            <Loader />
          </div>
        ) : favoriteCards.length > 0 ? (
          favoriteCards.map((card) => (
            <TeacherCard
              key={card.id} // Уникальный ключ для каждого элемента
              {...card}
              isFavorite={true}
              selectedLevel={selectedLevel}
              onToggleFavorite={(updatedCard) => {
                setFavoriteCards((prevCards) =>
                  prevCards.filter((c) => c.id !== updatedCard.id)
                )
              }}
            />
          ))
        ) : (
          <p className={css.textMessage}>
            You don&apos;t have any favorite teachers yet.
          </p>
        )}
      </div>
      {(levels || []).map((level, index) => (
        <p
          key={index}
          className={level === selectedLevel ? css.selectedLevel : ''}
        >
          {level}
        </p>
      ))}
    </div>
  )
}
