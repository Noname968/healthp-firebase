import React, { useContext } from 'react'
import Login from './components/Login'
import Signup from './components/Signup'
import { BrowserRouter, Route, Routes } from 'react-router-dom'
import profilecontext from './context/Profilecontext'
import Adddoc from './components/Adddoc'
import Docs from './components/Docs'

function App() {
  const context = useContext(profilecontext);
  const { user } = context;

  return (
    <BrowserRouter>
      <div className="app">
        <Routes>
          <Route exact path='/' element={<Signup />} />
          <Route path='/login' element={<Login />} />
          {user && (
            <>
              <Route path='/addoc' element={<Adddoc />} />
              <Route path='/docs' element={<Docs />} />
            </>
          )}
        </Routes>
      </div>
    </BrowserRouter>
  )
}

export default App
