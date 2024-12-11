import { useState, useEffect } from 'react'
import css from './HomeHeader.module.css'
import ukraine from '../../../assets/icons/sprite.svg'
import logOut from '../../../assets/icons/sprite.svg'
import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
import { Link, useNavigate } from 'react-router-dom' // Імпорт Link для навігації

import toast from 'react-hot-toast'

export function HomeHeader() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  const [isAuthenticated, setIsAuthenticated] = useState(false)

  useEffect(() => {
    // Перевіряємо, чи є токен в localStorage
    const userToken = localStorage.getItem('userToken')
    setIsAuthenticated(!!userToken)
  })

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
    localStorage.removeItem('userToken') // Видаляємо токен
    localStorage.removeItem('filters') // Очищення вибраних фільтрів
    localStorage.removeItem('favorites') // Очищення вибраних сердечок
    sessionStorage.clear() // Очищення тимчасових даних
    setIsAuthenticated(false) // Оновлюємо стан аутентифікації
    toast.success('Buy, see you again!', {
      className: css.toastSuccess,
      duration: 1500, // Продолжительность в миллисекундах (5000 = 5 секунд)
    })
    navigate('/') // Перенаправлення на головну
  }

  const handleLogInSuccess = (user) => {
    // Сохраняем пользователя в localStorage
    localStorage.setItem('userToken', JSON.stringify(user))
    setIsAuthenticated(true) // Обновляем состояние аутентификации
  }

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
        {isAuthenticated && (
          <li>
            <Link to="/favorite" className={css.menuItem}>
              Favorite
            </Link>
          </li>
        )}
      </ul>

      <ul className={css.regAuthMenu}>
        {isAuthenticated ? (
          <li>
            <svg
              className={css.logOut}
              aria-label="Log Out Icon"
              onClick={handleLogOut}
            >
              <use href={`${logOut}#logOut`} />
            </svg>
          </li>
        ) : (
          <>
            <li>
              <h2 className={css.loginText} onClick={handleLogInClick}>
                Log in
              </h2>
            </li>
            <li>
              <button
                className={css.buttonReg}
                onClick={handleRegistrationClick}
              >
                Registration
              </button>
            </li>
          </>
        )}
      </ul>

      {/* Відкриваємо модальні вікна */}
      {isLogInOpen && (
        <div className={css.modalOverlay}>
          <LogIn onClose={closeModal} onLogInSuccess={handleLogInSuccess} />
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

// import { useState } from 'react'
// import css from './HomeHeader.module.css'
// import ukraine from '../../../assets/icons/sprite.svg'
// import logOut from '../../../assets/icons/sprite.svg'
// import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
// import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
// // import { Link, useNavigate } from 'react-router-dom' // Імпорт Link для навігації
// import { Link } from 'react-router-dom' // Імпорт Link для навігації

// import toast from 'react-hot-toast'
// export function HomeHeader() {
//   const [isLogInOpen, setIsLogInOpen] = useState(false)
//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

//   // const navigate = useNavigate()

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

//   const handleLogOut = () => {
//     localStorage.removeItem('userToken') // Видаляємо токен
//     localStorage.removeItem('filters') // Очищення вибраних фільтрів
//     localStorage.removeItem('favorites') // Очищення вибраних сердечок
//     sessionStorage.clear() // Очищення тимчасових даних
//     toast.success('Buy, see you again!', {
//       className: css.toastSuccess,
//       duration: 1500, // Продолжительность в миллисекундах (5000 = 5 секунд)
//     })
//     // navigate('/') // Перенаправлення на головну
//   }

//   // const handleLogOut = () => {
//   //   localStorage.removeItem('userToken') // Удаляем токен из localStorage
//   //   sessionStorage.clear() // Повністю очищаємо sessionStorage, якщо воно використовується лише для тимчасових даних
//   //   navigate('/') // Перенаправляем на главную
//   //   alert('Користувач вийшов')
//   // }

//   return (
//     <div className={css.headerBox}>
//       <div className={css.logoHeaderBox}>
//         <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
//           <use href={`${ukraine}#ukraine`} />
//         </svg>
//         <h2>
//           <Link to="/" className={css.logoName}>
//             LearnLingo
//           </Link>
//         </h2>
//       </div>

//       <ul className={css.headerMenu}>
//         <li>
//           <Link to="/" className={css.menuItem}>
//             Home
//           </Link>
//         </li>
//         <li>
//           <Link to="/teachers" className={css.menuItem}>
//             Teachers
//           </Link>
//         </li>
//         <li>
//           <Link to="/favorite" className={css.menuItem}>
//             Favorite
//           </Link>
//         </li>
//       </ul>

//       <ul className={css.regAuthMenu}>
//         <li>
//           <svg
//             className={css.logOut}
//             aria-label="Log In Icon"
//             onClick={handleLogOut}
//           >
//             <use href={`${logOut}#logOut`} />
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
