import { NavLink } from 'react-router-dom'
import clsx from 'clsx'
import css from './Navigation.module.css' // Імпортуємо стилі

const buildLinkClass = ({ isActive }) => {
  return clsx(css.link, isActive && css.active)
}

function Navigation() {
  return (
    <nav className={css.navbar}>
      <ul className={css.navButton}>
        <li>
          <NavLink to="/" end className={buildLinkClass}>
            <h2>Home</h2>
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={buildLinkClass}>
            <h2>Teachers</h2>
          </NavLink>
        </li>
        <li>
          <NavLink to="/favorites" className={buildLinkClass}>
            <h2>Favorites</h2>
          </NavLink>
        </li>
      </ul>
    </nav>
  )
}

export default Navigation
