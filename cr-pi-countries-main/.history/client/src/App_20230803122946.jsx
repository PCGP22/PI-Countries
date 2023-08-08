import {Routes, Route } from "react-router-dom"
import LandingPage from "./components/LandingPage"
function App() {
  

  return (
    <Routes>
      <Route path={"/countries"} element={<LandingPage/>}/>
      
      
    </Routes>
  )
}

export default App
