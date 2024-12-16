// import { Route, Routes, useLocation } from 'react-router-dom'
// // import css from '/src/App.module.css'
// import {
//   createContext,
//   lazy,
//   Suspense,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'
// import { PrivateRoute } from './components/routes/PrivateRoute'
// import { Toaster } from 'react-hot-toast'
// import Loader from '/src/components/Loader/Loader'

// const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
// const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
// const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'))
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
// const TeacherDetail = lazy(
//   () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
// )

// const AuthContext = createContext()

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('userToken')
//   )
//   const location = useLocation()

//   const login = () => {
//     localStorage.setItem('userToken', 'token_value')
//     setIsLoggedIn(true)
//   }

//   const logout = () => {
//     localStorage.removeItem('userToken')
//     setIsLoggedIn(false)
//   }

//   useEffect(() => {
//     // Управляем классами body на основе маршрута и статуса авторизации
//     let newClass = ''
//     if (location.pathname === '/') {
//       newClass = isLoggedIn ? 'main-page' : 'main-page-logged-out'
//     } else if (location.pathname === '/teachers') {
//       newClass = 'teacher-page'
//     } else {
//       newClass = '' // Для остальных страниц
//     }
//     document.body.className = newClass // Применяем новый класс
//   }, [location.pathname, isLoggedIn]) // Обновляем при изменении маршрута или статуса авторизации

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       <div>
//         <Toaster />

//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/teachers" element={<TeachersPage />} />
//             <Route path="/teachers/:id" element={<TeacherDetail />} />
//             <Route
//               path="/favorite"
//               element={
//                 <PrivateRoute>
//                   <FavoritesPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         </Suspense>
//       </div>
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }

import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import {
  createContext,
  lazy,
  Suspense,
  useContext,
  useEffect,
  useState,
} from 'react'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import Loader from '/src/components/Loader/Loader'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const TeacherDetail = lazy(
  () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
)

const AuthContext = createContext()

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(
    !!localStorage.getItem('userToken')
  )
  const [bodyClass, setBodyClass] = useState('') // Новое состояние для класса body

  const login = () => {
    localStorage.setItem('userToken', 'token_value')
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  const location = useLocation()

  useEffect(() => {
    // Определяем класс для body в зависимости от маршрута и авторизации
    let newClass = ''
    if (location.pathname === '/') {
      newClass = isLoggedIn ? 'main-page' : 'main-page-logged-out'
    } else if (location.pathname === '/teachers') {
      newClass = 'teacher-page'
    }
    setBodyClass(newClass) // Обновляем состояние
  }, [location.pathname, isLoggedIn])

  useEffect(() => {
    document.body.className = bodyClass // Применяем класс к body
  }, [bodyClass]) // Следим за изменением состояния bodyClass

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <div key={isLoggedIn ? 'authenticated' : 'logged-out'}>
        <Toaster />

        <Suspense fallback={<Loader />}>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/teachers" element={<TeachersPage />} />
            <Route path="/teachers/:id" element={<TeacherDetail />} />
            <Route
              path="/favorite"
              element={
                <PrivateRoute>
                  <FavoritesPage />
                </PrivateRoute>
              }
            />
            <Route path="*" element={<NotFoundPage />} />
          </Routes>
        </Suspense>
      </div>
    </AuthContext.Provider>
  )
}

export function useAuth() {
  return useContext(AuthContext)
}

// import { Route, Routes, useLocation } from 'react-router-dom'
// import './App.css'
// import {
//   createContext,
//   lazy,
//   Suspense,
//   useContext,
//   useEffect,
//   useState,
// } from 'react'
// import { PrivateRoute } from './components/routes/PrivateRoute'
// import { Toaster } from 'react-hot-toast' // Import Toaster
// import Loader from '/src/components/Loader/Loader'

// const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
// const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
// const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'))
// const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
// const TeacherDetail = lazy(
//   () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
// )

// const AuthContext = createContext()

// export default function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(
//     !!localStorage.getItem('userToken')
//   )

//   const login = () => {
//     localStorage.setItem('userToken', 'token_value')
//     setIsLoggedIn(true) // Оновлюємо стан авторизації
//   }

//   const logout = () => {
//     localStorage.removeItem('userToken')
//     setIsLoggedIn(false) // Оновлюємо стан авторизації
//   }

//   const location = useLocation()

//   useEffect(() => {
//     // Устанавливаем класс для body в зависимости от маршрута
//     if (location.pathname === '/') {
//       document.body.className = 'main-page' // Для главной страницы
//     } else if (location.pathname === '/teachers') {
//       document.body.className = 'teacher-page' // Для TeachersPage
//     } else {
//       document.body.className = '' // Убираем класс для остальных страниц
//     }
//   }, [location.pathname])

//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       <div>
//         <Toaster />

//         <Suspense fallback={<Loader />}>
//           <Routes>
//             <Route path="/" element={<HomePage />} />
//             <Route path="/teachers" element={<TeachersPage />} />
//             <Route path="/teachers/:id" element={<TeacherDetail />} />
//             <Route
//               path="/favorite"
//               element={
//                 <PrivateRoute>
//                   <FavoritesPage />
//                 </PrivateRoute>
//               }
//             />
//             <Route path="*" element={<NotFoundPage />} />
//           </Routes>
//         </Suspense>
//       </div>
//     </AuthContext.Provider>
//   )
// }

// export function useAuth() {
//   return useContext(AuthContext)
// }
