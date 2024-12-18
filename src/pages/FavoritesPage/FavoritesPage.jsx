import { useEffect, useState } from 'react'
import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
import css from './FavoritesPage.module.css'
import toast from 'react-hot-toast'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'

export default function FavoritesPage({ levels }) {
  const [favoriteCards, setFavoriteCards] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const selectedLevel = localStorage.getItem('selectedLevel') || ''

  useEffect(() => {
    // Отримуємо обраних викладачів з localStorage
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setFavoriteCards(storedFavorites)
  }, [])

  useEffect(() => {
    // Логіка для відображення повідомлення
    if (!isFirstRender && favoriteCards.length === 0) {
      toast.error('Please select a card.', {
        className: css.toastError,
        duration: 2000,
      })
    }
  }, [favoriteCards, isFirstRender])

  useEffect(() => {
    // Після першого рендеру змінюємо isFirstRender на false
    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  // Функція для видалення викладача з обраного
  const toggleFavorite = (cardId) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== cardId)

    // Оновлення localStorage
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
    setFavoriteCards(updatedFavorites)
  }

  return (
    <div className={css.favoritesPage}>
      <HomeHeader />

      <div>
        {favoriteCards.length > 0 ? (
          favoriteCards.map((card) => (
            <TeacherCard
              key={card.id}
              {...card} // Передаємо всі властивості картки як пропси
              isFavorite={true} // Вказуємо, що картка в обраному
              selectedLevel={selectedLevel}
              onToggleFavorite={() => toggleFavorite(card.id)} // Видалення з обраного
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
