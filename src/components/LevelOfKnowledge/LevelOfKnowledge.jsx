import { useState } from 'react'
import css from './LevelOfKnowledge.module.css'

export function LevelOfKnowledge() {
  const [selectedLevel, setSelectedLevel] = useState('')
  const levels = [
    'A1 Beginner',
    'A2 Elementary',
    'B1 Intermediate',
    'B2 Upper-Intermediate',
  ]

  return (
    <div className={css.LevelOfKnowledgeSection}>
      <label htmlFor="levelOfKnowledge" className={css.textLabel}>
        Level of Knowledge
      </label>
      <select
        id="levelOfKnowledge"
        value={selectedLevel}
        onChange={(e) => setSelectedLevel(e.target.value)}
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
