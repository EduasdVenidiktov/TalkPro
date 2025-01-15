import { useState, useEffect } from 'react'
import css from './LevelOfKnowledge.module.css'
import { levels } from '/src/data/options'

export function LevelOfKnowledge({ setFilters }) {
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
