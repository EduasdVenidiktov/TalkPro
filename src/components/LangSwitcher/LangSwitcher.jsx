import { useState } from 'react'
import css from './LangSwitcher.module.css'

export function LangSwitcher() {
  const [selectedLanguage, setSelectedLanguage] = useState('')
  const languages = ['English', 'Spanish', 'French', 'German', 'Italian']

  return (
    <div className={css.langSwitcherSection}>
      <label htmlFor="languages" className={css.textLabel}>
        Languages
      </label>
      <select
        id="languages"
        value={selectedLanguage}
        onChange={(e) => setSelectedLanguage(e.target.value)}
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
