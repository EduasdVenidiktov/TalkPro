// src/firebase.js
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child } from 'firebase/database'
import {
  getFirestore,
  doc,
  updateDoc,
  arrayUnion,
  arrayRemove,
  getDoc,
  setDoc,
} from 'firebase/firestore'

export const firebaseConfig = {
  apiKey: 'AIzaSyCPA9oF26HyhwskD8CNDauOE7kzE1lzfbQ',
  authDomain: 'talkpro-ce5a4.firebaseapp.com',

  databaseURL: 'https://talkpro-ce5a4-default-rtdb.firebaseio.com',
  projectId: 'talkpro-ce5a4',
  storageBucket: 'talkpro-ce5a4.appspot.com',
  messagingSenderId: '255413950810',
  appId: '1:255413950810:web:0b152b3d7c10f36dae3b63',
}

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
    console.log('User added to Firestore')
  } catch (error) {
    console.error('Error adding user to Firestore:', error)
    throw error // Важливо прокидати помилку далі для обробки в компоненті
  }
}

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

//Добавление карточек в избранное:
export const addFavoriteCard = async (localId, cardId) => {
  try {
    const userRef = doc(db, 'users', localId)
    await updateDoc(userRef, {
      favorites: arrayUnion(cardId),
    })
  } catch (error) {
    console.error('Ошибка при добавлении в избранное:', error)
  }
}

//Удаление карточек из избранного:
export const removeFavoriteCard = async (localId, cardId) => {
  try {
    const userRef = doc(db, 'users', localId)
    await updateDoc(userRef, {
      favorites: arrayRemove(cardId),
    })
  } catch (error) {
    console.error('Ошибка при удалении из избранного:', error)
  }
}

//Получение списка избранных карточек:

export const getFavoriteCards = async (localId) => {
  try {
    const userRef = doc(db, 'users', localId)
    const userDoc = await getDoc(userRef)
    if (userDoc.exists()) {
      return userDoc.data().favorites || []
    } else {
      console.log('Пользователь не найден.')
      return []
    }
  } catch (error) {
    console.error('Ошибка при получении избранного:', error)
    return []
  }
}

// // Дополнительно экспортируем функцию проверки
// export function checkDatabaseConnection() {
//   const dbRef = ref(database, '/teachers')
//   get(dbRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         const teachersArray = snapshot.val() // Масив даних із ключа 'teachers'
//         console.log('Дані з бази:', teachersArray)
//       } else {
//         console.log('Дані не знайдено')
//       }
//     })
//     .catch((error) => {
//       console.error('Помилка при отриманні даних:', error)
//     })
// }
