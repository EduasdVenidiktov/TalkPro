import css from './Home.module.css'
import { Header } from '../../components/Header/Header'
import { Info } from '../../components/Info/Info'
import { Image } from '../../components/Image/Image'
import { Stat } from '../../components/Stat/Stat'

export function Home() {
  return (
    <div className={css.container}>
      <Header />
      <div className={css.contentWrapper}>
        <Info />
        <Image />
      </div>
      <Stat />
    </div>
  )
}
