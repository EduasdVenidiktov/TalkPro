import { useState } from 'react'
import css from './Price.module.css'

export function Price({ setFilters }) {
  const [selectedPrice, setSelectedPrice] = useState('')

  const prices = [
    { value: 10, label: '10' },
    { value: 20, label: '20' },
    { value: 30, label: '30' },
    { value: 40, label: '40' },
  ]

  const handlePriceChange = (e) => {
    const price = e.target.value
    setSelectedPrice(price)
    setFilters((prevFilters) => ({ ...prevFilters, price }))
  }

  return (
    <div className={css.priceSection}>
      <label htmlFor="price" className={css.textLabel}>
        Price
      </label>
      <select
        id="price"
        value={selectedPrice}
        onChange={handlePriceChange}
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
// import css from './Price.module.css'

// export function Price({ setFilters }) {
//   const [selectedPrice, setSelectedPrice] = useState('')

//   const prices = [
//     { value: 10, label: '10' },
//     { value: 20, label: '20' },
//     { value: 30, label: '30' },
//     { value: 40, label: '40' },
//   ]

//   const handlePriceChange = (e) => {
//     const price = e.target.value
//     setSelectedPrice(price)
//     setFilters((prevFilters) => ({ ...prevFilters, price }))
//   }

//   return (
//     <div className={css.priceSection}>
//       <label htmlFor="price" className={css.textLabel}>
//         Price
//       </label>
//       <select
//         id="price"
//         value={selectedPrice}
//         onChange={handlePriceChange}
//         className={css.selectValue}
//       >
//         <option value="" disabled>
//           Select a price
//         </option>
//         {prices.map((price) => (
//           <option key={price.value} value={price.value}>
//             {selectedPrice == price.value ? `${price.label} $` : price.label}
//           </option>
//         ))}
//       </select>
//     </div>
//   )
// }
