import { useNavigate } from 'react-router-dom'
import css from './HomeInfo.module.css' // Імпортуєш модульні стилі для інших елементів
import { useAuth } from '../../../App'

export function HomeInfo() {
  const navigate = useNavigate()
  const { isLoggedIn } = useAuth()

  const handleGetStartedClick = () => {
    navigate('/teachers')
  }

  const logOutClass = isLoggedIn ? css.authenticated : css.logOutStyle

  return (
    <div className={css.infoSection}>
      <h1 className={css.title}>
        Unlock your potential with the best
        <span className={css.spanWord}> language</span>
        <div className={`${css.backgroundDiv} ${logOutClass}`}></div>
        tutors
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
