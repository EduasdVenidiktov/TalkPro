import css from './Registration.module.css'

export function Registration() {
  return (
    <div className={css.registrationSection}>
      <button type="button">
        <svg className={css.close} aria-label="close log in Icon">
          <use href={`${close}#close`} />
        </svg>
      </button>

      <h2 className={css.titleRegistration}>Registration</h2>
      <p className={css.textRegistration}>
        Thank you for your interest in our platform! In order to register, we
        need some information. Please provide us with the following information
      </p>
      <ul className={css.listRegistration}>
        <li className={css.itemRegistration}>
          <input type="text" placeholder="Name" />
        </li>
        <li className={css.itemRegistration}>
          <input type="mail" placeholder="Email" />
        </li>
        <li className={css.itemRegistration}>
          <input type="Password" placeholder="Password" />
        </li>
      </ul>
      <button type="submit" className={css.btnSignIn}>
        Sign In
      </button>
    </div>
  )
}
