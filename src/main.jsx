import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import Navigation from './Navigation'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <Navigation/>
  </StrictMode>,
)
