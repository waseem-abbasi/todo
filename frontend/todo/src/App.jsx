import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from './assets/vite.svg'
import heroImg from './assets/hero.png'
import './App.css'
import NavBar from './Components/NavBar'
import {Routes,Route} from 'react-router-dom'
import AddTask from './Components/AddTask'
import List from './Components/List'
import Signup from './Components/Signup'
import Login from './Components/Login'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ProtectedRoute from './Components/prodectedRoute.jsx';
import { useLocation } from "react-router-dom";

function App() {
   const location = useLocation();
    const hideNavbarRoutes = ["/", "/signup"];
  return (
    <>
     {!hideNavbarRoutes.includes(location.pathname) && <NavBar />}

      <Routes>
        {/* Public Routes */}
        <Route path='/' element={<Login/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>

        {/* Protected Routes */}
        <Route 
          path='/list' 
          element={
            <ProtectedRoute>
              <List/>
            </ProtectedRoute>
          } 
        />

        <Route 
          path='/add' 
          element={
            <ProtectedRoute>
              <AddTask/>
            </ProtectedRoute>
          } 
        />

      </Routes>

      <ToastContainer />
    </>
  )
}

export default App
