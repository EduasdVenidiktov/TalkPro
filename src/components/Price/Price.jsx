import { useState } from 'react'
import css from './Price.module.css'

export function Price() {
  const [selectedPrice, setSelectedPrice] = useState('')

  const prices = [
    { value: 10, label: '10 $' },
    { value: 20, label: '20 $' },
    { value: 30, label: '30 $' },
    { value: 40, label: '40 $' },
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
            {price.label}
          </option>
        ))}
      </select>
    </div>
  )
}
