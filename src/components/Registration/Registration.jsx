import css from './Registration.module.css'
import close from '../../assets/icons/sprite.svg'

export function Registration() {
  return (
    <div className={css.registrationSection}>
      <svg className={css.closeIcon} aria-label="close log in Icon">
        <use href={`${close}#close`} />
      </svg>

      <h2 className={css.titleRegistration}>Registration</h2>
      <p className={css.textRegistration}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>

      <div className={css.inputWrapper}>
        <input type="text" placeholder="Name" className={css.inputField} />
        <input type="mail" placeholder="Email" className={css.inputField} />
        <input
          type="Password"
          placeholder="Password"
          className={css.inputField}
        />
      </div>
      <button type="submit" className={css.btnSignIn}>
        Sign In
      </button>
    </div>
  )
}
