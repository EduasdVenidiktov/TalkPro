import css from './UserAvatar.module.css'
import Avatar from '../../assets/Images/Avatar.png'
import Avatar2x from '../../assets/Images/Avatar-2x.png'
import Mac from '../../assets/Images/Mac.png'
import Mac2x from '../../assets/Images/Mac-2x.png'

export function UserAvatar() {
  return (
    <div className={css.imageSection}>
      <div className={css.imageWrapper}>
        <img
          className={css.avatarStyle}
          src={Avatar}
          srcSet={`${Avatar} 1x, ${Avatar2x} 2x`}
          alt="avatar image"
        />
        <img
          className={css.macStyle}
          src={Mac}
          srcSet={`${Mac} 1x, ${Mac2x} 2x`}
          alt="apple logo"
        />
      </div>
    </div>
  )
}
