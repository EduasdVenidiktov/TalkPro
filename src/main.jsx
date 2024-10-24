import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'

import { initializeApp } from 'firebase/app'
import { getDatabase, ref, get } from 'firebase/database'

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
console.log(database)

// Функція для перевірки підключення до бази даних
export function checkDatabaseConnection() {
  const dbRef = ref(database, '/someTestPath') // використовуйте будь-який існуючий шлях або створіть тестовий
  get(dbRef)
    .then((snapshot) => {
      if (snapshot.exists()) {
        console.log('Дані з бази:', snapshot.val())
      } else {
        console.log('Дані не знайдено')
      }
    })
    .catch((error) => {
      console.error('Помилка при отриманні даних:', error)
    })
}

// Виклик функції для перевірки підключення
checkDatabaseConnection()

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>
)
