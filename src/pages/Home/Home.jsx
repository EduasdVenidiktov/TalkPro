import css from './Home.module.css'
import { Header } from '../../components/Header/Header'
import { Info } from '../../components/Info/Info'
import { UserAvatar } from '../../components/UserAvatar/UserAvatar'
import { Stat } from '../../components/Stat/Stat'
import { LogIn } from '../../components/LogIn/LogIn'
import { Registration } from '../../components/Registration/Registration'

export function Home() {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.contentWrapper}>
        <Info />
        <UserAvatar />
      </div>
      <Stat />
      <LogIn />
      <Registration />
    </div>
  )
}
