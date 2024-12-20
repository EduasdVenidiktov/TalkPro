import css from './HomePage.module.css'
import { HomeInfo } from './HomeInfo/HomeInfo'
import { HomeAvatar } from './HomeAvatar/HomeAvatar'
import { HomeStat } from './HomeStat/HomeStat'
import { HomeHeader } from './HomeHeader/HomeHeader'

export default function HomePage() {
  return (
    <div className={css.container}>
      <HomeHeader />
      <div className={css.contentWrapper}>
        <HomeInfo />
        <HomeAvatar />
      </div>
      <HomeStat />
    </div>
  )
}
