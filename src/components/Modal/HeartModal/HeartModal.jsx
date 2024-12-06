import { useState, useEffect } from 'react'
import close from '../../../assets/icons/sprite.svg'
import css from './HeartModal.module.css'
import { LogIn } from '../LogIn/LogIn'
import { Registration } from '../Registration/Registration'

export const HeartModal = ({
  isOpen,
  onClose = () => {},
  isAuthenticated,
  onFavoriteAction,
}) => {
  const [activeComponent, setActiveComponent] = useState(null)

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape') {
        setActiveComponent(null) // Возврат к выбору
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveComponent(null) // Возврат к выбору
      onClose()
    }
  }

  const handleClose = () => {
    setActiveComponent(null) // Возврат к выбору
    onClose()
  }

  if (isAuthenticated) {
    onFavoriteAction()
    return null
  }

  if (!isOpen) return null

  const renderComponent = () => {
    if (activeComponent === 'logIn') {
      return (
        <div className={css.contentWrapper}>
          <LogIn onClose={handleClose} />
        </div>
      )
    }

    if (activeComponent === 'register') {
      return (
        <div className={css.contentWrapper}>
          <Registration onClose={handleClose} />
        </div>
      )
    }

    return (
      <>
        <svg
          className={css.closeIcon}
          aria-label="close log in Icon"
          onClick={handleClose}
        >
          <use href={`${close}#x`} />
        </svg>
        <h2 className={css.titleText} id="modal-title">
          Доступно тільки для авторизованих користувачів
        </h2>
        <p id="modal-description">
          Будь ласка, увійдіть або зареєструйтеся, щоб скористатися цим
          функціоналом.
        </p>
        <div className={css.modalButtons}>
          <button
            className={css.modalButton}
            onClick={() => setActiveComponent('logIn')}
          >
            Увійти
          </button>
          <button
            className={css.modalButton}
            onClick={() => setActiveComponent('register')}
          >
            Зареєструватися
          </button>
        </div>
      </>
    )
  }

  return (
    <div
      className={css.backdrop}
      onClick={handleBackdropClick}
      role="dialog"
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <div className={css.modalSection} onClick={(e) => e.stopPropagation()}>
        {renderComponent()}
      </div>
    </div>
  )
}
