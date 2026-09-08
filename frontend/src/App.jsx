import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Sessoes from './pages/sessoes'
import AppNav from './components/AppNav/AppNav'
import ModalSessionMovie from './components/ModalSessionMovie/modalSessionMovie'
import ModalNewCategory from './components/ModalNewCategory/modalNewCategory'
import { SessionProvider } from './context/SessionContext'
import { CategoryProvider } from './context/CategoryContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <CategoryProvider>
          <AppNav />
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/sessoes" element={<Sessoes />} />
          </Routes>
          <ModalSessionMovie />
          <ModalNewCategory />
        </CategoryProvider>
      </SessionProvider>
    </BrowserRouter>
  )
}

export default App
