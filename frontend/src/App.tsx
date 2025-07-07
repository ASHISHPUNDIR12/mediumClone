import { BrowserRouter, Route, Routes } from 'react-router-dom'
import './App.css'
import Signin from './pages/Signin'
import Blog from './pages/Blog'
import Blogs from './pages/Blogs'
import Publish from './pages/Publish'
import LandingPage from './pages/LandingPage'
import ProtectedRoute from './components/ProtectedRoutes'
import Signup from './pages/signup'

function App() {


  return (
    <>
      <BrowserRouter>
      <Routes>
        <Route path='/' element={<LandingPage />} />
        <Route path='/signup' element={<Signup />} />
        <Route path='/signin' element={<Signin />} />
        
        {/* Protected Routes */}
        <Route path='/blog/:id' element={
          <ProtectedRoute>
            <Blog />
          </ProtectedRoute>
        } />
        
        <Route path='/blogs' element={
          <ProtectedRoute>
            <Blogs />
          </ProtectedRoute>
        } />
        
        <Route path='/publish' element={
          <ProtectedRoute>
            <Publish />
          </ProtectedRoute>
        } />
      </Routes>
    </BrowserRouter>
    </>
  )
}

// utils/isAuthenticated.ts
export const isAuthenticated = () => {
  const token = localStorage.getItem("token");
  return !!token;
};


export default App
