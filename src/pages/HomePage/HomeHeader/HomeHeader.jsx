import { useState, useEffect } from 'react'
import clsx from 'clsx'

import css from './HomeHeader.module.css'
import ukraine from '../../../assets/icons/sprite.svg'
import logOut from '../../../assets/icons/sprite.svg'
import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
import { Link, NavLink, useNavigate } from 'react-router-dom' // Імпорт Link для навігації
import toast from 'react-hot-toast'
import { useAuth } from '/src/AuthProvider'

import { db } from '/src/data/firebase.js' // Імпорт вашої конфігурації Firestore
import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore' // Імпорт потрібних методів

export function HomeHeader() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
  // const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [hasFavoriteCards, setHasFavoriteCards] = useState(false)
  const navigate = useNavigate()
  // const { isLoggedIn, logout, isNewUser } = useAuth()
  // const { isLoggedIn, user, loading, logout } = useAuth()
  const { user, logout } = useAuth()

  const statClass = user ? css.authenticated : css.logOutStyle
  const logInClass = !user ? css.logOutText : ''

  const handleClick = () => {
    logout()
    handleLogOut()
  }

  const buildLinkClass = ({ isActive }) =>
    clsx(css.link, isActive && css.active)

  useEffect(() => {
    let unsubscribe

    if (user) {
      const favoritesCollection = collection(db, 'users', user.uid, 'favorites') // Шлях до колекції favorites
      const q = query(favoritesCollection) // Запит без додаткових умов поки що

      unsubscribe = onSnapshot(
        q,
        (snapshot) => {
          setHasFavoriteCards(snapshot.size > 0) // Перевіряємо кількість документів в снапшоті
        },
        (error) => {
          console.error('Error fetching favorites:', error)
          toast.error('Error fetching favorites')
        }
      )
    } else {
      setHasFavoriteCards(false)
    }

    return () => {
      if (unsubscribe) {
        unsubscribe() // Відписка від слухача при розмонтуванні компонента або зміні user
      }
    }
  }, [user])

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
    toast.error('Buy, see you again!', {
      className: 'toastError',
      duration: 1500, // Продолжительность в миллисекундах (5000 = 5 секунд)
    })

    // localStorage.removeItem('userToken') // Видаляємо токен
    localStorage.removeItem('filters') // Очищення вибраних фільтрів
    // localStorage.removeItem('favoritecards') // Очищення вибраних сердечок
    sessionStorage.clear() // Очищення тимчасових даних

    // setIsAuthenticated(false) // Оновлюємо стан аутентифікації
    setHasFavoriteCards(false) // Оновлюємо стан hasFavoriteCards, щоб хедер більше не відображав "Favorite"
    setIsLogInOpen(false)
    setIsRegistrationOpen(false)

    // navigate('/') // Перенаправлення на головну
  }

  const handleLogInSuccess = async (user) => {
    try {
      // Создаем ссылку на документ пользователя в Firestore
      const userDocRef = doc(db, 'users', user.uid)

      // Объект данных пользователя для сохранения в Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null, // Если есть имя пользователя
        // ... другие данные пользователя ...
      }

      // Записываем данные пользователя в Firestore
      await setDoc(userDocRef, userData, { merge: true }) // Используем merge, чтобы не перезаписать существующие поля

      toast.success('You are successfully logged in!')
    } catch (error) {
      console.error('Error saving user data to Firestore:', error)
      toast.error('Error during log in. Please try again later.')
    }
  }

  return (
    <div className={css.headerBox}>
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
      <nav className={css.navigator}>
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
          {/* {isAuthenticated && hasFavoriteCards && !isNewUser && ( */}
          {/* {user && hasFavoriteCards && ( */}
          {user && (
            <li>
              <NavLink to="/favorite" className={buildLinkClass}>
                Favorite
              </NavLink>
            </li>
          )}
        </ul>
      </nav>

      <ul className={css.regAuthMenu}>
        {user ? (
          <li>
            <svg
              className={css.logOut}
              aria-label="Log Out Icon"
              onClick={handleClick}
            >
              <use href={`${logOut}#logOut`} />
            </svg>
          </li>
        ) : (
          <>
            <li>
              <h2
                className={`${css.loginText} ${logInClass}`}
                onClick={handleLogInClick}
              >
                Log in
              </h2>
            </li>
            <li>
              <button
                className={`${css.buttonReg} ${statClass}`}
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

// import { useState, useEffect } from 'react'
// import clsx from 'clsx'

// import css from './HomeHeader.module.css'
// import ukraine from '../../../assets/icons/sprite.svg'
// import logOut from '../../../assets/icons/sprite.svg'
// import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
// import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
// import { Link, NavLink, useNavigate } from 'react-router-dom' // Імпорт Link для навігації
// import toast from 'react-hot-toast'
// import { useAuth } from '/src/AuthProvider'

// export function HomeHeader() {
//   const [isLogInOpen, setIsLogInOpen] = useState(false)
//   const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
//   // const [isAuthenticated, setIsAuthenticated] = useState(false)
//   const [hasFavoriteCards, setHasFavoriteCards] = useState(false)
//   const navigate = useNavigate()
//   // const { isLoggedIn, logout, isNewUser } = useAuth()
//   // const { isLoggedIn, user, loading, logout } = useAuth()
//   const { user, logout } = useAuth()

//   const statClass = user ? css.authenticated : css.logOutStyle
//   const logInClass = !user ? css.logOutText : ''

//   const handleClick = () => {
//     logout()
//     handleLogOut()
//   }

//   const buildLinkClass = ({ isActive }) =>
//     clsx(css.link, isActive && css.active)

//   useEffect(() => {
//     // // Перевіряємо, чи є токен в localStorage
//     // const userToken = localStorage.getItem('userToken')
//     // setIsAuthenticated(!!userToken)

//     const favoriteCards =
//       JSON.parse(localStorage.getItem('favoriteCards')) || []
//     setHasFavoriteCards(favoriteCards.length > 0) // Оновлюємо стан
//   })

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
//     toast.error('Buy, see you again!', {
//       className: 'toastError',
//       duration: 1500, // Продолжительность в миллисекундах (5000 = 5 секунд)
//     })

//     // localStorage.removeItem('userToken') // Видаляємо токен
//     localStorage.removeItem('filters') // Очищення вибраних фільтрів
//     // localStorage.removeItem('favoritecards') // Очищення вибраних сердечок
//     sessionStorage.clear() // Очищення тимчасових даних

//     // setIsAuthenticated(false) // Оновлюємо стан аутентифікації
//     setHasFavoriteCards(false) // Оновлюємо стан hasFavoriteCards, щоб хедер більше не відображав "Favorite"
//     setIsLogInOpen(false)
//     setIsRegistrationOpen(false)

//     navigate('/') // Перенаправлення на головну
//   }

//   const handleLogInSuccess = (user) => {
//     // Сохраняем пользователя в localStorage
//     localStorage.setItem('userToken', JSON.stringify(user))
//     // setIsAuthenticated(true) // Обновляем состояние аутентификации
//   }

//   return (
//     <div className={css.headerBox}>
//       <div className={css.logoHeaderBox}>
//         {user ? (
//           <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
//             <use href={`${ukraine}#ukraine`} />
//           </svg>
//         ) : (
//           <div className={css.grayCircle}></div>
//         )}
//         <h2>
//           <Link to="/" className={css.logoName}>
//             LearnLingo
//           </Link>
//         </h2>
//       </div>
//       <nav className={css.navigator}>
//         <ul className={css.headerMenu}>
//           <li>
//             <NavLink to="/" end className={buildLinkClass}>
//               Home
//             </NavLink>
//           </li>
//           <li>
//             <NavLink to="/teachers" className={buildLinkClass}>
//               Teachers
//             </NavLink>
//           </li>
//           {/* {isAuthenticated && hasFavoriteCards && !isNewUser && ( */}
//           {user && hasFavoriteCards && (
//             <li>
//               <NavLink to="/favorite" className={buildLinkClass}>
//                 Favorite
//               </NavLink>
//             </li>
//           )}
//         </ul>
//       </nav>

//       <ul className={css.regAuthMenu}>
//         {user ? (
//           <li>
//             <svg
//               className={css.logOut}
//               aria-label="Log Out Icon"
//               onClick={handleClick}
//             >
//               <use href={`${logOut}#logOut`} />
//             </svg>
//           </li>
//         ) : (
//           <>
//             <li>
//               <h2
//                 className={`${css.loginText} ${logInClass}`}
//                 onClick={handleLogInClick}
//               >
//                 Log in
//               </h2>
//             </li>
//             <li>
//               <button
//                 className={`${css.buttonReg} ${statClass}`}
//                 onClick={handleRegistrationClick}
//               >
//                 Registration
//               </button>
//             </li>
//           </>
//         )}
//       </ul>

//       {/* Відкриваємо модальні вікна */}
//       {isLogInOpen && (
//         <div className={css.modalOverlay}>
//           <LogIn onClose={closeModal} onLogInSuccess={handleLogInSuccess} />
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
