import { useState } from 'react'
import radioButton from '/src/assets/icons/sprite.svg'
import css from './ReasonBox.module.css'
import { options } from '/src/data/options'

export function ReasonBox() {
  const [reason, setReason] = useState('')

  const handleSizeChange = (evt) => {
    setReason(evt.target.value)
  }

  return (
    <div className={css.reasonBoxSection}>
      <h2 className={css.titleReasonBox}>
        What is your main reason for learning English?
      </h2>

      <div className={css.listReasonBox}>
        {options.map((option) => (
          <label
            key={option.value}
            className={`${css.reasonLabel} ${reason === option.value ? css.selected : ''}`}
          >
            <input
              type="radio"
              name="learningReason"
              value={option.value}
              checked={reason === option.value}
              onChange={handleSizeChange}
              className={css.hiddenRadioInput}
            />
            <span className={css.customRadio}>
              <svg className={css.radioIcon}>
                <use
                  href={`${radioButton}#${reason === option.value ? 'radioButton' : 'RadioButtonBefor'}`}
                />
              </svg>
            </span>
            {option.label}
          </label>
        ))}
      </div>
    </div>
  )
}
