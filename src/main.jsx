import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import 'modern-normalize'
import './index.css'
import './assets/styles/toastStyles.css'

import { BrowserRouter } from 'react-router-dom'
import { checkDatabaseConnection } from './firebase/firebase.js'
import { AuthProvider } from '/src/AuthProvider'

// Виклик функції для перевірки підключення
checkDatabaseConnection()

ReactDOM.createRoot(document.getElementById('root')).render(
  <AuthProvider>
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </AuthProvider>
)
