import { useState, useEffect } from 'react'
import { HeartModal } from '../Modal/HeartModal/HeartModal'
import { HomeHeader } from '/src/pages/HomePage/HomeHeader/HomeHeader'
import css from './PrivateRoute.module.css'

export function PrivateRoute({ children, onFavoriteAction }) {
  const isAuthenticated = !!localStorage.getItem('userToken')
  const [showHeartModal, setShowHeartModal] = useState(false)

  useEffect(() => {
    if (!isAuthenticated && !showHeartModal) {
      setShowHeartModal(true)
    }
  }, [isAuthenticated])

  const handleModalClose = () => {
    setShowHeartModal(false)
  }

  if (!isAuthenticated && showHeartModal) {
    return (
      <>
        <HomeHeader />
        <p className={css.textMessage}>
          This functionality is only available for authorized users.
        </p>
        <HeartModal
          isOpen={showHeartModal}
          onClose={handleModalClose}
          isAuthenticated={isAuthenticated}
          onFavoriteAction={onFavoriteAction}
        />
      </>
    )
  }

  return children
}
