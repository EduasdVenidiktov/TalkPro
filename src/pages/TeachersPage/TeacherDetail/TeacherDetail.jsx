import { useState } from 'react'
import css from './TeacherDetail.module.css'
import { Lesson } from 'components/Modal/Lesson/Lesson'

export function TeacherDetail({
  description,
  avatar,
  name_review,
  rating,
  review,
  levels,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  // Функция для открытия и закрытия модального окна
  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={css.teacherDetailSection}>
      <p className={css.teacherDescription}>{description}</p>
      <div className={css.teacherReview}>
        <p className={css.teacherAvatar}>{avatar}</p>
        <p className={css.reviewerName}>{name_review}</p>
        <div className={css.teacherRating}>
          <svg></svg>
          <p className={css.ratingValue}>{rating}</p>
        </div>
      </div>
      <h2 className={css.reviewText}>{review}</h2>
      <div className={css.levelsContainer}>
        <p className={css.levelsText}>Levels: {levels.join(', ')}</p>
      </div>
      <button onClick={openModal} type="button" className={css.btnTrialLesson}>
        Book trial lesson
      </button>

      {/* Отображаем модальное окно Lesson, если isModalOpen === true */}
      {isModalOpen && <Lesson onClose={closeModal} />}
    </div>
  )
}
