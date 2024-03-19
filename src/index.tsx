import ReactDOM from 'react-dom/client'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Auto from './Auto'
import Manual from './Manual'
import './index.css'

const root = document.getElementById('root')
root && ReactDOM.createRoot(root).render(
  <BrowserRouter>
    <Routes>
      <Route index element={<Auto />} />
      <Route path='manual/' element={<Manual />} />
    </Routes>
  </BrowserRouter>
)
