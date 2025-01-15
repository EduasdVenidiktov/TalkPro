import { createContext, useState } from 'react'

export const FavoriteCardsContext = createContext()

export const FavoriteCardsProvider = ({ children }) => {
  const [favoriteCards, setFavoriteCards] = useState([])

  const removeFavoriteCard = (cardId) => {
    setFavoriteCards((prevCards) =>
      prevCards.filter((card) => card.id !== cardId)
    )
  }

  return (
    <FavoriteCardsContext.Provider
      value={{ favoriteCards, removeFavoriteCard }}
    >
      {children}
    </FavoriteCardsContext.Provider>
  )
}
