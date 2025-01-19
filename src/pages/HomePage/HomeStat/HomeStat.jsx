import clsx from 'clsx'
import css from './HomeStat.module.css'
import { useAuth } from '/src/AuthProvider'

export function HomeStat() {
  const { user } = useAuth()
  const statClass = clsx(user ? css.authenticated : css.logOutStyle)

  return (
    <div className={css.statContainer}>
      <ul className={clsx(css.statSection, statClass)}>
        <li className={css.statItem}>
          <h2 className={css.statNumber}>32,000</h2>
          <span className={css.plusSign}>+</span>
          <p className={css.statText}>Experienced tutors</p>
        </li>
        <li className={css.statItem}>
          <>
            <h2 className={css.statNumber}>300,000</h2>
            <span className={css.plusSign}>+</span>
          </>
          <p className={css.statText}>5-star tutor reviews</p>
        </li>
        <li className={css.statItem}>
          <h2 className={css.statNumber}>120</h2>
          <span className={css.plusSign}>+</span>
          <p className={css.statText}>Subjects taught</p>
        </li>
        <li className={css.statItem}>
          <>
            <h2 className={css.statNumber}>200</h2>
            <span className={css.plusSign}>+</span>
          </>
          <p className={css.statText}>Tutor nationalities</p>
        </li>
      </ul>
    </div>
  )
}
