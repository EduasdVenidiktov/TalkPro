import React from 'react'
import ReactDOM from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import { AuthProvider } from './AuthProvider' // Імпортуйте AuthProvider
import App from './App'
import './index.css'
import './assets/styles/toastStyles.css'
// import { getTeachersData } from './data/firebase'
import { getTeachersData } from '/src/data/firebase.js'

// Виклик функції для перевірки підключення
getTeachersData()

const root = ReactDOM.createRoot(document.getElementById('root'))
root.render(
  <React.StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App />
      </BrowserRouter>
    </AuthProvider>
  </React.StrictMode>
)
