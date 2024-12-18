import { Navigate, NavLink } from 'react-router-dom'
import clsx from 'clsx'
import css from './Navigation.module.css' // Імпортуємо стилі

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active)
}
const isLoggedIn = !!localStorage.getItem('userToken') // Проверяем наличие токена

function Navigation() {
  if (!isLoggedIn) {
    return <Navigate to="/login" replace /> // Перенаправляем неавторизованного пользователя
  }

  return (
    <nav className={css.navbar}>
      <ul className={css.navButton}>
        <li>
          <NavLink to="/" className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={buildLinkClass}>
            Teachers
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={buildLinkClass}>
            Favorites
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
