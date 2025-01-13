// import { useEffect, useState } from 'react'
// import toast from 'react-hot-toast'
// import { useAuth } from '/src/AuthProvider'
// import {
//   getFavoriteCards,
//   addFavoriteCard,
//   removeFavoriteCard,
// } from '/src/data/firebase'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'

// export default function FavoriteCardsPage({
//   allCards,
//   loadingAllCards,
//   selectedLevel,
// }) {
//   const { user, loading } = useAuth()
//   const [favoriteIds, setFavoriteIds] = useState([])
//   const [favoritecards, setFavoriteCards] = useState([])
//   const [isLoadingFavoriteCards, setIsLoadingFavoriteCards] = useState(false)

//   useEffect(() => {
//     const fetchFavoriteCards = async () => {
//       if (loading || loadingAllCards || !user) {
//         setFavoriteIds([])
//         return
//       }

//       setIsLoadingFavoriteCards(true)
//       try {
//         const fetchedFavoriteIds = await getFavoriteCards(user.uid)
//         setFavoriteIds(fetchedFavoriteIds)
//       } catch (error) {
//         console.error('Error fetching favoritecards:', error)
//         toast.error('Failed to load favoritecards.')
//       } finally {
//         setIsLoadingFavoriteCards(false)
//       }
//     }

//     fetchFavoriteCards()
//   }, [user, loading, loadingAllCards])

//   useEffect(() => {
//     if (allCards && favoriteIds) {
//       setFavoriteCards(allCards.filter((card) => favoriteIds.includes(card.id)))
//     } else {
//       setFavoriteCards([])
//     }
//   }, [allCards, favoriteIds])

//   const handleToggleFavorite = async (cardId) => {
//     if (!user) return // Проверка авторизации уже есть выше

//     try {
//       if (favoriteIds.includes(cardId)) {
//         await removeFavoriteCard(user.uid, cardId)
//         setFavoriteIds((prevIds) => prevIds.filter((id) => id !== cardId)) // Обновляем состояние
//       } else {
//         await addFavoriteCard(user.uid, cardId)
//         setFavoriteIds((prevIds) => [...prevIds, cardId]) // Обновляем состояние
//       }
//     } catch (error) {
//       console.error('Error updating favoritecards:', error)
//       toast.error('Failed to update favoritecards.')
//     }
//   }

//   if (loading || loadingAllCards) return <div>Loading...</div>
//   if (isLoadingFavoriteCards) return <div>Loading favoritecards...</div>

//   return (
//     <div>
//       {favoritecards.length > 0 ? (
//         favoritecards.map((card) => (
//           <TeacherCard
//             key={card.id}
//             {...card}
//             isFavorite={favoriteIds.includes(card.id)}
//             onToggleFavorite={handleToggleFavorite}
//             selectedLevel={selectedLevel}
//           />
//         ))
//       ) : (
//         <p>No favoritecards yet.</p>
//       )}
//     </div>
//   )
// }

//============================  3 ====================================
// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
// import css from './FavoriteCardsPage.module.css'
// import toast from 'react-hot-toast'
// import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
// import { useAuth } from '/src/AuthProvider' // Правильний шлях до AuthContext
// import { getFavoriteCards } from '/src/data/firebase.js'

// export default function FavoriteCardsPage({
//   allCards,
//   loadingAllCards,
//   selectedLevel,
//   levels,
// }) {
//   const { user, loading } = useAuth() // Отримуємо user та loading з AuthContext
//   const [favoritecards, setFavoriteCards] = useState([])
//   const [isLoadingFavoriteCards, setIsLoadingFavoriteCards] = useState(false) // Стан завантаження обраних

//   useEffect(() => {
//     const fetchFavoriteCards = async () => {
//       if (loading || loadingAllCards || !user) {
//         setFavoriteIds([])

//         // Перевірка завантаження користувача та карток
//         return
//       }
//       setIsLoadingFavoriteCards(true)
//       try {
//         const fetchedFavoriteIds = await getFavoriteCards(user.uid)
//         setFavoriteIds(fetchedFavoriteIds)
//       } catch (error) {
//         console.error('Error fetching favoritecards:', error)
//         toast.error('Failed to load favoritecards. Please try again later.')
//       } finally {
//         setIsLoadingFavoriteCards(false)
//       }
//     }

//     fetchFavoriteCards()
//   }, [user, loading, loadingAllCards]) // Додаємо loading в залежності

//   useEffect(() => {
//     if (allCards && favoriteIds) {
//       const filteredCards = allCards.filter((card) =>
//         favoriteIds.includes(card.id)
//       )
//       setFavoriteCards(filteredCards)
//     } else {
//       setFavoriteCards([])
//     }
//   }, [allCards, favoriteIds])

// const handleToggleFavorite = async (cardId) => {
//   if (!user) return

//   try {
//     if (favoriteIds.includes(cardId)) {
//       await removeFavoriteCard(user.uid, cardId)
//       setFavoriteIds(favoriteIds.filter((id) => id !== cardId))
//     } else {
//       await addFavoriteCard(user.uid, cardId)
//       setFavoriteIds([...favoriteIds, cardId])
//     }
//   } catch (error) {
//     console.error('Error updating favoritecards:', error)
//     toast.error('Failed to update favoritecards. Please try again later.')
//   }
// }

//   if (loading || loadingAllCards) {
//     return <div>Loading...</div>
//   }

//   if (isLoadingFavoriteCards) {
//     return <div>Loading favoritecards...</div>
//   }

//   // if (loading || loadingAllCards) {
//   //   return <div>Loading...</div> // Індикатор завантаження для користувача та карток
//   // }

//   // if (isLoadingFavoriteCards) {
//   //   return <div>Loading favoritecards...</div> // Індикатор завантаження для обраних
//   // }

//   return (
//     <div className={css.favoritecardsPage}>
//       <HomeHeader />
//       <div>
//         {favoritecards.length > 0 ? (
//           favoritecards.map((card) => (
//             <TeacherCard
//               key={card.id}
//               {...card}
//               isFavorite={true}
//               selectedLevel={selectedLevel}
//             />
//           ))
//         ) : (
//           <p className={css.textMessage}>
//             You don&apos;t have any favorite teachers yet.
//           </p>
//         )}
//       </div>
//       {/* Рендеринг рівнів (якщо потрібно) */}
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

//=============================== 2 =================================================
import { useEffect, useState } from 'react'
import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
import css from './FavoriteCardsPage.module.css'
import toast from 'react-hot-toast'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import { getFavoriteCards } from '/src/data/firebase.js'
import { useAuth } from '/src/AuthProvider'
import Loader from '/src/components/Loader/Loader'
// import { handleToggleFavorite } from '/src/data/firebase.js'

export default function FavoriteCardsPage({ levels }) {
  const { user } = useAuth() // Отримуємо user з контексту

  const [favoriteCards, setFavoriteCards] = useState([])
  const [isFirstRender, setIsFirstRender] = useState(true)
  const selectedLevel = localStorage.getItem('selectedLevel') || ''
  const [isLoading, setIsLoading] = useState(true) // Стан для відображення Loader'а

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
          setIsLoading(false)
        }
      }
    }

    fetchFavoriteCards() // Викличте функцію після отримання user.uid
  }, [user])

  // useEffect(() => {
  //   // Отримуємо обраних викладачів з localStorage
  //   const storedFavoriteCards =
  //     JSON.parse(localStorage.getItem('favoriteCards')) || []
  //   setFavoriteCards(storedFavoriteCards)
  // }, [])

  useEffect(() => {
    // Після першого рендеру змінюємо isFirstRender на false
    if (isFirstRender) {
      setIsFirstRender(false)
    }
  }, [isFirstRender])

  // useEffect(() => {
  //   // Логіка для відображення повідомлення
  //   if (!isFirstRender && favoriteCards.length === 0) {
  //     setTimeout(() => {
  //       toast.error('Please select a card in Teachers.', {
  //         className: 'toastError',
  //         duration: 1500, // Продолжительность тостера
  //       })
  //     }, 1400) // Задержка 1000 миллисекунд
  //   }
  // }, [favoriteCards, isFirstRender])

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

//=========================================================================================
// import { useEffect, useState } from 'react'
// import { TeacherCard } from '/src/pages/TeachersPage/TeacherCard/TeacherCard'
// import css from './FavoriteCardsPage.module.css'
// import toast from 'react-hot-toast'
// import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
// import {
//   getFavoriteCards,
//   // addFavoriteCard,
//   removeFavoriteCard,
// } from '/src/data/firebase.js'

// export default function FavoriteCardsPage({ levels, localId }) {
//   const [favoritecards, setFavoriteCards] = useState([])
//   const [isFirstRender, setIsFirstRender] = useState(true)
//   const selectedLevel = localStorage.getItem('selectedLevel') || ''
//   console.log(localStorage.getItem('favoritecards'))

//   useEffect(() => {
//     // Завантаження обраних карток з Firebase
//     const fetchFavoriteCards = async () => {
//       if (localId) {
//         const favoritecards = await getFavoriteCards(localId)
//         setFavoriteCards(favoritecards)
//       }
//     }
//     fetchFavoriteCards()
//   }, [localId])

//   useEffect(() => {
//     if (!isFirstRender && favoritecards.length === 0) {
//       toast.error('Please select a card in Teachers.', {
//         className: 'toastError',
//         duration: 1500,
//       })
//     }
//   }, [favoritecards, isFirstRender])

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
//     <div className={css.favoritecardsPage}>
//       <HomeHeader />

//       <div>
//         {favoritecards.length > 0 ? (
//           favoritecards.map((card) => (
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
