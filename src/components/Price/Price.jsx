import { useState } from 'react'
import Select from 'react-select'
import css from './Price.module.css'

const customComponents = {
  IndicatorSeparator: () => null, // Убираем разделитель
  Indicator: () => null, // Убираем индикатор
}

export function Price() {
  const [selectedPrice, setSelectedPrice] = useState(null)

  const prices = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
  ]

  const handleChange = (selectedOption) => {
    setSelectedPrice({
      ...selectedOption,
      label: `${selectedOption.value} $`,
    })
  }

  return (
    <div className={css.priceSection}>
      <label htmlFor="price" className={css.textLabel}>
        Price
      </label>
      <Select
        id="price"
        value={selectedPrice}
        onChange={handleChange}
        options={prices}
        className={css.select}
        placeholder="Select a price"
        components={customComponents} // Используем кастомные компоненты
      />
    </div>
  )
}

//==============================================rferferv==============
// import { useState } from 'react'
// import Select from 'react-select'
// import css from './Price.module.css'

// export function Price() {
//   const [selectedPrice, setSelectedPrice] = useState(null)

//   const prices = [
//     { value: 10, label: '10' },
//     { value: 20, label: '20' },
//     { value: 30, label: '30' },
//     { value: 40, label: '40' },
//   ]

//   const handleChange = (selectedOption) => {
//     setSelectedPrice({
//       ...selectedOption,
//       label: `${selectedOption.value} $`,
//     })
//   }

//   const customIndicator = () => null // Кастомный индикатор, который ничего не рендерит

//   return (
//     <div className={css.priceSection}>
//       <label htmlFor="price" className={css.textLabel}>
//         Price
//       </label>
//       <Select
//         id="price"
//         value={selectedPrice}
//         onChange={handleChange}
//         options={prices}
//         className={css.select}
//         classNamePrefix="custom-select" // Префикс для кастомных стилей
//         placeholder="Select a price"
//         components={{ Indicator: customIndicator }} // Используем кастомный индикатор
//       />
//     </div>
//   )
// }

//=========================================================================================
// import { useState } from 'react'
// import css from './Price.module.css'

// export function Price() {
//   const [selectedPrice, setSelectedPrice] = useState('')
//   const prices = [10, 20, 30, 40]

//   return (
//     <div className={css.priceSection}>
//       <label htmlFor="price" className={css.textLabel}>
//         Price
//       </label>
//       <select
//         id="price"
//         value={selectedPrice}
//         onChange={(e) => setSelectedPrice(e.target.value)}
//       >
//               <option value="" disabled className={css.selectValue}>
//           Select a price
//         </option>
//         {prices.map((price, index) => (
//           <option key={index} value={price}>
//             {price} $
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }
