import { useState, useEffect } from 'react'

import css from './RegMenu.module.css'
import logOutIcon from '../../../assets/icons/sprite.svg'
import { LogIn } from '../../../components/Modal/LogIn/LogIn' // Імпортуємо компонент LogIn
import { Registration } from '../../../components/Modal/Registration/Registration' // Імпортуємо компонент Registration
import toast from 'react-hot-toast'
import { useAuth } from '/src/AuthProvider'

import { db } from '/src/data/firebase.js' // Імпорт вашої конфігурації Firestore
import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore' // Імпорт потрібних методів
import { usePageStyles } from '/src/data/options'

export function RegMenu() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)

  const [hasFavoriteCards, setHasFavoriteCards] = useState(false)

  const { user, logout } = useAuth()

  const { isSpecialPage, isTeachersWithoutUser } = usePageStyles(user)

  const ulStyle = {
    paddingLeft: isSpecialPage
      ? '124px'
      : isTeachersWithoutUser
        ? '144px'
        : '104px',
  }

  const statClass = user ? css.authenticated : css.logOutStyle
  const logInClass = !user ? css.logOutText : ''

  const handleClick = () => {
    logout()
    handleLogOut()
  }

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
          toast.error('Error fetching favorites', {
            className: 'toastError',
            duration: 1500,
          })
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

    localStorage.removeItem('filters') // Очищення вибраних фільтрів
    sessionStorage.clear() // Очищення тимчасових даних

    setHasFavoriteCards(false) // Оновлюємо стан hasFavoriteCards, щоб хедер більше не відображав "Favorite"
    setIsLogInOpen(false)
    setIsRegistrationOpen(false)
  }

  const handleLogInSuccess = async (user) => {
    try {
      // Создаем ссылку на документ пользователя в Firestore
      const userDocRef = doc(db, 'users', user.uid)

      // Объект данных пользователя для сохранения в Firestore
      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
      }

      // Записываем данные пользователя в Firestore
      await setDoc(userDocRef, userData, { merge: true }) // Используем merge, чтобы не перезаписать существующие поля

      toast.success('You are successfully logged in!', {
        className: 'toastSuccess',
        duration: 1500,
      })
    } catch (error) {
      console.error('Error saving user data to Firestore:', error)
      toast.error('Error during log in. Please try again later.', {
        className: 'toastError',
        duration: 1500,
      })
    }
  }
  return (
    <div className={css.headerBox}>
      <ul className={css.regAuthMenu} style={ulStyle}>
        {user ? (
          <li>
            <svg
              className={css.logOut}
              aria-label="Log Out Icon"
              onClick={handleClick}
            >
              <use href={`${logOutIcon}#logOutIcon`} />
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
