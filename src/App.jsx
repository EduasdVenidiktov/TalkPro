import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { TeachersPage } from './pages/TeachersPage/TeachersPage'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />} />
        <Route path="/favorite" element={<FavoritesPage />} />

        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
