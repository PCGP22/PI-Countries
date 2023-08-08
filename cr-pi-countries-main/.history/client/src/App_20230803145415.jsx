import {Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NavBar from "./components/NavBar.jsx"
function App() {
  

  return (
    <Routes>
      <Route path="/countries/" element={<LandingPage/>}/>
      <Route path="/countries/" element={<NavBar/>}/>
      <Route path="/countries/" element={<Home/>}/>
      
    </Routes>
  )
}

export default App
