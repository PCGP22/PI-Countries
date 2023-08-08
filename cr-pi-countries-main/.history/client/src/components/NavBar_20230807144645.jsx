import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import "../styles/NavBar.modules.css"
import { useLocation } from 'react-router-dom'

function NavBar() {

  const location = useLocation();
  return (
      <div className='navBar__Container dark-purple white-text big-text'>
        <Link to="/countries/countries/" className={location.pathname.toString() === "/countries/countries/"? 'navBar__link link_active': 'navBar__link'}>Home</Link>
        <SearchBar/>
        <Link to="/countries/activities" className={location.pathname.toString() === "/countries/activities"? 'navBar__link link_active': 'navBar__link'}>Activities</Link>
      </div>
  )
}

export default NavBar