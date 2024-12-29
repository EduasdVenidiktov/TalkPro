import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { PrivateRoute } from './components/routes/PrivateRoute'
import { Toaster } from 'react-hot-toast'
import Loader from '/src/components/Loader/Loader'
// import { getFavoriteCards, saveFavoriteCards } from './utils/utils'
import { useAuth } from './AuthProvider'
import { addFavoriteCard, getFavoriteCards } from '/src/data/firebase.js'

const HomePage = lazy(() => import('./pages/HomePage/HomePage'))
const TeachersPage = lazy(() => import('./pages/TeachersPage/TeachersPage'))
const FavoriteCardsPage = lazy(
  () => import('./pages/FavoritesPage/FavoriteCardsPage')
)
const NotFoundPage = lazy(() => import('./pages/NotFoundPage/NotFoundPage'))
const TeacherDetail = lazy(
  () => import('./pages/TeachersPage/TeacherDetail/TeacherDetail')
)

export default function App() {
  const { isLoggedIn, isNewUser, localId } = useAuth() // Контекст авторизации.Достаем isNewUser из контекста
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

  // Сохранение данных
  const handleSaveFavoriteCards = async (newFavoriteCards) => {
    if (!localId) return
    setFavoriteCards(newFavoriteCards)
    try {
      await addFavoriteCard(localId, newFavoriteCards)
    } catch (error) {
      console.error('Ошибка при сохранении карточек:', error)
    }
  }
  return (
    <div>
      <Toaster />

      <Suspense fallback={<Loader />}>
        <Routes>
          <Route
            path="/"
            element={<HomePage favoriteCards={favoriteCards} />}
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
                    onSaveFavoriteCards={handleSaveFavoriteCards}
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
