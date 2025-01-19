import { useState, useEffect } from 'react'
import css from './RegMenu.module.css'
import logOutIcon from '/src/assets/icons/sprite.svg'
import { LogIn } from '/src/components/Modal/LogIn/LogIn'
import { Registration } from '/src/components/Modal/Registration/Registration'
import toast from 'react-hot-toast'
import { useAuth } from '/src/AuthProvider'

import { db } from '/src/data/firebase.js'
import { doc, setDoc, collection, query, onSnapshot } from 'firebase/firestore'
import { usePageStyles } from '/src/data/options'

export function RegMenu() {
  const [isLogInOpen, setIsLogInOpen] = useState(false)
  const [isRegistrationOpen, setIsRegistrationOpen] = useState(false)
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
      const favoritesCollection = collection(db, 'users', user.uid, 'favorites')
      const q = query(favoritesCollection)
      unsubscribe = onSnapshot(q)
    }
    return () => unsubscribe && unsubscribe()
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
      duration: 1500,
    })

    localStorage.removeItem('filters')
    sessionStorage.clear()
    setIsLogInOpen(false)
    setIsRegistrationOpen(false)
  }

  const handleLogInSuccess = async (user) => {
    try {
      const userDocRef = doc(db, 'users', user.uid)

      const userData = {
        uid: user.uid,
        email: user.email,
        displayName: user.displayName || null,
      }

      await setDoc(userDocRef, userData, { merge: true })

      toast.success('You are successfully logged in!', {
        className: 'toastSuccess',
        duration: 1500,
      })
    } catch {
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
