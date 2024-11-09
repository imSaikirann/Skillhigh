import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import App from './App.jsx'
import '/node_modules/slick-carousel/slick/slick.css';
import '/node_modules/slick-carousel/slick/slick-theme.css';




createRoot(document.getElementById('root')).render(
  <StrictMode>
  <BrowserRouter>
  <App/>
  </BrowserRouter>
  </StrictMode>
)
