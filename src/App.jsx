import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import Loader from '/src/components/Loader/Loader'
// import { getFavoriteCards, saveFavoriteCards } from './utils/utils'
import { useAuth } from './AuthProvider'
import { getFavoriteCards } from '/src/data/firebase.js'
import { handleToggleFavorite } from '/src/data/firebase.js'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
const FavoriteCardsPage = lazy(
  () => import('./pages/FavoriteCardsPage/FavoriteCardsPage')
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const TeacherDetail = lazy(
  () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
)

export default function App() {
  const { isLoggedIn, isNewUser, localId } = useAuth() // Контекст авторизации
  const [favoriteCards, setFavoriteCards] = useState([])

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

  // Загрузка данных при входе
  useEffect(() => {
    if (isLoggedIn && localId) {
      ;(async () => {
        try {
          const cards = await getFavoriteCards(localId)
          setFavoriteCards(cards || [])
        } catch (error) {
          console.error('Ошибка при загрузке карточек:', error)
        }
      })()
    }
  }, [isLoggedIn, localId])

  useEffect(() => {
    const rootElement = document.getElementById('root')
    if (!rootElement) return

    if (location.pathname === '/') {
      rootElement.classList.add('homepage')
      rootElement.classList.remove('otherpages')
    } else {
      rootElement.classList.add('otherpages')
      rootElement.classList.remove('homepage')
    }
  }, [location])

  return (
    <div>
      <Toaster />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={
              <HomePage
                favoriteCards={favoriteCards}
                onToggleFavorite={handleToggleFavorite} // Передаём функцию как пропс
              />
            }
          />
          <Route
            path="/teachers"
            element={<TeachersPage isNewUser={isNewUser} />}
          />
          <Route path="/teachers/:id" element={<TeacherDetail />} />
          {!isNewUser && (
            <Route
              path="/favorite"
              element={
                <PrivateRoute>
                  <FavoriteCardsPage
                    favoriteCards={favoriteCards}
                    onToggleFavorite={handleToggleFavorite} // Передаём функцию как пропс
                  />
                </PrivateRoute>
              }
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
