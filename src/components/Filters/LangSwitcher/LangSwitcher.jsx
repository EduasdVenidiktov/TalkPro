import { useState } from 'react'
import css from './LangSwitcher.module.css'

export function LangSwitcher({ setFilters }) {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const languages = [
    'English',
    'French',
    'German',
    'Italian',
    'Korean',
    'Mandarin Chinese',
    'Spanish',
    'Vietnamese',
  ]

  const handleLanguageChange = (e) => {
    const language = e.target.value
    setSelectedLanguage(language)
    setFilters((prevFilters) => ({ ...prevFilters, language }))
  }

  return (
    <div className={css.langSwitcherSection}>
      <label htmlFor="languages" className={css.textLabel}>
        Languages
      </label>
      <select
        id="languages"
        value={selectedLanguage}
        onChange={handleLanguageChange}
        className={css.selectValue}
      >
        <option value="" disabled>
          Select a language
        </option>
        {languages.map((language, index) => (
          <option key={index} value={language}>
            {language}
          </option>
        ))}
      </select>
    </div>
  )
}
