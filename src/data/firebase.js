// src/firebase.js
import { firestore } from 'firebase-admin'
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child } from 'firebase/database'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayRemove,
  setDoc,
  collection,
  getDoc,
} from 'firebase/firestore'

const firebaseConfig = {
  apiKey: import.meta.env.VITE_API_KEY,
  authDomain: import.meta.env.VITE_AUTH_DOMAIN,
  databaseURL: import.meta.env.VITE_DATABASE_URL,
  projectId: import.meta.env.VITE_PROJECT_ID,
  storageBucket: import.meta.env.VITE_STORAGE_BUCKET,
  messagingSenderId: import.meta.env.VITE_MESSAGING_SENDER_ID,
  appId: import.meta.env.VITE_APP_ID,
}

// const firebaseConfig = {
//   apiKey: 'AIzaSyCPA9oF26HyhwskD8CNDauOE7kzE1lzfbQ',
//   authDomain: 'talkpro - ce5a4.firebaseapp.com',
//   databaseURL: 'https://talkpro-ce5a4-default-rtdb.firebaseio.com',
//   projectId: 'talkpro-ce5a4',
//   storageBucket: 'talkpro-ce5a4.appspot.com',
//   messagingSenderId: '255413950810',
//   appId: '1:255413950810:web:0b152b3d7c10f36dae3b63',
// }

console.log('Firebase config:', firebaseConfig) // ВАЖНО: добавьте эту строку!

const app = initializeApp(firebaseConfig)
const database = getDatabase(app)
export const db = getFirestore(app)

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export { database, ref, get, child }

export const addUserToFirestore = async (user, name) => {
  // Приймаємо name як аргумент
  try {
    const userRef = doc(db, 'users', user.uid)
    await setDoc(userRef, {
      name: name, // Використовуємо передане name
      email: user.email,
      createdAt: new Date().toISOString(),
    })
  } catch (error) {
    console.error('Error adding user to Firestore:', error)
    throw error // Важливо прокидати помилку далі для обробки в компоненті
  }
}

// export const addFavoriteCard = async (userId, cardData) => {
//   if (!userId || typeof userId !== 'string' || userId.trim() === '') {
//     console.error('userId is undefined or empty in addFavoriteCard')
//     return
//   }
//   if (!cardData || typeof cardData !== 'object' || !cardData.id) {
//     console.error(
//       'cardData or cardData.id is undefined or empty in addFavoriteCard'
//     )
//     return
//   }

//   try {
//     const userRef = doc(db, 'users', userId)
//     const favoriteCardsCollectionRef = collection(userRef, 'favoriteCards')
//     const cardDocRef = doc(favoriteCardsCollectionRef, cardData.id.toString())

//     await setDoc(cardDocRef, cardData) // Зберігає весь cardData в окремий документ
//   } catch (error) {
//     // Отримуємо помилку як параметр error
//     console.error('Помилка додавання картки в обране:', error)
//     throw error // Тепер кидаємо спійману помилку
//   }
// }

export const handleToggleFavorite = async (cardData, user) => {
  if (!user) return // Проверяем, авторизован ли пользователь
  if (!cardData?.id) {
    console.error('Card data must have an id')
    return
  }

  try {
    const userRef = doc(db, 'users', user.uid) // Путь к пользователю в Firestore
    const favoriteCardsCollectionRef = collection(userRef, 'favoriteCards')
    const cardDocRef = doc(favoriteCardsCollectionRef, cardData.id.toString())

    // Проверяем, существует ли карточка в избранном
    const cardSnapshot = await getDoc(cardDocRef)

    if (cardSnapshot.exists()) {
      // Если карточка уже в избранном, удаляем её
      await deleteDoc(cardDocRef)
      toast.success('Removed from favorites!')
    } else {
      // Если карточки нет, добавляем её
      await setDoc(cardDocRef, cardData) // cardData содержит все данные карточки
      toast.success('Added to favorites!')
    }
  } catch (error) {
    console.error('Error updating favorite cards:', error)
    toast.error('Failed to update favorites. Please try again later.')
  }
}

// export const handleToggleFavorite = async (cardId) => {
//   if (!user) return

//   try {
//     if (favoriteIds.includes(cardId)) {
//       await removeFavoriteCard(user.uid, cardId)
//       // setFavoriteIds(favoriteIds.filter((id) => id !== cardId))
//     } else {
//       await addFavoriteCard(user.uid, cardId)
//       // setFavoriteIds([...favoriteIds, cardId])
//     }
//   } catch {
//     // console.error('Error updating favoritecards:', error)
//     toast.error('Failed to update favoritecards. Please try again later.')
//   }
// }

//===================================================================================
// export const addFavoriteCard = async (userId, cardId) => {
//   try {
//     const userRef = doc(db, 'users', userId)
//     await updateDoc(userRef, {
//       favoritecards: arrayUnion(cardId),
//     })
//   } catch (error) {
//     console.error('Error adding to favoritecards:', error)
//     throw error // Пробрасываем ошибку для обработки в компоненте
//   }
// }

export const removeFavoriteCard = async (userId, cardId) => {
  if (!userId || !cardId) {
    console.error(
      'userId or cardId is undefined or empty in removeFavoriteCard'
    )
    return
  }

  try {
    const userRef = doc(db, 'users', userId)
    await updateDoc(userRef, {
      favoriteCards: arrayRemove(cardId.toString()), // Преобразование cardId в строку
    })
  } catch (error) {
    console.error('Error removing from favorites:', error)
    throw error
  }
}

// export const removeFavoriteCard = async (userId, cardId) => {
//   if (!userId || !cardId) {
//     console.error(
//       'userId or cardId is undefined or empty in removeFavoriteCard'
//     )
//     return // або throw error; якщо хочете обробляти помилку вище
//   }
//   try {
//     const userRef = doc(db, 'users', userId)
//     await updateDoc(userRef, {
//       favoriteCards: arrayRemove(cardId),
//     })
//   } catch (error) {
//     console.error('Error removing from favorites:', error)
//     throw error // Пробрасываем ошибку
//   }
// }

export const getFavoriteCards = async (userId) => {
  try {
    const userRef = doc(db, 'users', userId)
    const favoriteCardsCollectionRef = collection(userRef, 'favoriteCards')
    const querySnapshot = await getDocs(favoriteCardsCollectionRef)

    const favoriteCards = []
    querySnapshot.forEach((doc) => {
      console.log('Data from Firestore:', doc.data()) // Добавьте эту строку для отладки
      favoriteCards.push(doc.data())
    })
    return favoriteCards
  } catch (error) {
    console.error('Error getting favorite cards:', error)
    return []
  }
}

// export const getFavoriteCards = async (userId) => {
//   try {
//     const userRef = doc(db, 'users', userId)
//     const userDoc = await getDoc(userRef)
//     if (userDoc.exists()) {
//       return userDoc.data().favoritecards || []
//     } else {
//       console.log('User not found.')
//       return []
//     }
//   } catch (error) {
//     console.error('Error getting favoritecards:', error)
//     return []
//   }
// }

// export const addUserToFirestore = async (user) => {
//   try {
//     // Створюємо документ з вказаним userId
//     const userRef = doc(db, 'users', user.uid) // Используйте user.uid как ID документа
//     await setDoc(userRef, {
//       name: user.name,
//       email: user.email,
//       // createdAt: new Date().toISOString(),
//     })
//     console.log('User added to Firestore')
//   } catch (error) {
//     console.error('Error adding user to Firestore:', error)
//   }
// }

// Функція для отримання даних про вчителів з Firebase
export const getTeachersData = async () => {
  const dbRef = ref(database, '/teachers')
  try {
    const snapshot = await get(dbRef)
    if (snapshot.exists()) {
      const teachersArray = Object.values(snapshot.val()) // Перетворює об'єкт на масив
      return teachersArray
    } else {
      console.log('Дані не знайдено')
      return []
    }
  } catch (error) {
    console.error('Помилка при отриманні даних:', error)
    return []
  }
}
