import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'modern-normalize'
import './index.css'

// import { initializeApp } from 'firebase/app'
// import { getDatabase, ref, get } from 'firebase/database'
import { BrowserRouter } from 'react-router-dom'
import { checkDatabaseConnection } from './firebase/firebase.js'
// import { Provider } from 'react-redux'
// import { PersistGate } from 'redux-persist/integration/react'
// import { store, persistor } from './redux/store.js'
// import { FavoritesProvider } from './components/FavoritesContext/FavoritesContext.jsx' // Імпорт провайдера

// const firebaseConfig = {
//   apiKey: 'AIzaSyCPA9oF26HyhwskD8CNDauOE7kzE1lzfbQ',
//   authDomain: 'talkpro-ce5a4.firebaseapp.com',
//   databaseURL: 'https://talkpro-ce5a4-default-rtdb.firebaseio.com',
//   projectId: 'talkpro-ce5a4',
//   storageBucket: 'talkpro-ce5a4.appspot.com',
//   messagingSenderId: '255413950810',
//   appId: '1:255413950810:web:0b152b3d7c10f36dae3b63',
// }

// const app = initializeApp(firebaseConfig)
// const database = getDatabase(app)
// console.log(database)

// // Функція для перевірки підключення до бази даних
// export function checkDatabaseConnection() {
//   const dbRef = ref(database, '/someTestPath') // використовуйте будь-який існуючий шлях або створіть тестовий
//   get(dbRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log('Дані з бази:', snapshot.val())
//       } else {
//         console.log('Дані не знайдено')
//       }
//     })
//     .catch((error) => {
//       console.error('Помилка при отриманні даних:', error)
//     })
// }

// Виклик функції для перевірки підключення
checkDatabaseConnection()

ReactDOM.createRoot(document.getElementById('root')).render(
  // <Provider store={store}>
  <BrowserRouter>
    {/* <PersistGate loading={null} persistor={persistor}>
        <FavoritesProvider> */}{' '}
    {/* <React.StrictMode> */}
    <App />
    {/* </React.StrictMode> */}
    {/* </FavoritesProvider>
      </PersistGate> */}
  </BrowserRouter>
  // </Provider>
)

//==============================================================================
// import { StrictMode } from 'react'
// import { createRoot } from 'react-dom/client'
// import App from './App.jsx'
// import './index.css'

// import { initializeApp } from 'firebase/app'
// import { getDatabase, ref, get } from 'firebase/database'
// import { BrowserRouter } from 'react-router-dom'

// const firebaseConfig = {
//   apiKey: 'AIzaSyCPA9oF26HyhwskD8CNDauOE7kzE1lzfbQ',
//   authDomain: 'talkpro-ce5a4.firebaseapp.com',
//   databaseURL: 'https://talkpro-ce5a4-default-rtdb.firebaseio.com',
//   projectId: 'talkpro-ce5a4',
//   storageBucket: 'talkpro-ce5a4.appspot.com',
//   messagingSenderId: '255413950810',
//   appId: '1:255413950810:web:0b152b3d7c10f36dae3b63',
// }
// const app = initializeApp(firebaseConfig)
// const database = getDatabase(app)
// console.log(database)

// // Функція для перевірки підключення до бази даних
// export function checkDatabaseConnection() {
//   const dbRef = ref(database, '/someTestPath') // використовуйте будь-який існуючий шлях або створіть тестовий
//   get(dbRef)
//     .then((snapshot) => {
//       if (snapshot.exists()) {
//         console.log('Дані з бази:', snapshot.val())
//       } else {
//         console.log('Дані не знайдено')
//       }
//     })
//     .catch((error) => {
//       console.error('Помилка при отриманні даних:', error)
//     })
// }

// // Виклик функції для перевірки підключення
// checkDatabaseConnection()

// createRoot(document.getElementById('root')).render(
//   <StrictMode>
//     <BrowserRouter>
//       <App />
//     </BrowserRouter>
//   </StrictMode>
// )
