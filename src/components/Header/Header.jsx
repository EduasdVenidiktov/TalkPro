import { useState } from 'react'
import css from './Header.module.css'
import ukraine from '../../assets/icons/sprite.svg'
import logIn from '../../assets/icons/sprite.svg'
import { LogIn } from '../LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../Registration/Registration' // Імпортуємо компонент Registration

export function Header() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

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
          <svg
            className={css.logIn}
            aria-label="Log In Icon"
            onClick={handleLogInClick}
          >
            <use href={`${logIn}#logIn`} />
          </svg>
        </li>
        <li>
          <h2 className={css.loginText} onClick={handleLogInClick}>
            Log in
          </h2>
        </li>
        <li>
          <button className={css.buttonReg} onClick={handleRegistrationClick}>
            Registration
          </button>
        </li>
      </ul>

      {/* Відкриваємо модальні вікна */}
      {isLogInOpen && (
        <div className={css.modalOverlay}>
          <LogIn onClose={closeModal} />
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

// import css from './Header.module.css'
// import ukraine from '../../assets/icons/sprite.svg'
// import logIn from '../../assets/icons/sprite.svg'

// export function Header() {
//   return (
//     <div className={css.headerBox}>
//       <div className={css.logoHeaderBox}>
//         <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
//           <use href={`${ukraine}#ukraine`} />
//         </svg>
//         <h2>
//           <a href="" className={css.logoName}>
//             LearnLingo
//           </a>
//         </h2>
//       </div>

//       <ul className={css.headerMenu}>
//         <li>
//           <p src="../../pages/Home">Home</p>
//         </li>
//         <li>
//           <p src="../../pages/Teachers">Teachers</p>
//         </li>
//       </ul>

//       <ul className={css.regAuthMenu}>
//         <li>
//           <svg className={css.logIn} aria-label="Log In Icon">
//             <use href={`${logIn}#logIn`} />
//           </svg>
//         </li>
//         <li>
//           <h2 className={css.loginText}>Log in</h2>
//         </li>
//         <li>
//           <button className={css.buttonReg}>Registration</button>
//         </li>
//       </ul>
//     </div>
//   )
// }
