import React from 'react'
import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'

function NavBar() {
  return (
      <div className='navBar__Container'>
        <Link to="/countries" className='navBar__link'>Home</Link>
        <SearchBar/>
        <Link to="/activities" className='navBar__link'>Activities</Link>
      </div>
  )
}

export default NavBar