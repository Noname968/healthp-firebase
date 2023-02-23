import React, { useContext } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import profilecontext from './context/Profilecontext'
import Home from './pages/Home'

function App() {
  const context = useContext(profilecontext);
  const { user } = context;

  return (
    <BrowserRouter>
      <Routes>
        <Route exact path='/' element={<Signup />} />
        <Route path='/login' element={<Login />} />
        {user && (
          <Route path='/home' element={<Home />} />
        )}
      </Routes>
    </BrowserRouter>
  )
}

export default App
