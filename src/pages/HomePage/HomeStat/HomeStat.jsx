import clsx from 'clsx'
import css from './HomeStat.module.css'
import { useAuth } from '/src/AuthProvider'

export function HomeStat() {
  const { user } = useAuth()
  // const statClass = user ? css.authenticated : css.logOutStyle
  const statClass = clsx(user ? css.authenticated : css.logOutStyle)

  return (
    <div className={clsx(css.statSection, statClass)}>
      <div className={css.statItem}>
        <h2 className={css.statNumber}>32,000</h2>
        <span className={css.plusSign}>+</span>
        <p className={css.statText}>Experienced tutors</p>
      </div>
      <div className={css.statItem}>
        <>
          <h2 className={css.statNumber}>300,000</h2>
          <span className={css.plusSign}>+</span>
        </>
        <p className={css.statText}>5-star tutor reviews</p>
      </div>
      <div className={css.statItem}>
        <h2 className={css.statNumber}>120</h2>
        <span className={css.plusSign}>+</span>
        <p className={css.statText}>Subjects taught</p>
      </div>
      <div className={css.statItem}>
        <>
          <h2 className={css.statNumber}>200</h2>
          <span className={css.plusSign}>+</span>
        </>
        <p className={css.statText}>Tutor nationalities</p>
      </div>
    </div>
  )
}
