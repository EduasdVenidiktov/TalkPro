import { useState, useEffect } from 'react'
import css from './LevelOfKnowledge.module.css'

export function LevelOfKnowledge({ setFilters }) {
  const levels = [
    'A1 Beginner',
    'A2 Elementary',
    'B1 Intermediate',
    'B2 Upper-Intermediate',
    'C1 Advanced',
    'C2 Proficient',
  ]

  // State for the selected level
  const [selectedLevel, setSelectedLevel] = useState(null)

  // Load state from localStorage on component mount
  useEffect(() => {
    const savedLevel = localStorage.getItem('selectedLevel')
    if (savedLevel) {
      setSelectedLevel(savedLevel)
    } else {
      setSelectedLevel(levels[0]) // Default to the first level if no saved level
    }
  }, [])

  // Save level to localStorage when it changes
  useEffect(() => {
    if (selectedLevel) {
      localStorage.setItem('selectedLevel', selectedLevel)
      setFilters((prevFilters) => ({ ...prevFilters, level: selectedLevel }))
    }
  }, [selectedLevel, setFilters])

  const handleLevelChange = (e) => {
    const level = e.target.value
    setSelectedLevel(level)
  }

  return (
    <div className={css.levelOfKnowledgeSection}>
      <label htmlFor="levelOfKnowledge" className={css.textLabel}>
        Level of Knowledge
      </label>
      <select
        id="levelOfKnowledge"
        value={selectedLevel || ''}
        onChange={handleLevelChange}
        className={css.selectValue}
      >
        {levels.map((level, index) => (
          <option
            key={index}
            value={level}
            className={level === selectedLevel ? css.selectedLevel : ''}
          >
            {level}
          </option>
        ))}
      </select>
    </div>
  )
}
