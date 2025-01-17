import { Link } from 'react-router-dom'
import ukraine from '/src/assets/icons/sprite.svg'
import { useAuth } from '/src/AuthProvider'
import css from './LogoMenu.module.css'

export function LogoMenu() {
  const { user } = useAuth()

  return (
    <div className={css.logoHeaderBox}>
      {user ? (
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
  )
}
