import { useState, useEffect } from 'react'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'
import star from '/src/assets/icons/sprite.svg'
import greenLable from '/src/assets/icons/sprite.svg'
import { FaHeart } from 'react-icons/fa'
import { FiHeart } from 'react-icons/fi'
import { TeacherDetail } from '../TeacherDetail/TeacherDetail'
import { HeartModal } from '/src/components/Modal/HeartModal/HeartModal'
import { useAuth } from '/src/AuthProvider'
import { getFavoriteCards, handleToggleFavorite } from '/src/data/firebase.js'

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
  onToggleFavorite,
}) {
  const [showMore, setShowMore] = useState(false)
  const [isFavorite, setIsFavorite] = useState(false)
  const [showModal, setShowModal] = useState(false)
  const { user, loading } = useAuth()

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      if (loading) return
      if (user) {
        try {
          const favoriteCards = await getFavoriteCards(user.uid)
          setIsFavorite(favoriteCards.some((card) => card.id === id))
        } catch {}
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
        await handleToggleFavorite(
          user.uid,
          {
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
            selectedLevel,
          },
          onToggleFavorite
        )
        setIsFavorite((prev) => !prev)
      } catch (error) {
        console.error('Error processing:', error)
      }
    }
  }

  const handleReadMore = () => setShowMore((prev) => !prev)

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
          <p className={css.btnHeart} onClick={handleHeartClick}>
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
