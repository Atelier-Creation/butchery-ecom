import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'
import { LanguageProvider } from "./context/LanguageContext";
import { registerSW } from 'virtual:pwa-register'

registerSW({
  immediate: true
})

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <LanguageProvider>
    <App />
    </LanguageProvider>
  </StrictMode>,
)
