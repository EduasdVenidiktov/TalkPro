// import { createContext, useContext, useState, useEffect } from 'react'

// const FavoritesContext = createContext()

// export const useFavorites = () => {
//   return useContext(FavoritesContext)
// }

// export const FavoritesPage = ({ children }) => {
//   const [favorites, setFavorites] = useState([])

//   useEffect(() => {
//     const storedFavorites = JSON.parse(localStorage.getItem('favorites')) || []
//     setFavorites(storedFavorites)
//   }, [])

//   useEffect(() => {
//     localStorage.setItem('favorites', JSON.stringify(favorites))
//   }, [favorites])

//   const addFavorite = (teacher) => {
//     if (!favorites.some((fav) => fav._id === teacher._id)) {
//       // Проверка по _id
//       setFavorites([...favorites, teacher])
//     }
//   }

//   const removeFavorite = (id) => {
//     setFavorites(favorites.filter((teacher) => teacher._id !== id)) // Удаление по _id
//   }

//   const isFavorite = (id) => {
//     return favorites.some((teacher) => teacher._id === id) // Проверка по _id
//   }

//   return (
//     <FavoritesContext.Provider
//       value={{ addFavorite, removeFavorite, isFavorite, favorites }}
//     >
//       {children}
//     </FavoritesContext.Provider>
//   )
// }
