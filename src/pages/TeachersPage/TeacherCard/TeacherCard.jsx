// import { useState, useEffect } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import greenLable from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { TeacherDetail } from '../TeacherDetail/TeacherDetail'

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
// }) {
//   const [showMore, setShowMore] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)
//   const [storedLevel, setStoredLevel] = useState(selectedLevel || levels[0])

//   useEffect(() => {
//     // Получаем сохраненные данные из localStorage для текущей карточки
//     const cardState =
//       JSON.parse(localStorage.getItem(`teacherCard-${id}`)) || {}
//     console.log('Restored cardState:', cardState)

//     // Восстанавливаем выбранный уровень для текущей карточки
//     if (cardState.storedLevel) {
//       setStoredLevel(cardState.storedLevel)
//     } else if (levels && levels.length > 0) {
//       // Устанавливаем уровень по умолчанию, если нет сохраненного значения
//       setStoredLevel(selectedLevel || levels[0])
//     }
//   }, [id, levels, selectedLevel]) // Срабатывает при изменении id, levels или selectedLevel

//   const handleLevelClick = (level) => {
//     console.log('Selected level:', level)

//     setStoredLevel(level)

//     const cardState = {
//       showMore,
//       storedLevel: level,
//     }
//     localStorage.setItem(`teacherCard-${id}`, JSON.stringify(cardState))
//   }

//   const handleHeartClick = () => {
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

//     // Уведомляем родительский компонент об изменении избранного
//     if (onToggleFavorite) {
//       onToggleFavorite(id)
//     }
//   }

//   const handleReadMore = () => {
//     const newShowMore = !showMore
//     setShowMore(newShowMore)

//     // Сохраняем состояние в localStorage
//     const cardState = {
//       showMore: newShowMore,
//       storedLevel,
//     }
//     localStorage.setItem(`teacherCard-${id}`, JSON.stringify(cardState))
//   }

//   // const handleLevelClick = (level) => {
//   //   console.log('Selected level:', level)

//   //   setStoredLevel(level)

//   //   // Сохраняем состояние в localStorage
//   //   const cardState = {
//   //     showMore,
//   //     storedLevel: level,
//   //   }
//   //   localStorage.setItem(`teacherCard-${id}`, JSON.stringify(cardState))
//   // }

//   return (
//     <div className={css.teacherSection}>
//       <div className={css.teacherCard}>
//         <div className={css.teacherImageBox}>
//           <img
//             src={avatar_url}
//             alt={`${name} ${surname}`}
//             className={css.teacherImage}
//           />
//           <svg className={css.teacherLable} aria-label="green label">
//             <use href={`${greenLable}#greenLable`} />
//           </svg>
//         </div>
//         <div className={css.teacherContent}>
//           <div className={css.teacherHeader}>
//             <p className={css.contentItem}>Languages</p>
//             <div className={css.teacherHeaderList}>
//               <svg className={css.teacherIcon} aria-label="open book">
//                 <use href={`${bookOpen}#bookOpen`} />
//               </svg>
//               <p className={css.teacherContent}>Lessons online</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
//               <span className={css.divider}></span>
//               <svg className={css.teacherIcon} aria-label="star">
//                 <use href={`${star}#star`} />
//               </svg>
//               <p className={css.teacherContent}>Rating: {rating}</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>
//                 Price/1 hour:{' '}
//                 <span className={css.priceValue}>{price_per_hour}$</span>
//               </p>
//             </div>
//             <p className={css.btnHeart} onClick={handleHeartClick}>
//               {isFavorite ? (
//                 <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
//               ) : (
//                 <FiHeart className={css.heartIcon} />
//               )}
//             </p>
//           </div>
//           <div className={css.teacherInfo}>
//             <h2 className={css.titleTeachers}>
//               {name} {surname}
//             </h2>
//             <ul className={css.contentList}>
//               <li className={css.contentItem}>
//                 Speaks:{' '}
//                 <span className={css.teacherContent}>
//                   {languages.join(', ')}
//                 </span>
//               </li>
//               <li className={css.contentItem}>
//                 Lesson info:{' '}
//                 <span className={css.teacherContent}>{lesson_info}</span>
//               </li>
//               <li className={css.contentItem}>
//                 Conditions:{' '}
//                 <span className={css.teacherContent}>{conditions}</span>
//               </li>
//             </ul>
//             <p
//               onClick={showMore ? () => setShowMore(false) : handleReadMore}
//               className={css.linkShowSearch}
//             >
//               {showMore ? 'Hide' : 'Read more'}
//             </p>

//             {showMore && (
//               <TeacherDetail
//                 description={lesson_info}
//                 avatar={avatar_url}
//                 name_review={name}
//                 rating={rating}
//                 reviews={reviews}
//                 experience={experience}
//                 levels={levels}
//                 selectedLevel={storedLevel}
//               />
//             )}
//           </div>
//           {!showMore && (
//             <div className={css.levelList}>
//               {levels.map((level, index) => (
//                 <p
//                   key={index}
//                   className={`${css.levelsItem} ${
//                     level === storedLevel ? css.selectedLevel : ''
//                   }`}
//                   onClick={() => handleLevelClick(level)}
//                 >
//                   {level}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState, useEffect } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'
import greenLable from '/src/assets/icons/sprite.svg'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { TeacherDetail } from '../TeacherDetail/TeacherDetail'

// Функция для обновления localStorage
function updateLocalStorage(id, isAdding, teacherData) {
  const favoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || []

  if (isAdding) {
    // Добавляем учителя в избранное, если его там нет
    const isAlreadyFavorite = favoriteCards.some((card) => card.id === id)
    if (!isAlreadyFavorite) {
      favoriteCards.push(teacherData)
    }
  } else {
    // Удаляем учителя из избранного
    const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
    localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
    return updatedFavorites
  }

  // Сохраняем изменения в localStorage
  localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
  return favoriteCards
}

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
  onToggleFavorite,
  selectedLevel,
}) {
  const [showMore, setShowMore] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  useEffect(() => {
    const favoriteCards =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setIsFavorite(favoriteCards.some((card) => card.id === id))
  }, [id])

  const handleHeartClick = () => {
    // const isLoggedIn = !!localStorage.getItem('idToken')
    // console.log('authToken in localStorage:', localStorage.getItem('authToken'))

    // if (!isLoggedIn) {
    //   alert('Этот функционал доступен только для авторизованных пользователей')
    //   return
    // }

    const updatedStatus = !isFavorite
    setIsFavorite(updatedStatus)

    const teacherData = {
      id,
      name,
      surname,
      languages,
      levels,
      rating,
      price_per_hour,
      avatar_url,
      lessons_done,
      lesson_info,
      conditions,
      experience,
      reviews,
    }

    updateLocalStorage(id, updatedStatus, teacherData)

    // Уведомляем родительский компонент об изменении избранного
    if (onToggleFavorite) {
      onToggleFavorite(id)
    }
  }

  const handleReadMore = () => setShowMore((prev) => !prev)

  return (
    <div className={css.teacherSection}>
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
            <p className={css.btnHeart} onClick={handleHeartClick}>
              {isFavorite ? (
                <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
              ) : (
                <FiHeart className={css.heartIcon} />
              )}
            </p>
          </div>
          <div className={css.teacherInfo}>
            <h2 className={css.titleTeachers}>
              {name} {surname}
            </h2>
            <ul className={css.contentList}>
              <li className={css.contentItem}>
                Speaks:{' '}
                <span className={css.teacherContent}>
                  {languages.join(', ')}
                </span>
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
                  {level}
                </p>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  )
}

// import { useState, useEffect } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import greenLable from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { TeacherDetail } from '../TeacherDetail/TeacherDetail'

// function updateLocalStorage(id, isAdding, teacherData) {
//   const favoriteCards = JSON.parse(localStorage.getItem('favoriteCards')) || []

//   if (isAdding) {
//     const isAlreadyFavorite = favoriteCards.some((card) => card.id === id)
//     if (!isAlreadyFavorite) {
//       favoriteCards.push(teacherData)
//     }
//   } else {
//     const updatedFavorites = favoriteCards.filter((card) => card.id !== id)
//     localStorage.setItem('favoriteCards', JSON.stringify(updatedFavorites))
//     return updatedFavorites
//   }

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
// }) {
//   const [showMore, setShowMore] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)

//   useEffect(() => {
//     const favoriteCards =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     setIsFavorite(favoriteCards.some((card) => card.id === id))
//   }, [id])

//   const handleHeartClick = () => {
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

//     if (onToggleFavorite) {
//       onToggleFavorite(id) // Обновляємо батьківський компонент
//     }
//   }

//   const handleReadMore = () => setShowMore((prev) => !prev)

//   return (
//     <div className={css.teacherSection}>
//       <div className={css.teacherCard}>
//         <div className={css.teacherImageBox}>
//           <img
//             src={avatar_url}
//             alt={`${name} ${surname}`}
//             className={css.teacherImage}
//           />
//           <svg className={css.teacherLable} aria-label="green label">
//             <use href={`${greenLable}#greenLable`} />
//           </svg>
//         </div>
//         <div className={css.teacherContent}>
//           <div className={css.teacherHeader}>
//             <p className={css.contentItem}>Languages</p>
//             <div className={css.teacherHeaderList}>
//               <svg className={css.teacherIcon} aria-label="open book">
//                 <use href={`${bookOpen}#bookOpen`} />
//               </svg>
//               <p className={css.teacherContent}>Lessons online</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
//               <span className={css.divider}></span>
//               <svg className={css.teacherIcon} aria-label="star">
//                 <use href={`${star}#star`} />
//               </svg>
//               <p className={css.teacherContent}>Rating: {rating}</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>
//                 Price/1 hour:{' '}
//                 <span className={css.priceValue}>{price_per_hour}$</span>
//               </p>
//             </div>
//             <p className={css.btnHeart} onClick={handleHeartClick}>
//               {isFavorite ? (
//                 <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
//               ) : (
//                 <FiHeart className={css.heartIcon} />
//               )}
//             </p>
//           </div>
//           <div className={css.teacherInfo}>
//             <h2 className={css.titleTeachers}>
//               {name} {surname}
//             </h2>
//             <ul className={css.contentList}>
//               <li className={css.contentItem}>
//                 Speaks:{' '}
//                 <span className={css.teacherContent}>
//                   {languages.join(', ')}
//                 </span>
//               </li>
//               <li className={css.contentItem}>
//                 Lesson info:{' '}
//                 <span className={css.teacherContent}>{lesson_info}</span>
//               </li>
//               <li className={css.contentItem}>
//                 Conditions:{' '}
//                 <span className={css.teacherContent}>{conditions}</span>
//               </li>
//             </ul>
//             {!showMore && (
//               <p onClick={handleReadMore} className={css.linkShowSearch}>
//                 Read more
//               </p>
//             )}

//             {showMore && (
//               <TeacherDetail
//                 description={lesson_info}
//                 avatar={avatar_url}
//                 name_review={name}
//                 rating={rating}
//                 reviews={reviews}
//                 experience={experience}
//                 levels={levels}
//                 selectedLevel={selectedLevel}
//               />
//             )}
//           </div>
//           {!showMore && (
//             <div className={css.levelList}>
//               {levels.map((level, index) => (
//                 <p
//                   key={index}
//                   className={`${css.levelsItem} ${
//                     level === selectedLevel ? css.selectedLevel : ''
//                   }`}
//                 >
//                   {level}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }

// import { useState, useEffect } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import greenLable from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { TeacherDetail } from '../TeacherDetail/TeacherDetail'

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
//   onToggleFavorite, // Функция для обновления состояния избранного
//   selectedLevel,
// }) {
//   const [showMore, setShowMore] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false)

//   // Проверка статуса избранного при монтировании компонента
//   useEffect(() => {
//     const favoriteCards =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     const isFav = favoriteCards.some((card) => card.id === id)
//     setIsFavorite(isFav)
//   }, [id])

//   const handleHeartClick = () => {
//     setIsFavorite((prev) => {
//       const updatedStatus = !prev
//       const favoriteCards =
//         JSON.parse(localStorage.getItem('favoriteCards')) || []

//       if (updatedStatus) {
//         const isAlreadyFavorite = favoriteCards.some((card) => card.id === id)
//         if (!isAlreadyFavorite) {
//           favoriteCards.push({
//             id,
//             name,
//             surname,
//             languages,
//             levels,
//             rating,
//             price_per_hour,
//             avatar_url,
//             lessons_done,
//             lesson_info,
//             conditions,
//             experience,
//             reviews,
//           })
//         }
//       } else {
//         const index = favoriteCards.findIndex((card) => card.id === id)
//         if (index !== -1) favoriteCards.splice(index, 1)
//       }

//       localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
//       if (onToggleFavorite) onToggleFavorite(id) // Обновляем список избранных
//       return updatedStatus
//     })
//   }

//   const handleReadMore = () => {
//     setShowMore((prev) => !prev)
//   }

//   return (
//     <div className={css.teacherSection}>
//       <div className={css.teacherCard}>
//         <div className={css.teacherImageBox}>
//           <img
//             src={avatar_url}
//             alt={`${name} ${surname}`}
//             className={css.teacherImage}
//           />
//           <svg className={css.teacherLable} aria-label="green label">
//             <use href={`${greenLable}#greenLable`} />
//           </svg>
//         </div>
//         <div className={css.teacherContent}>
//           <div className={css.teacherHeader}>
//             <p className={css.contentItem}>Languages</p>
//             <div className={css.teacherHeaderList}>
//               <svg className={css.teacherIcon} aria-label="open book">
//                 <use href={`${bookOpen}#bookOpen`} />
//               </svg>
//               <p className={css.teacherContent}>Lessons online</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>Lessons done: {lessons_done}</p>
//               <span className={css.divider}></span>
//               <svg className={css.teacherIcon} aria-label="open book">
//                 <use href={`${star}#star`} />
//               </svg>
//               <p className={css.teacherContent}>Rating: {rating}</p>
//               <span className={css.divider}></span>
//               <p className={css.teacherContent}>
//                 Price/1 hour:{' '}
//                 <span className={css.priceValue}>{price_per_hour}$</span>
//               </p>
//             </div>
//             <p className={css.btnHeart} onClick={handleHeartClick}>
//               {isFavorite ? (
//                 <FaHeart className={`${css.heartIcon} ${css.favorited}`} />
//               ) : (
//                 <FiHeart className={css.heartIcon} />
//               )}
//             </p>
//           </div>
//           <div className={css.teacherInfo}>
//             <h2 className={css.titleTeachers}>
//               {name} {surname}
//             </h2>
//             <ul className={css.contentList}>
//               <li className={css.contentItem}>
//                 Speaks:{' '}
//                 <span className={css.teacherContent}>
//                   {languages.join(', ')}
//                 </span>
//               </li>
//               <li className={css.contentItem}>
//                 Lesson info:{' '}
//                 <span className={css.teacherContent}>{lesson_info}</span>
//               </li>
//               <li className={css.contentItem}>
//                 Conditions:{' '}
//                 <span className={css.teacherContent}>{conditions}</span>
//               </li>
//             </ul>
//             {!showMore && (
//               <p onClick={handleReadMore} className={css.linkShowSearch}>
//                 Read more
//               </p>
//             )}

//             {showMore && (
//               <TeacherDetail
//                 description={lesson_info}
//                 avatar={avatar_url}
//                 name_review={name} // чи яке поле ви хочете використовувати
//                 rating={rating}
//                 // review={review} // якщо ви плануєте його використовувати
//                 reviews={reviews} // передайте масив відгуків
//                 experience={experience}
//                 levels={levels}
//                 selectedLevel={selectedLevel} // Передаємо обраний рівень
//               />
//             )}
//           </div>
//           {!showMore && (
//             <div className={css.levelList}>
//               {levels.map((level, index) => (
//                 <p
//                   key={index}
//                   className={`${css.levelsItem} ${
//                     level === selectedLevel ? css.selectedLevel : ''
//                   }`} // Додаємо клас, якщо рівень збігається з обраним
//                 >
//                   {level}
//                 </p>
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     </div>
//   )
// }
