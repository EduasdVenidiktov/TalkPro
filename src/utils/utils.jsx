import { getDatabase, ref, set, get } from 'firebase/database'

export const saveFavoriteCards = async (localId, favoriteCards) => {
  const db = getDatabase()
  try {
    await set(ref(db, `favorites/${localId}`), favoriteCards)
    console.log('Favorites saved successfully!')
  } catch (error) {
    console.error('Error saving favorites: ', error)
  }
}

export const getFavoriteCards = async (localId) => {
  const db = getDatabase()
  try {
    const snapshot = await get(ref(db, `favorites/${localId}`))
    if (snapshot.exists()) {
      const teachersArray = Object.values(snapshot.val()) // Перетворює об'єкт на масив
      return teachersArray
    } else {
      console.log('No favorites found for this user.')
      return []
    }
  } catch (error) {
    console.error('Error fetching favorites: ', error)
    return []
  }
}

export const handleEscapeKey = (onClose) => (e) => {
  if (e.key === 'Escape') {
    onClose()
  }
}

export const handleBackdropClick = (onClose) => (e) => {
  if (e.target === e.currentTarget) {
    onClose()
  }
}
