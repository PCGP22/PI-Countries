import {Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import NavBar from "./components/NavBar.jsx"
import Detail from "./components/Detail.jsx"
import ActividadesPage from "./components/ActividadesPage"
import HomePage from "./components/HomePage.jsx"
function App() {
  

  return (
    <Routes>
      <Route path="/*" element={<NavBar/>}/>
      <Route path="/countries/" element={<LandingPage navBar={false}/>}/>
      <Route path="/countries/countries/" element={<HomePage/>}/>
      <Route path="/countries/countries/:idPais" element={<Detail/>}/>
      <Route path="/countries/activities" element={<ActividadesPage/>}/>
    </Routes>
  )
}

export default App
