// import { NavLink } from 'react-router-dom'
// import css from './Navigation.module.css'
// import clsx from 'clsx'

// export const buildLinkClass = ({ isActive }) =>
//   clsx(css.link, isActive && css.active)

// export function Navigation({ isAuthenticated, hasFavorites, buildLinkClass }) {
//   return (
//     <nav className={css.navbar}>
//       <ul className={css.headerMenu}>
//         <li>
//           <NavLink to="/" end className={buildLinkClass}>
//             Home
//           </NavLink>
//         </li>
//         <li>
//           <NavLink to="/teachers" className={buildLinkClass}>
//             Teachers
//           </NavLink>
//         </li>
//         {isAuthenticated && hasFavorites && (
//           <li>
//             <NavLink to="/favorite" className={buildLinkClass}>
//               Favorite
//             </NavLink>
//           </li>
//         )}
//       </ul>
//     </nav>
//   )
// }
