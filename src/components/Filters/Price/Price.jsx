import { useState } from 'react'
import css from './Price.module.css'

export function Price() {
  const [selectedPrice, setSelectedPrice] = useState('')

  const prices = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
  ]

  const handleChange = (event) => {
    setSelectedPrice(event.target.value)
  }

  return (
    <div className={css.priceSection}>
      <label htmlFor="price" className={css.textLabel}>
        Price
      </label>
      <select
        id="price"
        value={selectedPrice}
        onChange={handleChange}
        className={css.selectValue}
      >
        <option value="" disabled>
          Select a price
        </option>
        {prices.map((price) => (
          <option key={price.value} value={price.value}>
            {selectedPrice == price.value ? `${price.label} $` : price.label}
          </option>
        ))}
      </select>
    </div>
  )
}

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
//         placeholder="Select a price"
//       />
//     </div>
//   )
// }

// // import { useState } from 'react'
// // // import Select from 'react-select'
// // import css from './Price.module.css'

// // export function Price() {
// //   const [selectedPrice, setSelectedPrice] = useState(null)

// //   const prices = [
// //     { value: 10, label: '10' },
// //     { value: 20, label: '20' },
// //     { value: 30, label: '30' },
// //     { value: 40, label: '40' },
// //   ]

// //   const handleChange = (selectedOption) => {
// //     setSelectedPrice({
// //       ...selectedOption,
// //       label: `${selectedOption.value} $`,
// //     })
// //   }

// //   return (
// //     <div className={css.priceSection}>
// //       <label htmlFor="price" className={css.textLabel}>
// //         Price
// //       </label>
// //       <select
// //         id="price"
// //         value={selectedPrice}
// //         onChange={handleChange}
// //         // options={prices}
// //         className={css.selectValue}
// //         placeholder="Select a price"
// //       />
// //     </div>
// //   )
// // }
