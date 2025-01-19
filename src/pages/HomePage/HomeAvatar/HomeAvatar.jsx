import css from './HomeAvatar.module.css'
import LogOutAvatar from '/src/assets/icons/sprite.svg'
import Avatar from '/src/assets/Images/Avatar.png'
import Avatar2x from '/src/assets/Images/Avatar2x.png'
import { useAuth } from '/src/AuthProvider'
import clsx from 'clsx'

export function HomeAvatar() {
  const { user } = useAuth()
  const avatarClass = clsx(
    css.imageSection,
    user ? css.authenticated : css.logOutStyle
  )

  return (
    <div className={avatarClass}>
      <div className={css.imageWrapper}>
        {user ? (
          <img
            className={css.avatarStyle}
            src={Avatar}
            srcSet={`${Avatar} 1x, ${Avatar2x} 2x`}
            alt="avatar image"
          />
        ) : (
          <svg width="568" height="530">
            <use href={`${LogOutAvatar}#LogOutAvatar`} />
          </svg>
        )}
      </div>
    </div>
  )
}
