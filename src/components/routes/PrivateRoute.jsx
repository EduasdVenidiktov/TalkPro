import { useState, useEffect } from 'react'
import { HeartModal } from '../Modal/HeartModal/HeartModal'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import css from './PrivateRoute.module.css'

export function PrivateRoute({ children, onFavoriteAction }) {
  const isAuthenticated = !!localStorage.getItem('userToken') // Проверка авторизации
  const [showHeartModal, setShowHeartModal] = useState(false)

  // Используем useEffect для открытия модального окна только один раз
  useEffect(() => {
    if (!isAuthenticated && !showHeartModal) {
      setShowHeartModal(true) // Открытие модального окна при неавторизованном пользователе
    }
  }, [isAuthenticated])

  const handleModalClose = () => {
    // e.preventDefault()
    setShowHeartModal(false) // Закрытие модального окна
  }

  // Отображение модального окна, если не авторизован
  if (!isAuthenticated && showHeartModal) {
    return (
      <>
        <HomeHeader />
        <p className={css.textMessage}>
          This functionality is only available for authorized users.
        </p>
        <HeartModal
          isOpen={showHeartModal}
          onClose={handleModalClose} // Передаем функцию закрытия
          isAuthenticated={isAuthenticated}
          onFavoriteAction={onFavoriteAction}
        />
      </>
    )
  }

  return children
}

//===============================================================

// import { Navigate } from 'react-router-dom'

// export function PrivateRoute({ children, isAuthenticated }) {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />
//   }
//   return children
// }

//========================================================================
// import { Navigate } from 'react-router-dom'

// export function PrivateRoute({ children }) {
//   const isAuthenticated = !!localStorage.getItem('userToken') // Або інша логіка перевірки

//   console.log('Is authenticated:', isAuthenticated)

//   return isAuthenticated ? children : <Navigate to="/login" />
// }
//=========================================================================
// export function PrivateRoute({ children }) {
//   const isLoggedIn = !!localStorage.getItem('authToken') // Проверяем авторизацию
//   return isLoggedIn ? children : <Navigate to="/" />
// }
