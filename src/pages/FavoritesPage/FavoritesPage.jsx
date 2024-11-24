import { useEffect, useState } from 'react'
import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
import { Link } from 'react-router-dom'

export default function FavoritesPage() {
  const [favoriteCards, setFavoriteCards] = useState([])

  useEffect(() => {
    // Отримуємо обраних викладачів з localStorage
    const storedFavorites =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setFavoriteCards(storedFavorites)
  }, [])

  // Функція для видалення викладача з обраного
  const toggleFavorite = (cardId) => {
    const updatedFavorites = favoriteCards.filter((card) => card.id !== cardId)

    // Оновлення localStorage
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
    setFavoriteCards(updatedFavorites)
  }

  return (
    <div>
      <h2>Обрані викладачі</h2>
      <Link to="/">Go to main page</Link>

      <div>
        {favoriteCards.length > 0 ? (
          favoriteCards.map((card) => (
            <TeacherCard
              key={card.id}
              {...card} // Передаємо всі властивості картки як пропси
              isFavorite={true} // Вказуємо, що картка в обраному
              onToggleFavorite={() => toggleFavorite(card.id)} // Видалення з обраного
            />
          ))
        ) : (
          <p>У вас поки немає обраних викладачів.</p>
        )}
      </div>
    </div>
  )
}

// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
// import { Link } from 'react-router-dom'

// export default function FavoritesPage() {
//   // Створюємо стан для зберігання обраних (вибраних) викладачів
//   const [favoriteCards, setFavoriteCards] = useState([])
//   const [selectedLevel, setSelectedLevel] = useState('') // Стан для рівня знання мови

//   useEffect(() => {
//     // Отримуємо дані обраних викладачів з localStorage при першому завантаженні сторінки
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     setFavoriteCards(storedFavorites)

//     // Отримуємо рівень знання мови з localStorage (або іншого джерела)
//     const storedSelectedLevel =
//       localStorage.getItem('selectedLevel') || 'Beginner'
//     setSelectedLevel(storedSelectedLevel)
//   }, [])

//   // Функція для оновлення статусу обраного викладача
//   const toggleFavorite = (cardId) => {
//     // Зчитуємо обрані викладачі з localStorage
//     const storedFavorites =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []

//     // Створюємо новий масив, фільтруючи обрані викладачі
//     const updatedFavorites = storedFavorites.filter(
//       (card) => card.id !== cardId
//     )

//     // Оновлюємо localStorage новим списком обраних викладачів
//     localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
//     // Оновлюємо стан з новим списком обраних викладачів
//     setFavoriteCards(updatedFavorites)
//   }

//   return (
//     <div>
//       <h2>Обрані викладачі</h2>
//       <Link to="/">Go to main page</Link>

//       <div>
//         {favoriteCards.length > 0 ? (
//           // Якщо є обрані викладачі, виводимо їх у вигляді карток
//           favoriteCards.map((card) => (
//             <TeacherCard
//               key={card.id}
//               {...card} // Передаємо всі властивості картки як пропси
//               isFavorite={true} // Передаємо статус обраного як true
//               selectedLevel={selectedLevel} // Передаємо рівень знання мови як пропс
//               onToggleFavorite={() => toggleFavorite(card.id)} // Передаємо функцію для зміни статусу обраного
//             />
//           ))
//         ) : (
//           // Якщо обраних викладачів немає, виводимо повідомлення
//           <p>У вас поки немає обраних викладачів.</p>
//         )}
//       </div>
//     </div>
//   )
// }
