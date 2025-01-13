import { useState, useEffect } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'
import greenLable from '/src/assets/icons/sprite.svg'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { TeacherDetail } from '../TeacherDetail/TeacherDetail'
import { HeartModal } from '/src/components/Modal/HeartModal/HeartModal'
import toast from 'react-hot-toast'
import { useAuth } from '/src/AuthProvider'
import {
  getFavoriteCards,
  handleToggleFavorite,
  // addFavoriteCard,
  // removeFavoriteCard,
} from '/src/data/firebase.js'
// import { getTeachersData } from '/src/data/firebase.js'

export function TeacherCard({
  id,
  name,
  surname,
  languages = [],
  levels = [],
  rating,
  price_per_hour,
  avatar_url,
  lessons_done,
  lesson_info,
  conditions,
  experience,
  reviews = [],
  selectedLevel,
}) {
  const [showMore, setShowMore] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, loading } = useAuth() // Отримуємо user та loading з контексту

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (loading) return // Важливо! Захист від помилок під час завантаження
      if (user) {
        try {
          const favoriteCards = await getFavoriteCards(user.uid)
          // setIsFavorite(favoriteCards.includes(id))
          setIsFavorite(favoriteCards.some((card) => card.id === id))
        } catch (error) {
          console.error('Error fetching favorites:', error)
          toast.error('Failed to load favorites. Please try again later.', {
            className: 'toastError',
            duration: 1500,
          }) // Повідомлення про помилку
        }
      } else {
        setIsFavorite(false)
      }
    }
    checkFavoriteStatus()
  }, [user, id, loading])

  const handleHeartClick = async () => {
    if (!user) {
      setShowModal(true)
    } else {
      try {
        await handleToggleFavorite(user.uid, {
          id,
          name,
          surname,
          languages,
          levels,
          rating,
          price_per_hour,
          avatar_url,
        })
        setIsFavorite((prev) => !prev)
      } catch (error) {
        console.error('Error processing:', error)
      }
    }
  }

  const handleReadMore = () => setShowMore((prev) => !prev)

  if (loading) {
    return <div>Loading...</div> // Або інший індикатор завантаження
  }

  return (
    <div className={css.teacherCard}>
      <div className={css.teacherImageBox}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.teacherImage}
        />
        <svg className={css.teacherLable} aria-label="green label">
          <use href={`${greenLable}#greenLable`} />
        </svg>
      </div>
      <div className={css.teacherContent}>
        <div className={css.teacherHeader}>
          <p className={css.contentItem}>Languages</p>
          <div className={css.teacherHeaderList}>
            <svg className={css.teacherIcon} aria-label="open book">
              <use href={`${bookOpen}#bookOpen`} />
            </svg>
            <p className={css.teacherContent}>Lessons online</p>
            <span className={css.divider}></span>
            <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
            <span className={css.divider}></span>
            <svg className={css.teacherIcon} aria-label="star">
              <use href={`${star}#star`} />
            </svg>
            <p className={css.teacherContent}>Rating: {rating}</p>
            <span className={css.divider}></span>
            <p className={css.teacherContent}>
              Price/1 hour:{' '}
              <span className={css.priceValue}>{price_per_hour}$</span>
            </p>
          </div>
          <p
            className={css.btnHeart}
            onClick={handleHeartClick} // Передаем функцию как обработчик
          >
            {/* {isFavorite ? 'Remove from Favorites' : 'Add to Favorites'} */}

            {user && isFavorite ? (
              <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
            ) : (
              <FiHeart className={css.heartIcon} />
            )}
          </p>
          <HeartModal isOpen={showModal} onClose={() => setShowModal(false)} />
        </div>
        <div className={css.teacherInfo}>
          <h2 className={css.titleTeachers}>
            {name} {surname}
          </h2>
          <ul className={css.contentList}>
            <li className={css.contentItem}>
              Speaks:{' '}
              <span className={css.teacherContent}>{languages.join(', ')}</span>
            </li>
            <li className={css.contentItem}>
              Lesson info:{' '}
              <span className={css.teacherContent}>{lesson_info}</span>
            </li>
            <li className={css.contentItem}>
              Conditions:{' '}
              <span className={css.teacherContent}>{conditions}</span>
            </li>
          </ul>
          <p
            onClick={showMore ? () => setShowMore(false) : handleReadMore}
            className={css.linkShowSearch}
          >
            {showMore ? 'Hide' : 'Read more'}
          </p>

          {showMore && (
            <TeacherDetail
              description={lesson_info}
              avatar_url={avatar_url}
              name={name}
              surname={surname}
              name_review={name}
              rating={rating}
              reviews={reviews}
              experience={experience}
              levels={levels}
              selectedLevel={selectedLevel}
            />
          )}
        </div>
        {!showMore && (
          <div className={css.levelList}>
            {levels.map((level, index) => (
              <p
                key={index}
                className={`${css.levelsItem} ${
                  level === selectedLevel ? css.selectedLevel : ''
                }`}
              >
                #{level}
              </p>
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

// import { useState } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import greenLable from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { TeacherDetail } from '../TeacherDetail/TeacherDetail'
// import { HeartModal } from '/src/components/Modal/HeartModal/HeartModal'
// import toast from 'react-hot-toast'
// import { useAuth } from '/src/AuthProvider'

// export function TeacherCard({
//   id,
//   name,
//   surname,
//   languages = [],
//   levels = [],
//   rating,
//   price_per_hour,
//   avatar_url,
//   lessons_done,
//   lesson_info,
//   conditions,
//   experience,
//   reviews = [],
//   onToggleFavorite,
//   selectedLevel,
//   isFavorite,
//   // isNewUser,
// }) {
//   const [showMore, setShowMore] = useState(false)
//   // const [isFavorite, setIsFavorite] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const isLoggedIn = !!localStorage.getItem('userToken')
//   // const navigate = useNavigate()
//   const { user, loading } = useAuth()

//   // Обработка клика на сердце
//   const handleHeartClick = async () => {
//     if (loading) return
//     if (!user) {
//       setShowModal(true) // Открываем модалку, если не залогинен
//       return
//     }

//     try {
//       await onToggleFavorite(id) // Вызываем функцию из FavoritesPage
//       toast(isFavorite ? 'Removed from favorites!' : 'Added to favorites!')
//     } catch (error) {
//       console.error('Error updating favorites:', error)
//       toast.error('Failed to update favorites.')
//     }
//   }

//   // Добавление и обновление избранных данных
//   const handleReadMore = () => setShowMore((prev) => !prev)

//   return (
//     <div className={css.teacherCard}>
//       <div className={css.teacherImageBox}>
//         <img
//           src={avatar_url}
//           alt={`${name} ${surname}`}
//           className={css.teacherImage}
//         />
//         <svg className={css.teacherLable} aria-label="green label">
//           <use href={`${greenLable}#greenLable`} />
//         </svg>
//       </div>
//       <div className={css.teacherContent}>
//         <div className={css.teacherHeader}>
//           <p className={css.contentItem}>Languages</p>
//           <div className={css.teacherHeaderList}>
//             <svg className={css.teacherIcon} aria-label="open book">
//               <use href={`${bookOpen}#bookOpen`} />
//             </svg>
//             <p className={css.teacherContent}>Lessons online</p>
//             <span className={css.divider}></span>
//             <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
//             <span className={css.divider}></span>
//             <svg className={css.teacherIcon} aria-label="star">
//               <use href={`${star}#star`} />
//             </svg>
//             <p className={css.teacherContent}>Rating: {rating}</p>
//             <span className={css.divider}></span>
//             <p className={css.teacherContent}>
//               Price/1 hour:{' '}
//               <span className={css.priceValue}>{price_per_hour}$</span>
//             </p>
//           </div>
//           <p className={css.btnHeart} onClick={handleHeartClick}>
//             {/* {isFavorite && isLoggedIn && isNewUser ? ( */}
//             {isFavorite && isLoggedIn ? (
//               <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
//             ) : (
//               <FiHeart className={css.heartIcon} />
//             )}
//           </p>
//           <HeartModal isOpen={showModal} onClose={() => setShowModal(false)} />
//         </div>
//         <div className={css.teacherInfo}>
//           <h2 className={css.titleTeachers}>
//             {name} {surname}
//           </h2>
//           <ul className={css.contentList}>
//             <li className={css.contentItem}>
//               Speaks:{' '}
//               <span className={css.teacherContent}>{languages.join(', ')}</span>
//             </li>
//             <li className={css.contentItem}>
//               Lesson info:{' '}
//               <span className={css.teacherContent}>{lesson_info}</span>
//             </li>
//             <li className={css.contentItem}>
//               Conditions:{' '}
//               <span className={css.teacherContent}>{conditions}</span>
//             </li>
//           </ul>
//           <p
//             onClick={showMore ? () => setShowMore(false) : handleReadMore}
//             className={css.linkShowSearch}
//           >
//             {showMore ? 'Hide' : 'Read more'}
//           </p>

//           {showMore && (
//             <TeacherDetail
//               description={lesson_info}
//               avatar_url={avatar_url}
//               name={name}
//               surname={surname}
//               name_review={name}
//               rating={rating}
//               reviews={reviews}
//               experience={experience}
//               levels={levels}
//               selectedLevel={selectedLevel}
//             />
//           )}
//         </div>
//         {!showMore && (
//           <div className={css.levelList}>
//             {levels.map((level, index) => (
//               <p
//                 key={index}
//                 className={`${css.levelsItem} ${
//                   level === selectedLevel ? css.selectedLevel : ''
//                 }`}
//               >
//                 #{level}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }

//====================== =======================================
// import { useState, useEffect } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import greenLable from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { TeacherDetail } from '../TeacherDetail/TeacherDetail'
// import { HeartModal } from '/src/components/Modal/HeartModal/HeartModal'
// import toast from 'react-hot-toast'
// import { useNavigate } from 'react-router-dom'

// // Функция для обновления localStorage
// function updateLocalStorage(id, isAdding, teacherData) {
//   const favoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || []

//   if (isAdding) {
//     // Добавляем учителя в избранное, если его там нет
//     const isAlreadyFavorite = favoriteCards.some((card) => card.id === id)
//     if (!isAlreadyFavorite) {
//       favoriteCards.push(teacherData)
//     }
//   } else {
//     // Удаляем учителя из избранного
//     const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
//     localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
//     return updatedFavorites
//   }

//   // Сохраняем изменения в localStorage
//   localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
//   return favoriteCards
// }

// export function TeacherCard({
//   id,
//   name,
//   surname,
//   languages = [],
//   levels = [],
//   rating,
//   price_per_hour,
//   avatar_url,
//   lessons_done,
//   lesson_info,
//   conditions,
//   experience,
//   reviews = [],
//   onToggleFavorite,
//   selectedLevel,
//   // isNewUser,
// }) {
//   const [showMore, setShowMore] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [showModal, setShowModal] = useState(false)
//   const isLoggedIn = !!localStorage.getItem('userToken')
//   const navigate = useNavigate()

//   // Загружаем данные избранных карточек из localStorage при рендере

//   useEffect(() => {
//     // if (isLoggedIn && !isNewUser) {
//     if (isLoggedIn) {
//       const favoriteCards =
//         JSON.parse(localStorage.getItem('favoriteCards')) || []
//       setIsFavorite(favoriteCards.some((card) => card.id === id))
//     } else {
//       // При виході з системи скидаємо стан isFavorite
//       setIsFavorite(false)
//     }
//     // }, [id, isLoggedIn, isNewUser])
//   }, [id, isLoggedIn])

//   // Обработка клика на сердце
//   const handleHeartClick = () => {
//     const isLoggedIn = !!localStorage.getItem('userToken')

//     if (!isLoggedIn) {
//       setShowModal(true)
//       toast.error('Please log in to add to favorites!', {
//         className: 'toastError',
//         duration: 1500,
//       })
//       navigate('/favorite')
//       return
//     }

//     const updatedStatus = !isFavorite
//     setIsFavorite(updatedStatus)

//     const teacherData = {
//       id,
//       name,
//       surname,
//       languages,
//       levels,
//       rating,
//       price_per_hour,
//       avatar_url,
//       lessons_done,
//       lesson_info,
//       conditions,
//       experience,
//       reviews,
//     }

//     updateLocalStorage(id, updatedStatus, teacherData)

//     if (updatedStatus) {
//       toast.success('Added to favorites!', {
//         className: 'toastSuccess',
//         duration: 1000,
//       })
//     } else {
//       toast.error('Removed from favorites!', {
//         className: 'toastError',
//         duration: 1000,
//       })
//     }

//     if (onToggleFavorite) {
//       onToggleFavorite(id)
//     }
//   }

//   // Добавление и обновление избранных данных
//   const handleReadMore = () => setShowMore((prev) => !prev)

//   return (
//     <div className={css.teacherCard}>
//       <div className={css.teacherImageBox}>
//         <img
//           src={avatar_url}
//           alt={`${name} ${surname}`}
//           className={css.teacherImage}
//         />
//         <svg className={css.teacherLable} aria-label="green label">
//           <use href={`${greenLable}#greenLable`} />
//         </svg>
//       </div>
//       <div className={css.teacherContent}>
//         <div className={css.teacherHeader}>
//           <p className={css.contentItem}>Languages</p>
//           <div className={css.teacherHeaderList}>
//             <svg className={css.teacherIcon} aria-label="open book">
//               <use href={`${bookOpen}#bookOpen`} />
//             </svg>
//             <p className={css.teacherContent}>Lessons online</p>
//             <span className={css.divider}></span>
//             <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
//             <span className={css.divider}></span>
//             <svg className={css.teacherIcon} aria-label="star">
//               <use href={`${star}#star`} />
//             </svg>
//             <p className={css.teacherContent}>Rating: {rating}</p>
//             <span className={css.divider}></span>
//             <p className={css.teacherContent}>
//               Price/1 hour:{' '}
//               <span className={css.priceValue}>{price_per_hour}$</span>
//             </p>
//           </div>
//           <p className={css.btnHeart} onClick={handleHeartClick}>
//             {/* {isFavorite && isLoggedIn && isNewUser ? ( */}
//             {isFavorite && isLoggedIn ? (
//               <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
//             ) : (
//               <FiHeart className={css.heartIcon} />
//             )}
//           </p>
//           <HeartModal isOpen={showModal} onClose={() => setShowModal(false)} />
//         </div>
//         <div className={css.teacherInfo}>
//           <h2 className={css.titleTeachers}>
//             {name} {surname}
//           </h2>
//           <ul className={css.contentList}>
//             <li className={css.contentItem}>
//               Speaks:{' '}
//               <span className={css.teacherContent}>{languages.join(', ')}</span>
//             </li>
//             <li className={css.contentItem}>
//               Lesson info:{' '}
//               <span className={css.teacherContent}>{lesson_info}</span>
//             </li>
//             <li className={css.contentItem}>
//               Conditions:{' '}
//               <span className={css.teacherContent}>{conditions}</span>
//             </li>
//           </ul>
//           <p
//             onClick={showMore ? () => setShowMore(false) : handleReadMore}
//             className={css.linkShowSearch}
//           >
//             {showMore ? 'Hide' : 'Read more'}
//           </p>

//           {showMore && (
//             <TeacherDetail
//               description={lesson_info}
//               avatar_url={avatar_url}
//               name={name}
//               surname={surname}
//               name_review={name}
//               rating={rating}
//               reviews={reviews}
//               experience={experience}
//               levels={levels}
//               selectedLevel={selectedLevel}
//             />
//           )}
//         </div>
//         {!showMore && (
//           <div className={css.levelList}>
//             {levels.map((level, index) => (
//               <p
//                 key={index}
//                 className={`${css.levelsItem} ${
//                   level === selectedLevel ? css.selectedLevel : ''
//                 }`}
//               >
//                 #{level}
//               </p>
//             ))}
//           </div>
//         )}
//       </div>
//     </div>
//   )
// }
