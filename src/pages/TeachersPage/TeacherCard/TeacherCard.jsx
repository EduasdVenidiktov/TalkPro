import { Link } from 'react-router-dom'
import css from './TeacherCard.module.css'
import bookOpen from '/src/assets/icons/sprite.svg'

export function TeacherCard({
  name,
  surname,
  languages,
  levels,
  rating,
  price_per_hour,
  avatar_url,
  lessons_done,
}) {
  return (
    <div className={css.teacherSection}>
      <div className={css.teacherCard}>
        <img
          src={avatar_url}
          alt={`${name} ${surname}`}
          className={css.teacherImage}
        />
        <p className={css.speaksText}>Languages: {languages.join(', ')}</p>
        <h2 className={css.titleTeachers}>
          {name} {surname}
        </h2>
        <div className={css.lessOnline}>
          <svg className={css.bookOpenIcon} aria-label="open book">
            <use href={`${bookOpen}#bookOpen`} />
          </svg>
          <p>Lessons online</p>
        </div>
        <p className={css.lessonsDone}>Lessons done: {lessons_done}</p>
        <p className={css.ratingText}>Rating: {rating}</p>
        <p>
          Price/ 1 hour:{' '}
          <span className={css.priceValue}>{price_per_hour}$</span>
        </p>
      </div>

      <div className={css.description}>
        <p className={css.speaksText}>Speaks: {languages.join(', ')}</p>
        <p className={css.lessonInfo}>Lesson info: Basic, Advanced</p>
        <p className={css.conditions}>Conditions: Flexible</p>
      </div>

      <Link to="/teachers/:id" className={css.btnShowSearch}>
        Read more
      </Link>

      <div className={css.levelList}>
        <p className={css.levelsText}>Levels: {levels.join(', ')}</p>
      </div>
    </div>
  )
}
