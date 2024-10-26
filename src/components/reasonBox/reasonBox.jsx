import { useState } from 'react'
import radioButton from '../../assets/icons/sprite.svg'
import css from './reasonBox.module.css'

const options = [
  { value: 'career', label: 'Career and business' },
  { value: 'kids', label: 'Lessons for kids' },
  { value: 'abroad', label: 'Living abroad' },
  { value: 'exams', label: 'Exams and coursework' },
  { value: 'culture', label: 'Culture, travel, or hobby' },
]

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

// import { useState } from 'react'
// import radioButton from '../../assets/icons/sprite.svg'

// import css from './reasonBox.module.css'

// export function ReasonBox() {
//   const [reason, setReason] = useState('')

//   const handleSizeChange = (evt) => {
//     setReason(evt.target.value)
//   }

//   return (
//     <div className={css.reasonBoxSection}>
//       <h2 className={css.titleReasonBox}>
//         What is your main reason for learning English?
//       </h2>

//       <div className={css.listReasonBox}>
//         <label className={reason === 'career' ? css.selected : ''}>
//           <input
//             type="radio"
//             name="learningReason"
//             value="career"
//             checked={reason === 'career'}
//             onChange={handleSizeChange}
//             className={`${css.reasonElement} ${
//               reason === 'career' ? css.selectedIcon : ''
//             }`}
//           />
//           Career and business
//         </label>
//         <label className={reason === 'kids' ? css.selected : ''}>
//           <input
//             type="radio"
//             name="learningReason"
//             value="kids"
//             checked={reason === 'kids'}
//             onChange={handleSizeChange}
//             className={`${css.reasonElement} ${
//               reason === 'kids' ? css.selectedIcon : ''
//             }`}
//           />
//           Lessons for kids
//         </label>
//         <label className={reason === 'abroad' ? css.selected : ''}>
//           <input
//             type="radio"
//             name="learningReason"
//             value="abroad"
//             checked={reason === 'abroad'}
//             onChange={handleSizeChange}
//             className={`${css.reasonElement} ${
//               reason === 'abroad' ? css.selectedIcon : ''
//             }`}
//           />
//           Living abroad
//         </label>
//         <label className={reason === 'exams' ? css.selected : ''}>
//           <input
//             type="radio"
//             name="learningReason"
//             value="exams"
//             checked={reason === 'exams'}
//             onChange={handleSizeChange}
//             className={`${css.reasonElement} ${
//               reason === 'exams' ? css.selectedIcon : ''
//             }`}
//           />
//           Exams and coursework
//         </label>
//         <label className={reason === 'culture' ? css.selected : ''}>
//           <input
//             type="radio"
//             name="learningReason"
//             value="culture"
//             checked={reason === 'culture'}
//             onChange={handleSizeChange}
//             className={`${css.reasonElement} ${
//               reason === 'culture' ? css.selectedIcon : ''
//             }`}
//           />
//           Culture, travel, or hobby
//         </label>
//       </div>
//       <svg className={css.logoImg} aria-label="Logo Ukraine Icon">
//         <use href={`${radioButton}#radioButton`} />
//       </svg>
//     </div>
//   )
// }
