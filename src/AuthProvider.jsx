import { createContext, useContext, useState } from 'react'

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userToken')
  )

  // const [isNewUser, setIsNewUser] = useState(false)

  // const login = (token, newUser = false) => {
  const login = (token) => {
    localStorage.setItem('userToken', token)
    // setIsNewUser(newUser)

    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  return (
    // <AuthContext.Provider value={{ isLoggedIn, login, logout, isNewUser }}>
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
