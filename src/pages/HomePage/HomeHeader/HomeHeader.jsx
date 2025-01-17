import css from './HomeHeader.module.css'
import { Navigation } from '/src/components/Header/Navigation/Navigation'
import { LogoMenu } from '/src/components/Header/LogoMenu/LogoMenu'
import { RegMenu } from '/src/components/Header/RegMenu/RegMenu'

export function HomeHeader() {
  return (
    <div className={css.headerBox}>
      <LogoMenu />
      <Navigation />
      <RegMenu />
    </div>
  )
}
