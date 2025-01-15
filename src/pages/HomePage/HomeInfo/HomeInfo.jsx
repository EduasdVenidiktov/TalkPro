import { useNavigate } from 'react-router-dom'
import css from './HomeInfo.module.css' // Імпортуєш модульні стилі для інших елементів
import { useAuth } from '/src/AuthProvider'
import clsx from 'clsx'

export function HomeInfo() {
  const navigate = useNavigate()
  const { user } = useAuth()
  const handleGetStartedClick = () => {
    navigate('/teachers')
  }
  const logOutClass = clsx(
    user ? css.authenticated : css.logOutStyle && css.logOutBtnStyle
  )

  return (
    <div className={css.infoSection}>
      <h1 className={css.title}>
        Unlock your potential with the best
        <span className={css.spanWord}> language </span>
        <span className={css.spanWordEnd}>tutors</span>
        <div className={`${css.backgroundDiv} ${logOutClass}`}></div>
      </h1>
      <p className={css.infoText}>
        Embark on an Exciting Language Journey with Expert Language Tutors:
        Elevate your language proficiency to new heights by connecting with
        highly qualified and experienced tutors.
      </p>
      <button
        className={`${css.buttonStyle} ${logOutClass}`}
        onClick={handleGetStartedClick}
      >
        Get started
      </button>
    </div>
  )
}
