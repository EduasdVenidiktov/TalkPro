// src/firebase.js
import { initializeApp } from 'firebase/app'
import { GoogleAuthProvider, getAuth } from 'firebase/auth'
import { getDatabase, ref, get, child } from 'firebase/database'

const firebaseConfig = {
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

export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

export { database, ref, get, child }

// Дополнительно экспортируем функцию проверки
export function checkDatabaseConnection() {
  const dbRef = ref(database, '/teachers')
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        const teachersArray = snapshot.val() // Масив даних із ключа 'teachers'
        console.log('Дані з бази:', teachersArray)
      } else {
        console.log('Дані не знайдено')
      }
    })
    .catch((error) => {
      console.error('Помилка при отриманні даних:', error)
    })
}
