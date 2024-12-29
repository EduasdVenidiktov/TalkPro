import { auth } from '/src/data/firebase.js'
import {
  onAuthStateChanged,
  signInWithCustomToken,
  signOut,
} from 'firebase/auth'
import { createContext, useContext, useEffect, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser)
      setLoading(false)
    })

    return () => unsubscribe() // Відписка від слухача
  }, [])

  const login = async (token) => {
    // Функція login

    if (!token || typeof token !== 'string') {
      console.error('Invalid custom token:', token)
      return
    }
    try {
      const userCredential = await signInWithCustomToken(auth, token)
      setUser(userCredential.user)
      console.log('Signed in user:', userCredential.user)

      // setUser(userCredential.user); // Встановлюємо користувача в стан
    } catch {
      // Тут можна додати обробку помилок
    }
  }

  const logout = async () => {
    // Функція logout
    try {
      await signOut(auth) // Використовуємо Firebase signOut
    } catch (error) {
      console.error('Error signing out:', error)
      // Тут можна додати обробку помилок, наприклад, toast.error
    }
  }

  const value = { user, loading, login, logout } // Передаємо user та loading

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}

// import { createContext, useContext, useState } from 'react'

// const AuthContext = createContext()

// export const AuthProvider = ({ children }) => {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('userToken')
//   )

//   const [isNewUser, setIsNewUser] = useState(false)
//   const [localId, setlocalId] = useState(null)

//   // const login = (token, newUser = false) => {
//   const login = (token, newUser = false, id) => {
//     localStorage.setItem('userToken', token)
//     setIsNewUser(newUser)
//     setlocalId(id) // Устанавливаем уникальный идентификатор пользователя

//     setIsLoggedIn(true)
//   }

// const logout = () => {
//   localStorage.removeItem('userToken')
//   setlocalId(null)

//   setIsLoggedIn(false)
// }

//   return (
//     // <AuthContext.Provider value={{ isLoggedIn, login, logout, isNewUser }}>
//     <AuthContext.Provider
//       value={{ isLoggedIn, login, logout, isNewUser, localId }}
//     >
//       {children}
//     </AuthContext.Provider>
//   )
// }

// export const useAuth = () => useContext(AuthContext)
