import {Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NavBar from "./components/NavBar.jsx"
function App() {
  

  return (
    <Routes>
      <Route path="/*" element={<NavBar/>}/>
      <Route path="/countries/" element={<LandingPage navBar={false}/>}/>
      <Route path="/countries/countries/" element={<Home/>}/>
      <Route path="/countries/countries/:idPais" element={<Home/>}/>

      
    </Routes>
  )
}

export default App
