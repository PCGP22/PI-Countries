import { Link } from 'react-router-dom'
import SearchBar from './SearchBar'
import { useLocation } from 'react-router-dom'
import "../styles/NavBar.modules.css"

function NavBar() {

  const location = useLocation();
  return (
      <div className='navBar__Container dark-purple white-text'>
        <Link to="/countries/countries/" className={location.pathname.toString() === "/countries/countries/"? 'navBar__link link_active big-text': 'navBar__link--unactive big-text'}>Home</Link>
        <SearchBar/>
        <Link to="/countries/activities/" className={location.pathname.toString() === "/countries/activities/"? 'navBar__link link_active big-text': 'navBar__link--unactive big-text'}>Activities</Link>
      </div>
  )
}

export default NavBar