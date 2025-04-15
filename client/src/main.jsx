import { StrictMode } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { createRoot } from 'react-dom/client'
import App from './App.jsx';


createRoot(document.getElementById('root')).render(
<StrictMode>
   <App/>
   </StrictMode>
)
