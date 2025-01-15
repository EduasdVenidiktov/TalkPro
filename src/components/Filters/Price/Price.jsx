import { useState } from 'react'
import css from './Price.module.css'
import { prices } from '/src/data/options'

export function Price({ setFilters }) {
  const [selectedPrice, setSelectedPrice] = useState('')

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
