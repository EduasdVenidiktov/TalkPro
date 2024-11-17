// // src/components/App.jsx
// import { Routes, Route, NavLink } from 'react-router-dom'
// import clsx from 'clsx'
// import { HomePage } from './pages/HomePage/HomePage'
// import { TeachersPage } from './pages/TeachersPage/TeachersPage'
// import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
// import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
// import css from './App.module.css'

// const buildLinkClass = ({ isActive }) => clsx(css.link, isActive && css.active)

// export default function App() {
//   return (
//     <div>
//       <nav className={css.nav}>
//         <NavLink to="/" className={buildLinkClass}>
//           Home
//         </NavLink>
//         <NavLink to="/teachers" className={buildLinkClass}>
//           Teachers
//         </NavLink>
//         <NavLink to="/favorite" className={buildLinkClass}>
//           Favorites
//         </NavLink>
//       </nav>

//       <Routes>
//         <Route path="/" element={<HomePage />} />
//         <Route path="/teachers" element={<TeachersPage />} />
//         <Route path="/favorite" element={<FavoritesPage />} />
//         <Route path="*" element={<NotFoundPage />} />
//       </Routes>
//     </div>
//   )
// }

import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
// import { HomePage } from './pages/HomePage/HomePage'
// import { TeachersPage } from './pages/TeachersPage/TeachersPage'
// import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
// import { TeacherDetail } from './pages/TeachersPage/TeacherDetail/TeacherDetail'
// import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { lazy, Suspense, useEffect } from 'react'
// import { PrivateRoute } from 'components/routes/PrivateRoute'
// import { useContext } from 'react'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const TeacherDetail = lazy(
  () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
)

export default function App() {
  // const { isAuthenticated } = useContext(AuthContext)

  const location = useLocation()

  useEffect(() => {
    // Устанавливаем класс для body в зависимости от маршрута
    if (location.pathname === '/') {
      document.body.className = 'main-page' // Для главной страницы
    } else if (location.pathname === '/teachers') {
      document.body.className = 'teacher-page' // Для TeachersPage
    } else {
      document.body.className = '' // Убираем класс для остальных страниц
    }
  }, [location.pathname])

  return (
    <div>
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/teachers" element={<TeachersPage />} />
          {/* <Route path=":id" element={<TeacherDetail />} />{' '} */}
          <Route path="/teachers/:id" element={<TeacherDetail />} />

          {/* <Route
          path="/favorites"
          element={
            <PrivateRoute isAuthenticated={isAuthenticated}>
              <FavoritesPage />
            </PrivateRoute>
          }
        /> */}
          <Route path="/favorite" element={<FavoritesPage />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
