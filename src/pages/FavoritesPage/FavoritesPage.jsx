import { useEffect, useState } from 'react'
import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
import { Link } from 'react-router-dom'

export function FavoritesPage() {
  // Створюємо стан для зберігання обраних (вибраних) викладачів
  const [favoriteCards, setFavoriteCards] = useState([])

  useEffect(() => {
    // Отримуємо дані обраних викладачів з localStorage при першому завантаженні сторінки
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setFavoriteCards(storedFavorites)
  }, [])

  // Функція для оновлення статусу обраного викладача
  const toggleFavorite = (cardId) => {
    // Зчитуємо обрані викладачі з localStorage
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCards')) || []

    // Створюємо новий масив, фільтруючи обрані викладачі
    const updatedFavorites = storedFavorites.filter(
      (card) => card.id !== cardId
    )

    // Оновлюємо localStorage новим списком обраних викладачів
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
    // Оновлюємо стан з новим списком обраних викладачів
    setFavoriteCards(updatedFavorites)
  }

  return (
    <div>
      <h2>Обрані викладачі</h2>
      <Link to="/">Go to main page</Link>

      <div>
        {favoriteCards.length > 0 ? (
          // Якщо є обрані викладачі, виводимо їх у вигляді карток
          favoriteCards.map((card) => (
            <TeacherCard
              key={card.id}
              {...card} // Передаємо всі властивості картки як пропси
              isFavorite={true} // Передаємо статус обраного як true
              onToggleFavorite={() => toggleFavorite(card.id)} // Передаємо функцію для зміни статусу обраного
            />
          ))
        ) : (
          // Якщо обраних викладачів немає, виводимо повідомлення
          <p>У вас поки немає обраних викладачів.</p>
        )}
      </div>
    </div>
  )
}

// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'

// export function FavoritesPage() {
//   const [favoriteCards, setFavoriteCards] = useState([])

//   useEffect(() => {
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     setFavoriteCards(storedFavorites)
//   }, [])

//   // Функция для обновления избранного
//   const toggleFavorite = (cardId) => {
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     const updatedFavorites = storedFavorites.some((card) => card.id === cardId)
//       ? storedFavorites.filter((card) => card.id !== cardId)
//       : [...storedFavorites, { id: cardId }]

//     localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
//     setFavoriteCards(updatedFavorites)
//   }

//   return (
//     <div>
//       <h2>Избранные преподаватели</h2>
//       <div>
//         {favoriteCards.length > 0 ? (
//           favoriteCards.map((card) => (
//             <TeacherCard
//               key={card.id}
//               {...card} // Передаем все свойства карточки как пропсы
//               isFavorite={true}
//               onToggleFavorite={() => toggleFavorite(card.id)}
//             />
//           ))
//         ) : (
//           <p>У вас пока нет избранных преподавателей.</p>
//         )}
//       </div>
//     </div>
//   )
// }

//=============================================================================
// // import css from './FavoritesPage.module.css'
// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'

// export function FavoritesPage() {
//   const [favoriteCards, setFavoriteCards] = useState([])

//   useEffect(() => {
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     setFavoriteCards(storedFavorites)
//   }, [])

//   // Функция для обновления избранного
//   const toggleFavorite = (cardId) => {
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     const updatedFavorites = storedFavorites.includes(cardId)
//       ? storedFavorites.filter((id) => id !== cardId) // Удалить из избранного
//       : [...storedFavorites, cardId] // Добавить в избранное

//     localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
//     setFavoriteCards(updatedFavorites) // Обновить состояние
//   }

//   return (
//     <div>
//       <h2>Избранные преподаватели</h2>
//       <div>
//         {favoriteCards.length > 0 ? (
//           favoriteCards.map((cardId) => (
//             <TeacherCard
//               key={cardId}
//               id={cardId}
//               isFavorite={true}
//               onToggleFavorite={() => toggleFavorite(cardId)}
//             />
//           ))
//         ) : (
//           <p>У вас пока нет избранных преподавателей.</p>
//         )}
//       </div>
//     </div>
//   )
// }
