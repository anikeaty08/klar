import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import Loader from './components/Loader'
import { LangProvider } from './i18n'
import './index.css'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Loader />
    <LangProvider>
      <App />
    </LangProvider>
  </StrictMode>,
)
