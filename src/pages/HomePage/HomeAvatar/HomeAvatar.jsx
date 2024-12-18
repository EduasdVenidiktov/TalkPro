import css from './HomeAvatar.module.css'
import LogOutAvatar from '/src/assets/icons/sprite.svg'
import Avatar from '../../../assets/Images/Avatar.png'
import Avatar2x from '../../../assets/Images/Avatar2x.png'
import { useAuth } from '../../../App'

export function HomeAvatar() {
  const { isLoggedIn } = useAuth()
  const logOutClass = isLoggedIn ? css.authenticated : css.logOutStyle

  return (
    <div className={`${css.imageSection} ${logOutClass}`}>
      <div className={css.imageWrapper}>
        {isLoggedIn ? (
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
