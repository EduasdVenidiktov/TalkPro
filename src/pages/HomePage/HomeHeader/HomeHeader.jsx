import { useState } from 'react'
import css from './HomeHeader.module.css'
import ukraine from '../../../assets/icons/sprite.svg'
import logOut from '../../../assets/icons/sprite.svg'
import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
import { Link, useNavigate } from 'react-router-dom' // Імпорт Link для навігації

export function HomeHeader() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const navigate = useNavigate()

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

  const handleLogOut = () => {
    localStorage.clear() // Полностью очищаем localStorage
    sessionStorage.clear() // Полностью очищаем sessionStorage
    navigate('/') // Перенаправляем на главную
  }

  // const handleLogOut = () => {
  //   localStorage.removeItem('authToken') // Удаляем токен из localStorage
  //   sessionStorage.removeItem('authToken') // Также можно очистить sessionStorage
  //   navigate('/') // Перенаправляем на главную страницу
  // }

  return (
    <div className={css.headerBox}>
      <div className={css.logoHeaderBox}>
        <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
          <use href={`${ukraine}#ukraine`} />
        </svg>
        <h2>
          <Link to="/" className={css.logoName}>
            LearnLingo
          </Link>
        </h2>
      </div>

      <ul className={css.headerMenu}>
        <li>
          <Link to="/" className={css.menuItem}>
            Home
          </Link>
        </li>
        <li>
          <Link to="/teachers" className={css.menuItem}>
            Teachers
          </Link>
        </li>
        <li>
          <Link to="/favorite" className={css.menuItem}>
            Favorite
          </Link>
        </li>
      </ul>

      <ul className={css.regAuthMenu}>
        <li>
          <svg
            className={css.logOut}
            aria-label="Log In Icon"
            onClick={handleLogOut}
          >
            <use href={`${logOut}#logOut`} />
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

//==========================  2  ========================================

// import { useState } from 'react'
// import css from './Header.module.css'
// import ukraine from '../../assets/icons/sprite.svg'
// import logIn from '../../assets/icons/sprite.svg'
// import { LogIn } from '../Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
// import { Registration } from '../Modal/Registration/Registration' // Імпортуємо компонент Registration

// export function Header() {
//   const [isLogInOpen, setIsLogInOpen] = useState(false)
//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

//   const handleLogInClick = () => {
//     setIsLogInOpen(true)
//   }

//   const handleRegistrationClick = () => {
//     setIsRegistrationOpen(true)
//   }

//   const closeModal = () => {
//     setIsLogInOpen(false)
//     setIsRegistrationOpen(false)
//   }

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
//           <svg
//             className={css.logIn}
//             aria-label="Log In Icon"
//             onClick={handleLogInClick}
//           >
//             <use href={`${logIn}#logIn`} />
//           </svg>
//         </li>
//         <li>
//           <h2 className={css.loginText} onClick={handleLogInClick}>
//             Log in
//           </h2>
//         </li>
//         <li>
//           <button className={css.buttonReg} onClick={handleRegistrationClick}>
//             Registration
//           </button>
//         </li>
//       </ul>

//       {/* Відкриваємо модальні вікна */}
//       {isLogInOpen && (
//         <div className={css.modalOverlay}>
//           <LogIn onClose={closeModal} />
//         </div>
//       )}
//       {isRegistrationOpen && (
//         <div className={css.modalOverlay}>
//           <Registration onClose={closeModal} />
//         </div>
//       )}
//     </div>
//   )
// }

//=============================== 1 ==================================================
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
