import css from './HomeStat.module.css'
import { useAuth } from '../../../App'

export function HomeStat() {
  const { isLoggedIn } = useAuth()

  const statClass = isLoggedIn ? css.authenticated : css.logOutStyle

  return (
    <div className={`${css.statSection} ${statClass}`}>
      <div className={css.statList}>
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
    </div>
  )
}
