import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Dashboard from './pages/dashboard'
import Sessoes from './pages/sessoes'
import AppNav from './components/AppNav/AppNav'
import ModalSessionMovie from './components/ModalSessionMovie/modalSessionMovie'
import { SessionProvider } from './context/SessionContext'
import './App.css'

function App() {
  return (
    <BrowserRouter>
      <SessionProvider>
        <AppNav />
        <Routes>
          <Route path="/" element={<Dashboard />} />
          <Route path="/sessoes" element={<Sessoes />} />
        </Routes>
        <ModalSessionMovie />
      </SessionProvider>
    </BrowserRouter>
  )
}

export default App
