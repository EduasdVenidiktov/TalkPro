import { useState, useEffect } from 'react'
import close from '/src/assets/icons/sprite.svg'
import css from './HeartModal.module.css'
import { LogIn } from '../LogIn/LogIn'
import { Registration } from '../Registration/Registration'
import { handleEscapeKey } from '/src/data/options'

export const HeartModal = ({
  isOpen,
  onClose = () => {},
  isAuthenticated,
  onFavoriteAction,
}) => {
  const [activeComponent, setActiveComponent] = useState(null)

  useEffect(() => {
    const handleEscape = handleEscapeKey(() => {
      setActiveComponent(null)
      onClose()
    })

    if (isOpen) {
      document.addEventListener('keydown', handleEscape)
    }

    return () => {
      document.removeEventListener('keydown', handleEscape)
    }
  }, [isOpen, onClose])

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      setActiveComponent(null)
      onClose()
    }
  }

  const handleClose = () => {
    setActiveComponent(null)
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
          Available only for authorized users
        </h2>
        <p id="modal-description">
          Please log in or register to use this functionality.
        </p>
        <div className={css.modalButtons}>
          <button
            className={css.modalButton}
            onClick={() => setActiveComponent('logIn')}
          >
            Log In
          </button>
          <button
            className={css.modalButton}
            onClick={() => setActiveComponent('register')}
          >
            Register
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
