import React from 'react'
import { Link } from 'react-router-dom'

function NavBar() {
  return (
    <>
     <Link to="/countries">Home</Link>
     {/* searchbar */}
     <Link to="/activities">Activities</Link>

    </>
  )
}

export default NavBar