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

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <NavBar/>
      <Routes>
        <Route path='/list' element={<List/>}></Route>
        <Route path='/signup' element={<Signup/>}></Route>
        <Route path='/' element={<Login/>}></Route>
        <Route path='/add' element={<AddTask />}></Route>
      </Routes>
      <ToastContainer />
    </>
  )
}

export default App
