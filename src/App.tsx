import { BrowserRouter, Route, Routes } from 'react-router-dom'
import Landing from './screens/landing'
import './App.css'

function App() {

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route path='/' element={<Landing />} />
        </Routes>
      </BrowserRouter>
    </div>
  )
}

export default App
