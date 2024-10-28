import css from './HomePage.module.css'
import { Header } from '../../components/Header/Header'
import { Info } from '../../components/HomeInfo/HomeInfo'
import { UserAvatar } from '../../components/HomeAvatar/HomeAvatar'
import { Stat } from '../../components/Stat/Stat'
// import { Filters } from '../../components/Filters/Filters'

export function HomePage() {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.contentWrapper}>
        <Info />
        <UserAvatar />
      </div>
      <Stat />

      {/* <Filters /> */}
    </div>
  )
}
