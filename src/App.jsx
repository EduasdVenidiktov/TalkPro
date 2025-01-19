import { Route, Routes, useLocation } from 'react-router-dom'
import './App.css'
import { lazy, Suspense, useEffect, useState } from 'react'
import { Toaster } from 'react-hot-toast'
import Loader from '/src/components/Loader/Loader'
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
  const { isLoggedIn, isNewUser, localId } = useAuth()
  const [favoriteCards, setFavoriteCards] = useState([])

  const [backgroundColor, setBackgroundColor] = useState('#fff')
  const location = useLocation()

  useEffect(() => {
    if (location.pathname === '/') {
      setBackgroundColor('#fff')
    } else {
      setBackgroundColor('#f8f8f8')
    }
  }, [location])

  useEffect(() => {
    document.body.style.backgroundColor = backgroundColor
  }, [backgroundColor])

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
                onToggleFavorite={handleToggleFavorite}
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
                <FavoriteCardsPage
                  favoriteCards={favoriteCards}
                  onToggleFavorite={handleToggleFavorite}
                />
              }
            />
          )}
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  )
}
