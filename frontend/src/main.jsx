// main.jsx
// The very first JS file that runs in the browser. Its only job is to find
// the <div id="root"> in index.html and render our <App /> component into it.

import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
