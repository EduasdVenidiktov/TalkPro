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
  const [backgroundColor, setBackgroundColor] = useState('#fff') // Состояние для фона
  const location = useLocation() // Получение текущего маршрута

  useEffect(() => {
    // Обновляем состояние фона в зависимости от маршрута
    if (location.pathname === '/') {
      setBackgroundColor('#fff') // Белый фон для HomePage
    } else {
      setBackgroundColor('#f8f8f8') // Серый фон для других страниц
    }
  }, [location]) // Срабатывает при изменении маршрута

  useEffect(() => {
    // Применяем стиль фона к body
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor]) // Срабатывает при изменении цвета в состоянии

  const login = (token) => {
    localStorage.setItem('userToken', token)
    setIsLoggedIn(true)
  }

  const logout = () => {
    localStorage.removeItem('userToken')
    setIsLoggedIn(false)
  }

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      <div key={isLoggedIn ? 'authenticated' : 'logOutStyle'}>
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

// import { Route, Routes } from 'react-router-dom'
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

//   useEffect(() => {
//     // Изменение фона body в зависимости от маршрута
//     document.body.style.backgroundColor =
//       location.pathname === '/' ? '#fff' : '#f8f8f8'
//   }, [location]) // Срабатывает при изменении маршрута

//   const login = (token) => {
//     localStorage.setItem('userToken', token)
//     setIsLoggedIn(true)
//   }

//   const logout = () => {
//     localStorage.removeItem('userToken')
//     setIsLoggedIn(false)
//   }
//   return (
//     <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
//       <div key={isLoggedIn ? 'authenticated' : 'logOutStyle'}>
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
