import { useState, useEffect } from 'react'
import css from './LevelOfKnowledge.module.css'
import { levels, customStyles } from '/src/data/options'
import Select from 'react-select'

export function LevelOfKnowledge({ setFilters }) {
  const [selectedLevel, setSelectedLevel] = useState(null)

  useEffect(() => {
    const savedLevel = localStorage.getItem('selectedLevel')
    if (savedLevel) {
      setSelectedLevel(savedLevel)
    } else {
      setSelectedLevel(levels[0])
    }
  }, [])

  useEffect(() => {
    if (selectedLevel) {
      localStorage.setItem('selectedLevel', selectedLevel)
      setFilters((prevFilters) => ({ ...prevFilters, level: selectedLevel }))
    }
  }, [selectedLevel, setFilters])

  const handleLevelChange = (selectedOption) => {
    setSelectedLevel(selectedOption.value)
    setFilters((prevFilters) => ({
      ...prevFilters,
      level: selectedOption.value,
    }))
  }

  return (
    <div className={css.levelOfKnowledgeSection}>
      <label htmlFor="levelOfKnowledge" className={css.textLabel}>
        Level of Knowledge
      </label>
      <Select
        id="levelOfKnowledge"
        value={
          selectedLevel ? { value: selectedLevel, label: selectedLevel } : null
        }
        options={levels.map((level) => ({ value: level, label: level }))}
        onChange={handleLevelChange}
        styles={customStyles}
        getOptionLabel={(option) => option.label}
      />
    </div>
  )
}
