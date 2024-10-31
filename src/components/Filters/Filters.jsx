import { LangSwitcher } from './LangSwitcher/LangSwitcher'
import { LevelOfKnowledge } from './LevelOfKnowledge/LevelOfKnowledge'
import { Price } from './Price/Price'
import css from './Filters.module.css'

export function Filters() {
  return (
    <div className={css.filterSection}>
      <LangSwitcher />
      <LevelOfKnowledge />
      <Price />
    </div>
  )
}
