import { useState, useEffect } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'
import greenLable from '/src/assets/icons/sprite.svg'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { TeacherDetail } from '../TeacherDetail/TeacherDetail'

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
  onToggleFavorite, // Функция для обновления состояния избранного
  selectedLevel,
}) {
  const [showMore, setShowMore] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)

  // Проверка статуса избранного при монтировании компонента
  useEffect(() => {
    const favoriteCards =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    const isFav = favoriteCards.some((card) => card.id === id)
    setIsFavorite(isFav)
  }, [id])

  const handleHeartClick = () => {
    setIsFavorite((prev) => {
      const updatedStatus = !prev
      const favoriteCards =
        JSON.parse(localStorage.getItem('favoriteCards')) || []

      if (updatedStatus) {
        const isAlreadyFavorite = favoriteCards.some((card) => card.id === id)
        if (!isAlreadyFavorite) {
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
        }
      } else {
        const index = favoriteCards.findIndex((card) => card.id === id)
        if (index !== -1) favoriteCards.splice(index, 1)
      }

      localStorage.setItem('favoriteCards', JSON.stringify(favoriteCards))
      if (onToggleFavorite) onToggleFavorite(id) // Обновляем список избранных
      return updatedStatus
    })
  }

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
            {!showMore && (
              <p onClick={handleReadMore} className={css.linkShowSearch}>
                Read more
              </p>
            )}

            {showMore && (
              <TeacherDetail
                description={lesson_info}
                avatar={avatar_url}
                name_review={name} // чи яке поле ви хочете використовувати
                rating={rating}
                // review={review} // якщо ви плануєте його використовувати
                reviews={reviews} // передайте масив відгуків
                experience={experience}
                levels={levels}
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
                  }`} // Додаємо клас, якщо рівень збігається з обраним
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
