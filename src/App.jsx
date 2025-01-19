import './App.css'
import Header from './Components/Header'
import { Route, Routes } from 'react-router-dom'
import Home from './Pages/Home'
import LoginPage from './Pages/LoginPage'

function App() {
  

  return (
    <>
      <Header/>
      <Routes>
        <Route path='/Home' element={<Home/>} />
        <Route path='/' element={<LoginPage/>} />
        <Route path='/register' element={<LoginPage register={true} />} />
      </Routes>
      
    </>
  )
}

export default App
