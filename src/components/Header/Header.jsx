import css from './Header.module.css'
import ukraine from '../../assets/icons/sprite.svg'
import logIn from '../../assets/icons/sprite.svg'

export function Header() {
  return (
    <div className={css.headerBox}>
      <div className={css.logoHeaderBox}>
        <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
          <use href={`${ukraine}#ukraine`} />
        </svg>
        <h2>
          <a href="" className={css.logoName}>
            LearnLingo
          </a>
        </h2>
      </div>

      <ul className={css.headerMenu}>
        <li>
          <p src="../../pages/Home">Home</p>
        </li>
        <li>
          <p src="../../pages/Teachers">Teachers</p>
        </li>
      </ul>

      <ul className={css.regAuthMenu}>
        <li>
          <svg className={css.logIn} aria-label="Log In Icon">
            <use href={`${logIn}#logIn`} />
          </svg>
        </li>
        <li>
          <h2 className={css.loginText}>Log in</h2>
        </li>
        <li>
          <button className={css.buttonReg}>Registration</button>
        </li>
      </ul>
    </div>
  )
}
