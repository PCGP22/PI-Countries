import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function NavBar() {
  return (
    <>
     <Link to="/countries">Home</Link>
     <SearchBar/>
     <Link to="/activities">Activities</Link>

    </>
  )
}

export default NavBar