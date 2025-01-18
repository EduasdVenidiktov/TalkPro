import { useState } from 'react'
import css from './LangSwitcher.module.css'
import { languages, customStyles } from '/src/data/options'
import Select from 'react-select'

export function LangSwitcher({ setFilters }) {
  const [selectedLanguage, setSelectedLanguage] = useState('')

  const handleLanguageChange = (selectedOption) => {
    setSelectedLanguage(selectedOption.value)
    setFilters((prevFilters) => ({
      ...prevFilters,
      language: selectedOption.value,
    }))
  }

  return (
    <div className={css.langSwitcherSection}>
      <label htmlFor="languages" className={css.textLabel}>
        Languages
      </label>
      <Select
        id="languages"
        value={
          selectedLanguage
            ? { value: selectedLanguage, label: selectedLanguage }
            : null
        }
        options={languages.map((lang) => ({ value: lang, label: lang }))}
        onChange={handleLanguageChange}
        styles={customStyles}
        placeholder="Select a language"
      />
    </div>
  )
}
