// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
// import css from './FavoritesPage.module.css'
// import toast from 'react-hot-toast'
// import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
// import {
//   getFavoriteCards,
//   // addFavoriteCard,
//   removeFavoriteCard,
// } from '/src/data/firebase.js'

// export default function FavoritesPage({ levels, localId }) {
//   const [favoriteCards, setFavoriteCards] = useState([])
//   const [isFirstRender, setIsFirstRender] = useState(true)
//   const selectedLevel = localStorage.getItem('selectedLevel') || ''
//   console.log(localStorage.getItem('favoriteCards'))

//   useEffect(() => {
//     // Завантаження обраних карток з Firebase
//     const fetchFavorites = async () => {
//       if (localId) {
//         const favorites = await getFavoriteCards(localId)
//         setFavoriteCards(favorites)
//       }
//     }
//     fetchFavorites()
//   }, [localId])

//   useEffect(() => {
//     if (!isFirstRender && favoriteCards.length === 0) {
//       toast.error('Please select a card in Teachers.', {
//         className: 'toastError',
//         duration: 1500,
//       })
//     }
//   }, [favoriteCards, isFirstRender])

//   useEffect(() => {
//     setIsFirstRender(false)
//   }, [])

//   // Функція для видалення викладача з обраного
//   const toggleFavorite = async (cardId) => {
//     try {
//       await removeFavoriteCard(localId, cardId)
//       setFavoriteCards((prev) => prev.filter((card) => card.id !== cardId))
//     } catch (error) {
//       console.error('Error removing favorite card:', error)
//     }
//   }

//   return (
//     <div className={css.favoritesPage}>
//       <HomeHeader />

//       <div>
//         {favoriteCards.length > 0 ? (
//           favoriteCards.map((card) => (
//             <TeacherCard
//               key={card.id}
//               {...card}
//               isFavorite={true}
//               selectedLevel={selectedLevel}
//               onToggleFavorite={() => toggleFavorite(card.id)}
//             />
//           ))
//         ) : (
//           <p className={css.textMessage}>
//             You don&apos;t have any favorite teachers yet.
//           </p>
//         )}
//       </div>

//       {(levels || []).map((level, index) => (
//         <p
//           key={index}
//           className={level === selectedLevel ? css.selectedLevel : ''}
//         >
//           {level}
//         </p>
//       ))}
//     </div>
//   )
// }

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
      setTimeout(() => {
        toast.error('Please select a card in Teachers.', {
          className: 'toastError',
          duration: 1500, // Продолжительность тостера
        })
      }, 1400) // Задержка 1000 миллисекунд
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
