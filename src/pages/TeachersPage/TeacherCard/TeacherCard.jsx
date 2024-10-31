import { useState, useEffect } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'
import greenLable from '/src/assets/icons/sprite.svg'

import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { Lesson } from '/src/components/Modal/Lesson/Lesson'

export function TeacherCard({
  id, // Добавляем уникальный ID карточки
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
}) {
  const [showMore, setShowMore] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Проверка статуса избранного при монтировании компонента
  useEffect(() => {
    const favoriteCards =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setIsFavorite(favoriteCards.includes(id))
  }, [id])

  const handleHeartClick = () => {
    setIsFavorite((prev) => {
      const updatedStatus = !prev
      const favoriteCards =
        JSON.parse(localStorage.getItem('favoriteCards')) || []

      if (updatedStatus) {
        // Додаємо об'єкт картки до обраного
        favoriteCards.push({
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
        })
      } else {
        // Видаляємо об'єкт картки з обраного
        const index = favoriteCards.findIndex((card) => card.id === id)
        if (index !== -1) favoriteCards.splice(index, 1)
      }

      // Оновлюємо `localStorage`
      localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
      return updatedStatus
    })
  }
  // const handleHeartClick = () => {
  //   setIsFavorite((prev) => {
  //     const updatedStatus = !prev
  //     const favoriteCards =
  //       JSON.parse(localStorage.getItem('favoriteCards')) || []

  //     if (updatedStatus) {
  //       // Добавляем карточку в избранное
  //       favoriteCards.push(id)
  //     } else {
  //       // Удаляем карточку из избранного
  //       const index = favoriteCards.indexOf(id)
  //       if (index !== -1) favoriteCards.splice(index, 1)
  //     }

  //     // Обновляем `localStorage`
  //     localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
  //     return updatedStatus
  //   })
  // }

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  const handleReadMore = () => {
    setShowMore((prev) => !prev)
  }

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
              <svg className={css.teacherIcon} aria-label="open book">
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
            <p onClick={handleReadMore} className={css.linkShowSearch}>
              {showMore ? 'Show less' : 'Read more'}
            </p>
            {showMore && (
              <div className={css.additionalInfo}>
                <p className={css.experienceContent}>{experience}</p>
                {reviews.map((review, index) => (
                  <div key={index} className={css.review}>
                    <p className={css.contentItem}>{review.reviewer_name}</p>
                    <div className={css.teacherRating}>
                      <svg className={css.teacherIcon} aria-label="open book">
                        <use href={`${star}#star`} />
                      </svg>
                      <p className={css.ratingValue}>
                        {review.reviewer_rating}
                      </p>
                    </div>
                    <p className={css.reviewComment}>{review.comment}</p>
                  </div>
                ))}
              </div>
            )}
          </div>
          <div className={css.levelList}>
            {levels.map((level, index) => (
              <p key={index} className={css.levelsItem}>
                {level}
              </p>
            ))}
          </div>
          {showMore && (
            <button
              onClick={openModal}
              type="button"
              className={css.btnTrialLesson}
            >
              Book trial lesson
            </button>
          )}
          {isModalOpen && <Lesson onClose={closeModal} />}
        </div>
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
// import { Lesson } from '/src/components/Modal/Lesson/Lesson'

// export function TeacherCard({
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
// }) {
//   const [showMore, setShowMore] = useState(false)
//   const [isFavorite, setIsFavorite] = useState(false) // Додано для збереження статусу улюбленого

//   const [isModalOpen, setIsModalOpen] = useState(false)
//   // Функция для открытия и закрытия модального окна
//   const openModal = () => setIsModalOpen(true)
//   const closeModal = () => setIsModalOpen(false)

//   const handleReadMore = () => {
//     setShowMore((prev) => !prev)
//   }

//   const handleHeartClick = () => {
//     setIsFavorite((prev) => !prev) // Змінюємо статус улюбленого при натисканні
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
//           <svg className={css.teacherLable} aria-label="green lable">
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
//                 Price/ 1 hour:{' '}
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

//             <p onClick={handleReadMore} className={css.linkShowSearch}>
//               {showMore ? 'Show less' : 'Read more'}
//             </p>
//             {showMore && (
//               <div className={css.additionalInfo}>
//                 <p className={css.experienceContent}>{experience}</p>
//                 {reviews.map((review, index) => (
//                   <div key={index} className={css.review}>
//                     <p className={css.contentItem}>{review.reviewer_name}</p>
//                     <div className={css.teacherRating}>
//                       <svg className={css.teacherIcon} aria-label="open book">
//                         <use href={`${star}#star`} />
//                       </svg>
//                       <p className={css.ratingValue}>
//                         {review.reviewer_rating}
//                       </p>
//                     </div>
//                     <p className={css.reviewComment}>{review.comment}</p>
//                   </div>
//                 ))}
//               </div>
//             )}
//           </div>

//           <div className={css.levelList}>
//             {levels.map((level, index) => (
//               <p key={index} className={css.levelsItem}>
//                 {level}
//               </p>
//             ))}
//           </div>
//           {showMore && (
//             <button
//               onClick={openModal}
//               type="button"
//               className={css.btnTrialLesson}
//             >
//               Book trial lesson
//             </button>
//           )}

//           {/* Отображаем модальное окно Lesson, если isModalOpen === true */}
//           {isModalOpen && <Lesson onClose={closeModal} />}
//         </div>
//       </div>
//     </div>
//   )
// }
