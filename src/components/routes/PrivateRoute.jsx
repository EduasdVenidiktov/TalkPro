import { Navigate } from 'react-router-dom'

export function PrivateRoute({ children, isAuthenticated }) {
  return isAuthenticated ? children : <Navigate to="/login" />
}

// export function PrivateRoute({ children }) {
//   const isLoggedIn = !!localStorage.getItem('authToken') // Проверяем авторизацию
//   return isLoggedIn ? children : <Navigate to="/" />
// }
