import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import Loader from '/src/components/Loader/Loader'
// import { useAuth } from './AuthProvider'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
const FavoritesPage = lazy(() => import('./pages/FavoritesPage/FavoritesPage'))
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const TeacherDetail = lazy(
  () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
)

export default function App() {
  // const { isNewUser } = useAuth() // Достаем isNewUser из контекста

  const [backgroundColor, setBackgroundColor] = useState('#fff') // Состояние для фона
  const location = useLocation() // Получение текущего маршрута

  useEffect(() => {
    if (location.pathname === '/') {
      setBackgroundColor('#fff')
    } else {
      setBackgroundColor('#f8f8f8')
    }
  }, [location]) // Срабатывает при изменении маршрута

  useEffect(() => {
    // Применяем стиль фона к body
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor]) // Срабатывает при изменении цвета в состоянии

  return (
    <div>
      <Toaster />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route
            path="/teachers"
            // element={<TeachersPage isNewUser={isNewUser} />}
            element={<TeachersPage />}
          />
          <Route path="/teachers/:id" element={<TeacherDetail />} />
          {/* {!isNewUser && ( */}

          <Route
            path="/favorite"
            element={
              <PrivateRoute>
                <FavoritesPage />
              </PrivateRoute>
            }
          />
          {/* } */}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
