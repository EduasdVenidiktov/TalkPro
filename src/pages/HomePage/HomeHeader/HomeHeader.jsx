import { useState, useEffect } from 'react'
import css from './HomeHeader.module.css'
import ukraine from '../../../assets/icons/sprite.svg'
import logOut from '../../../assets/icons/sprite.svg'
import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
import { Link, useNavigate } from 'react-router-dom' // Імпорт Link для навігації
import toast from 'react-hot-toast'
import { useAuth } from '../../../App'

export function HomeHeader() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasFavorites, setHasFavorites] = useState(false)
  const navigate = useNavigate()
  const { isLoggedIn, logout } = useAuth()
  const statClass = isLoggedIn ? css.authenticated : css.logOutStyle
  const logInClass = !isLoggedIn ? css.logOutText : ''
  const handleClick = () => {
    setTimeout(() => {
      logout() // Викликаємо logout із затримкою
    }, 1500) // Затримка у 1.5 секунди
    handleLogOut() // Спочатку викликаємо handleLogOut
  }

  useEffect(() => {
    // Перевіряємо, чи є токен в localStorage
    const userToken = localStorage.getItem('userToken')
    setIsAuthenticated(!!userToken)

    const favoriteCards =
      JSON.parse(localStorage.getItem('favoriteCards')) || []
    setHasFavorites(favoriteCards.length > 0) // Оновлюємо стан
  })

  const handleLogInClick = () => {
    setIsLogInOpen(true)
  }

  const handleRegistrationClick = () => {
    setIsRegistrationOpen(true)
  }

  const closeModal = () => {
    setIsLogInOpen(false)
    setIsRegistrationOpen(false)
  }

  const handleLogOut = () => {
    toast.success('Buy, see you again!', {
      className: css.toastSuccess,
      duration: 1500, // Продолжительность в миллисекундах (5000 = 5 секунд)
    })

    localStorage.removeItem('userToken') // Видаляємо токен
    localStorage.removeItem('filters') // Очищення вибраних фільтрів
    localStorage.removeItem('favorites') // Очищення вибраних сердечок
    sessionStorage.clear() // Очищення тимчасових даних
    setIsAuthenticated(false) // Оновлюємо стан аутентифікації
    setHasFavorites(false) // Оновлюємо стан hasFavorites, щоб хедер більше не відображав "Favorite"
    setIsLogInOpen(false)
    setIsRegistrationOpen(false)

    setTimeout(() => {
      navigate('/')
    }, 1500)

    navigate('/') // Перенаправлення на головну
  }

  const handleLogInSuccess = (user) => {
    // Сохраняем пользователя в localStorage
    localStorage.setItem('userToken', JSON.stringify(user))
    setIsAuthenticated(true) // Обновляем состояние аутентификации
  }

  return (
    <div className={css.headerBox}>
      <div className={css.logoHeaderBox}>
        {isLoggedIn ? (
          <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
            <use href={`${ukraine}#ukraine`} />
          </svg>
        ) : (
          <div className={css.grayCircle}></div>
        )}
        <h2>
          <Link to="/" className={css.logoName}>
            LearnLingo
          </Link>
        </h2>
      </div>

      <ul className={css.headerMenu}>
        <li>
          <Link to="/" className={css.menuItem}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/teachers" className={css.menuItem}>
            Teachers
          </Link>
        </li>
        {isAuthenticated && hasFavorites && (
          <li>
            <Link to="/favorite" className={css.menuItem}>
              Favorite
            </Link>
          </li>
        )}
      </ul>

      <ul className={css.regAuthMenu}>
        {isAuthenticated ? (
          <li>
            <svg
              className={css.logOut}
              aria-label="Log Out Icon"
              onClick={handleClick}
            >
              <use href={`${logOut}#logOut`} />
            </svg>
          </li>
        ) : (
          <>
            <li>
              <h2
                className={`${css.loginText} ${logInClass}`}
                onClick={handleLogInClick}
              >
                Log in
              </h2>
            </li>
            <li>
              <button
                className={`${css.buttonReg} ${statClass}`}
                onClick={handleRegistrationClick}
              >
                Registration
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Відкриваємо модальні вікна */}
      {isLogInOpen && (
        <div className={css.modalOverlay}>
          <LogIn onClose={closeModal} onLogInSuccess={handleLogInSuccess} />
        </div>
      )}
      {isRegistrationOpen && (
        <div className={css.modalOverlay}>
          <Registration onClose={closeModal} />
        </div>
      )}
    </div>
  )
}
