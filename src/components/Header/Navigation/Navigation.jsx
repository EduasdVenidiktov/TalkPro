import { NavLink } from 'react-router-dom'
import css from './Navigation.module.css'
import clsx from 'clsx'
import { useAuth } from '/src/AuthProvider'
import { usePageStyles } from '/src/data/options.js'

export function Navigation() {
  const { user } = useAuth()
  const buildLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active)

  const { isSpecialPage, isTeachersWithoutUser } = usePageStyles(user)

  const navStyle = {
    paddingBottom: '14px',
    marginTop: '14px',
    marginLeft: isSpecialPage
      ? '316px'
      : isTeachersWithoutUser
        ? '316px'
        : '380px', // Значение по умолчанию
    paddingRight: isSpecialPage || isTeachersWithoutUser ? '0px' : '94px',
  }

  return (
    <nav className={css.navigator} style={navStyle}>
      <ul className={css.headerMenu}>
        <li>
          <NavLink to="/" end className={buildLinkClass}>
            Home
          </NavLink>
        </li>
        <li>
          <NavLink to="/teachers" className={buildLinkClass}>
            Teachers
          </NavLink>
        </li>

        {user && (
          <li>
            <NavLink to="/favorite" className={buildLinkClass}>
              Favorite
            </NavLink>
          </li>
        )}
      </ul>
    </nav>
  )
}
