// Test minimal build
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import TestBuild from './test-build.jsx'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <TestBuild />
  </StrictMode>,
)
