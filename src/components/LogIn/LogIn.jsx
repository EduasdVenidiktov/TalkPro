import css from './LogIn.module.css'
import close from '../../assets/icons/sprite.svg'

export function LogIn() {
  return (
    <div className={css.LoginSection}>
      <svg className={css.closeIcon} aria-label="close log in Icon">
        <use href={`${close}#x`} />
      </svg>
      <h2 className={css.titleLogin}>Log In</h2>
      <p className={css.textLogin}>
        Welcome back! Please enter your credentials to access your account and
        continue your search for an teacher.
      </p>
      <div className={css.inputWrapper}>
        <input type="text" placeholder="Email" className={css.inputField} />
        <input
          type="password"
          placeholder="Password"
          className={css.inputField}
        />
      </div>
      <button type="submit" className={css.btnLogin}>
        Log In
      </button>
    </div>
  )
}
