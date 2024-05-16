import { useState } from 'react'

import Header from "./components/header/header.jsx"
import Homepage from './components/homepage/homepage.jsx'
import Converter from './components/converter/converter.jsx'
import { Route, Routes } from 'react-router-dom'
import './App.css'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <div className='home'>
      <Header/>
       
       {/* Top Section */}
       <Routes>
           <Route path='/' element={<Homepage/>}/>
           <Route path='/converter' element={<Converter/>}/>
       </Routes>
       
        
      </div>
      
    </>
  )
}

export default App
