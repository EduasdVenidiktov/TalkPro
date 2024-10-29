// import { useState } from 'react'
// import css from './TeacherCard.module.css'
// import bookOpen from '/src/assets/icons/sprite.svg'
// import star from '/src/assets/icons/sprite.svg'
// import { FaHeart } from 'react-icons/fa'
// import { FiHeart } from 'react-icons/fi'
// import { useFavorites } from '../../FavoritesPage/FavoritesPage'

// export function TeacherCard({
//   _id, // Добавляем _id как пропс для идентификации учителя
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
//   const { addFavorite, removeFavorite, isFavorite } = useFavorites()

//   const handleReadMore = () => {
//     setShowMore((prev) => !prev)
//   }

//   const handleHeartClick = () => {
//     if (isFavorite(_id)) {
//       // Проверяем, есть ли учитель в избранном
//       removeFavorite(_id)
//     } else {
//       addFavorite({
//         _id,
//         name,
//         surname,
//         languages,
//         levels,
//         rating,
//         price_per_hour,
//         avatar_url,
//         lessons_done,
//         lesson_info,
//         conditions,
//         experience,
//         reviews,
//       }) // Добавляем учителя в избранное
//     }
//   }

//   return (
//     <div className={css.teacherSection}>
//       <div className={css.teacherCard}>
//         <div className={css.teacherHeader}>
//           <img
//             src={avatar_url}
//             alt={`${name} ${surname}`}
//             className={css.teacherImage}
//           />
//           <p className={css.speaksText}>Languages</p>
//           <svg className={css.bookOpenIcon} aria-label="open book">
//             <use href={`${bookOpen}#bookOpen`} />
//           </svg>
//           <p>Lessons online</p>
//           <p className={css.lessonsDone}>Lessons done: {lessons_done}</p>
//           <svg className={css.bookOpenIcon} aria-label="open book">
//             <use href={`${star}#star`} />
//           </svg>
//           <p className={css.ratingText}>Rating: {rating}</p>
//           <p>
//             Price/ 1 hour:{' '}
//             <span className={css.priceValue}>{price_per_hour}$</span>
//           </p>

//           <button className={css.btnHeart} onClick={handleHeartClick}>
//             {isFavorite(_id) ? (
//               <FaHeart className={css.iconSize} />
//             ) : (
//               <FiHeart className={css.iconSize} />
//             )}
//           </button>
//         </div>

//         <div className={css.teacherInfo}>
//           <h2 className={css.titleTeachers}>
//             {name} {surname}
//           </h2>
//           <p className={css.speaksText}>Speaks: {languages.join(', ')}</p>
//           <p className={css.lessonInfo}>Lesson info: {lesson_info}</p>
//           <p className={css.conditions}>Conditions: {conditions}</p>

//           <button onClick={handleReadMore} className={css.btnShowSearch}>
//             {showMore ? 'Show less' : 'Read more'}
//           </button>
//           {showMore && (
//             <div className={css.additionalInfo}>
//               <p className={css.teacherExperience}>{experience}</p>
//               {reviews.map((review, index) => (
//                 <div key={index} className={css.review}>
//                   <p className={css.reviewerName}>{review.reviewer_name}</p>
//                   <div className={css.teacherRating}>
//                     <svg className={css.bookOpenIcon} aria-label="open book">
//                       <use href={`${star}#star`} />
//                     </svg>
//                     <p className={css.ratingValue}>{review.reviewer_rating}</p>
//                   </div>
//                   <p className={css.reviewComment}>{review.comment}</p>
//                 </div>
//               ))}
//             </div>
//           )}
//         </div>

//         <div className={css.levelList}>
//           <p className={css.levelsText}>Levels: {levels.join(', ')}</p>
//         </div>
//       </div>
//     </div>
//   )
// }

import { useState } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'

export function TeacherCard({
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
  reviews = [], // Добавляем пропс для отзывов
}) {
  const [showMore, setShowMore] = useState(false)

  const handleReadMore = () => {
    setShowMore((prev) => !prev)
  }

  return (
    <div className={css.teacherSection}>
      <div className={css.teacherCard}>
        <div className={css.teacherHeader}>
          <img
            src={avatar_url}
            alt={`${name} ${surname}`}
            className={css.teacherImage}
          />
          <p className={css.speaksText}>Languages</p>
          <svg className={css.bookOpenIcon} aria-label="open book">
            <use href={`${bookOpen}#bookOpen`} />
          </svg>
          <p>Lessons online</p>
          <p className={css.lessonsDone}>Lessons done: {lessons_done}</p>
          <svg className={css.bookOpenIcon} aria-label="open book">
            <use href={`${star}#star`} />
          </svg>
          <p className={css.ratingText}>Rating: {rating}</p>
          <p>
            Price/ 1 hour:{' '}
            <span className={css.priceValue}>{price_per_hour}$</span>
          </p>
        </div>

        <div className={css.teacherInfo}>
          <h2 className={css.titleTeachers}>
            {name} {surname}
          </h2>
          <p className={css.speaksText}>Speaks: {languages.join(', ')}</p>
          <p className={css.lessonInfo}>Lesson info: {lesson_info}</p>
          <p className={css.conditions}>Conditions: {conditions}</p>

          <button onClick={handleReadMore} className={css.btnShowSearch}>
            {showMore ? 'Show less' : 'Read more'}
          </button>
          {showMore && (
            <div className={css.additionalInfo}>
              <p className={css.teacherExperience}>{experience}</p>
              {reviews.map((review, index) => (
                <div key={index} className={css.review}>
                  <p className={css.reviewerName}>{review.reviewer_name}</p>
                  <div className={css.teacherRating}>
                    <svg className={css.bookOpenIcon} aria-label="open book">
                      <use href={`${star}#star`} />
                    </svg>
                    <p className={css.ratingValue}>{review.reviewer_rating}</p>
                  </div>
                  <p className={css.reviewComment}>{review.comment}</p>
                </div>
              ))}
            </div>
          )}
        </div>

        <div className={css.levelList}>
          <p className={css.levelsText}>Levels: {levels.join(', ')}</p>
        </div>
      </div>
    </div>
  )
}
