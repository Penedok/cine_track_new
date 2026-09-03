import Dashboard from './pages/dashboard'
import ModalSessionMovie from './components/ModalSessionMovie/modalSessionMovie'
import { SessionProvider } from './context/SessionContext'
import './App.css'

function App() {
  return (
    <SessionProvider>
      <Dashboard />
      <ModalSessionMovie />
    </SessionProvider>
  )
}

export default App
