import { BrowserRouter, Route, Router, Routes } from 'react-router-dom'
import './App.css'
import Signup from './pages/SIgnup'
import Signin from './pages/Signin'
import Blog from './pages/Blog'

function App() {


  return (
    <>
      <BrowserRouter>
          <Routes>
           <Route path='/signup' element={<Signup/>}  />
           <Route path='signin' element={<Signin/>}   />\
           <Route path='blog/:id' element={<Blog/>} />
          </Routes>
      </BrowserRouter>
    </>
  )
}

export default App
