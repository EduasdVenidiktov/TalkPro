import { useState } from 'react'
import css from './LevelOfKnowledge.module.css'

export function LevelOfKnowledge({ setFilters }) {
  const [selectedLevel, setSelectedLevel] = useState('')
  const levels = [
    'A1 Beginner',
    'A2 Elementary',
    'B1 Intermediate',
    'B2 Upper-Intermediate',
  ]

  const handleLevelChange = (e) => {
    const level = e.target.value
    setSelectedLevel(level)
    setFilters((prevFilters) => ({ ...prevFilters, level }))
  }

  return (
    <div className={css.levelOfKnowledgeSection}>
      <label htmlFor="levelOfKnowledge" className={css.textLabel}>
        Level of Knowledge
      </label>
      <select
        id="levelOfKnowledge"
        value={selectedLevel}
        onChange={handleLevelChange}
        className={css.selectValue}
      >
        <option value="" disabled>
          Select a level
        </option>
        {levels.map((level, index) => (
          <option key={index} value={level}>
            {level}
          </option>
        ))}
      </select>
    </div>
  )
}
