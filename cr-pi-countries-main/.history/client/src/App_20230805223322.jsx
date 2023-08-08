import {Routes, Route, useNavigate } from "react-router-dom"
import LandingPage from "./components/LandingPage"
import WithNavBar from "./components/WithNavBar"
import Detail from "./components/Detail.jsx"
import ActivityPage from "./components/ActivityPage"
import HomePage from "./components/HomePage.jsx"
import { useEffect } from "react"
import { useSearchParams } from 'react-router-dom'
function App() {

  const navigate = useNavigate()
  
  useEffect(() => {
    navigate("/countries/")
  }, [])
  
  const [searchParams, setSearchParams] = useSearchParams()

  return (
    <Routes>
      <Route path="/countries/" element={<LandingPage navBar={false}/>}/>
      <Route element={<WithNavBar/>}>
        <Route path="/countries/countries/" element={<HomePage/>}/>
        <Route path="/countries/countries/search" params={searchParams.get('name')} element={<HomePage/>}/>
        <Route path="/countries/countries/:idCountry" element={<Detail/>}/>
        <Route path="/countries/activities" element={<ActivityPage/>}/>
      </Route>
    </Routes>
  )
}

export default App
