import { LangSwitcher } from './LangSwitcher/LangSwitcher'
import { LevelOfKnowledge } from './LevelOfKnowledge/LevelOfKnowledge'
import { Price } from './Price/Price'
import css from './Filters.module.css'

export function Filters({ setFilters }) {
  return (
    <div className={css.filterSection}>
      <LangSwitcher setFilters={setFilters} />
      <LevelOfKnowledge setFilters={setFilters} />
      <Price setFilters={setFilters} />
    </div>
  )
}
