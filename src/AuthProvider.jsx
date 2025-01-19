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
    if (!token || typeof token !== 'string') {
      console.error('Invalid custom token:', token)
      return
    }
    try {
      const userCredential = await signInWithCustomToken(auth, token)
      setUser(userCredential.user)

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
    }
  }

  const value = { user, loading, login, logout } // Передаємо user та loading

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export const useAuth = () => {
  return useContext(AuthContext)
}
