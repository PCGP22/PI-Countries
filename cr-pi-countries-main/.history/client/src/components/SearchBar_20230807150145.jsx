import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ImSearch } from "react-icons/im";
import { nameSearch } from '../redux/actions';
import { Link } from 'react-router-dom';
import "../styles/SearchBar.modules.css"


function SearchBar(props) {

  const [name, setName] = useState()

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = async () => {
      props.nameSearch(name)
  }
  
  
  
  return (
    <div className='searchBar__container normal-text'>
        <input type='text' placeholder='Búsqueda' onChange={handleChange} className='searchBar__input'/>
        <Link to={`/countries/countries/search?name=${name}`} className='searchBar__button'>
          <ImSearch onClick={handleClick}/>
        </Link>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    nameSearch: (name) => {dispatch(nameSearch(name))}
  }
}

export default connect(null,mapDispatchToProps)(SearchBar)
