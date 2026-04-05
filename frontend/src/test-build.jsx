// Test minimal build
import React from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'

const App = () => {
  return (
    <div>
      <h1>Test Build</h1>
      <p>If you see this, build worked!</p>
    </div>
  )
}

createRoot(document.getElementById('root')).render(<App />)
