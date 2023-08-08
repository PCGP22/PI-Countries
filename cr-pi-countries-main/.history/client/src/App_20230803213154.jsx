import {Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import WithNavBar from "./components/WithNavBar"
import Detail from "./components/Detail.jsx"
import ActivityPage from "./components/ActivityPage"
import HomePage from "./components/HomePage.jsx"
function App() {
  

  return (
    <Routes>
      <Route path="/countries/" element={<LandingPage navBar={false}/>}/>
      <Route element={WithNavBar}>
        <Route path="/countries/countries/" element={<HomePage/>}/>
        <Route path="/countries/countries/:idPais" element={<Detail/>}/>
        <Route path="/countries/activities" element={<ActivityPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
