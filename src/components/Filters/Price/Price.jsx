import { useState } from 'react'
import css from './Price.module.css'
import { prices, customStyles } from '/src/data/options'
import Select from 'react-select'

export function Price({ setFilters }) {
  const [selectedPrice, setSelectedPrice] = useState('')

  const handlePriceChange = (selectedOption) => {
    setSelectedPrice(selectedOption.value)
    setFilters((prevFilters) => ({
      ...prevFilters,
      price: selectedOption.value,
    }))
  }

  return (
    <div className={css.priceSection}>
      <label htmlFor="price" className={css.textLabel}>
        Price
      </label>
      <Select
        id="price"
        value={
          selectedPrice
            ? { value: selectedPrice, label: `${selectedPrice} $` }
            : null
        }
        options={prices}
        onChange={handlePriceChange}
        styles={customStyles}
        placeholder="Select price"
        getOptionLabel={(option) => option.label}
      />
    </div>
  )
}
