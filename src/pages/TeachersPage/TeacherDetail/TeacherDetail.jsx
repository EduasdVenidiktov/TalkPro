import { useState } from 'react'
import css from './TeacherDetail.module.css'
import star from '/src/assets/icons/sprite.svg'
import { Lesson } from '/src/components/Modal/Lesson/Lesson'

export function TeacherDetail({
  reviews = [], // Убедитесь, что по умолчанию это массив
  experience,
  levels,
  selectedLevel,
  avatar_url,
  name,
  surname,
}) {
  const [isModalOpen, setIsModalOpen] = useState(false)

  const openModal = () => setIsModalOpen(true)
  const closeModal = () => setIsModalOpen(false)

  return (
    <div className={css.additionalInfo}>
      <p className={css.experienceContent}>{experience}</p>
      {reviews.length > 0 ? (
        reviews.map((review, index) => (
          <div key={index} className={css.review}>
            <div className={css.infoContainer}>
              <img
                src={review.reviewer_avatar_url}
                alt={`${review.reviewer_name} avatar`}
                className={css.reviewerAvatar}
                onError={(e) => {
                  console.error('Error loading image:', e.target.src)
                  e.target.src = '/path/to/default/avatar.jpg'
                }}
              />
              <p className={css.contentItem}>{review.reviewer_name}</p>
              <div className={css.teacherRating}>
                <svg className={css.teacherIcon} aria-label="star">
                  <use href={`${star}#star`} />
                </svg>
                <p className={css.ratingValue}>{review.reviewer_rating}.0</p>
              </div>
            </div>
            <p className={css.reviewComment}>{review.comment}</p>
          </div>
        ))
      ) : (
        <p>No reviews available</p>
      )}

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
      <button onClick={openModal} type="button" className={css.btnTrialLesson}>
        Book trial lesson
      </button>
      {isModalOpen && (
        <Lesson
          onClose={closeModal}
          avatar_url={avatar_url}
          name={name}
          surname={surname}
        />
      )}
    </div>
  )
}
