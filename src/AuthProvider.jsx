import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userToken')
  )

  const [isNewUser, setIsNewUser] = useState(false)
  const [localId, setlocalId] = useState(null)

  // const login = (token, newUser = false) => {
  const login = (token, newUser = false, id) => {
    localStorage.setItem('userToken', token)
    setIsNewUser(newUser)
    setlocalId(id) // Устанавливаем уникальный идентификатор пользователя

    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setlocalId(null)

    setIsLoggedIn(false)
  }

  return (
    // <AuthContext.Provider value={{ isLoggedIn, login, logout, isNewUser }}>
    <AuthContext.Provider
      value={{ isLoggedIn, login, logout, isNewUser, localId }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
