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

import { Route, Routes } from 'react-router-dom'
import './App.css'
import { HomePage } from './pages/HomePage/HomePage'
import { TeachersPage } from './pages/TeachersPage/TeachersPage'
import { FavoritesPage } from './pages/FavoritesPage/FavoritesPage'
import { NotFoundPage } from './pages/NotFoundPage/NotFoundPage'
import { TeacherDetail } from 'pages/TeachersPage/TeacherDetail/TeacherDetail'

export default function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/teachers" element={<TeachersPage />}>
          <Route path=":id" element={<TeacherDetail />} />{' '}
          {/* Вложенный маршрут */}
        </Route>
        <Route path="/favorite" element={<FavoritesPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </div>
  )
}
