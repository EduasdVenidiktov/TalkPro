// import css from './HomeAvatar.module.css'
// import Avatar from '../../../assets/Images/Avatar.png'
// import Avatar2x from '../../../assets/Images/Avatar-2x.png'
// import GuestAvatar from '../../../assets/Images/Guest.png'
// import GuestAvatar2x from '../../../assets/Images/GuestAvatar2x.png'

// import Mac from '../../../assets/Images/Mac.png'
// import Mac2x from '../../../assets/Images/Mac-2x.png'

// export function HomeAvatar({ isAuthenticated }) {
//   // Визначаємо аватарку та аватарку для високої чіткості в залежності від статусу авторизації
//   const avatar = isAuthenticated ? Avatar : GuestAvatar
//   const avatar2x = isAuthenticated ? Avatar2x : GuestAvatar2x

//   // Визначаємо класи для стилів залежно від статусу авторизації
//   const avatarClass = isAuthenticated ? css.avatarStyle : css.guestStyle
//   const macClass = isAuthenticated ? css.macStyle : ''

//   return (
//     <div className={css.imageSection}>
//       <div className={css.imageWrapper}>
//         {isAuthenticated ? (
//           // Якщо користувач авторизований, відображаємо аватарку та логотип
//           <div>
//             <img
//               className={avatarClass}
//               src={avatar}
//               srcSet={`${avatar} 1x, ${avatar2x} 2x`}
//               alt="avatar image"
//             />
//             <img
//               className={macClass}
//               src={Mac}
//               srcSet={`${Mac} 1x, ${Mac2x} 2x`}
//               alt="apple logo"
//             />
//           </div>
//         ) : (
//           // Якщо користувач не авторизований, відображаємо лише гостьову аватарку
//           <img
//             className={avatarClass}
//             src={avatar}
//             srcSet={`${avatar} 1x, ${avatar2x} 2x`}
//             alt="guest avatar"
//           />
//         )}
//       </div>
//     </div>
//   )
// }

import css from './HomeAvatar.module.css'
import GuestAvatar from '../../../assets/Images/GuestAvatar.png'
import GuestAvatar2x from '../../../assets/Images/GuestAvatar2x.png'
import Avatar from '../../../assets/Images/Avatar.png'
import Avatar2x from '../../../assets/Images/Avatar2x.png'

import Mac from '../../../assets/Images/Mac.png'
import Mac2x from '../../../assets/Images/Mac-2x.png'
import { useAuth } from '../../../App'

export function HomeAvatar() {
  const { isLoggedIn } = useAuth()
  const logOutClass = isLoggedIn ? css.authenticated : css.logOutStyle

  return (
    <div className={`${css.imageSection} ${logOutClass}`}>
      <div className={css.imageWrapper}>
        <img
          className={css.avatarStyle}
          src={Avatar}
          srcSet={`${Avatar} 1x, ${Avatar2x} 2x`}
          alt="avatar image"
        />
        {isLoggedIn ? (
          <img
            className={css.macStyle}
            src={Mac}
            srcSet={`${Mac} 1x, ${Mac2x} 2x`}
            alt="apple logo"
          />
        ) : (
          <img
            className={css.guestAvatarStyle}
            src={GuestAvatar}
            srcSet={`${GuestAvatar} 1x, ${GuestAvatar2x} 2x`}
            alt="GuestAvatar image"
          />
        )}
      </div>
    </div>
  )
}
