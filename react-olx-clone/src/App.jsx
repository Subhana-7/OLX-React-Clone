import React, { useContext, useEffect } from 'react'
import {BrowserRouter as Router , Route , Routes} from "react-router-dom"
import Signup from './pages/Signup'
import Home from './pages/Home'
import Login from './pages/Login'
import {FirebaseContext} from './store/FirebaseContext'
import {onAuthStateChanged} from 'firebase/auth'
import Create from './pages/Create'
import View from './pages/ViewPost' 

const App = () => {

  const {setUser,auth} = useContext(FirebaseContext);

  useEffect(() => {
    onAuthStateChanged(auth,(user) => {
      setUser(user)
    })
  })

  return (
    <div>
      <Router>
        <Routes>
          <Route path='/' element={<Home/>} />
          <Route path='/signup' element={<Signup/>} />
          <Route path='/login' element={<Login/>} />
          <Route path='/create' element={<Create/>} />
          <Route path='/view' element={<View/>} />
        </Routes>
      </Router>
    </div>
  )
}

export default App
