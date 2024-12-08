// import { Navigate } from 'react-router-dom'

// export function PrivateRoute({ children, isAuthenticated }) {
//   if (!isAuthenticated) {
//     return <Navigate to="/login" />
//   }
//   return children
// }

//========================================================================
import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children }) {
  const isAuthenticated = !!localStorage.getItem('userToken') // Або інша логіка перевірки

  console.log('Is authenticated:', isAuthenticated)

  return isAuthenticated ? children : <Navigate to="/login" />
}
//=========================================================================
// export function PrivateRoute({ children }) {
//   const isLoggedIn = !!localStorage.getItem('authToken') // Проверяем авторизацию
//   return isLoggedIn ? children : <Navigate to="/" />
// }
