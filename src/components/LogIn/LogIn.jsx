import css from './LogIn.module.css'
import close from '../../assets/icons/sprite.svg'

export function LogIn() {
  return (
    <div className={css.LoginSection}>
      <button type="button">
        <svg className={css.close} aria-label="close log in Icon">
          <use href={`${close}#close`} />
        </svg>
      </button>
      <h2 className={css.titleLogin}>Log In</h2>
      <p className={css.textLogin}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <input type="text" placeholder="Email" />
      <input type="password" placeholder="Password" />
      <button type="submit" className={css.btnLogin}>
        Log In
      </button>
    </div>
  )
}
