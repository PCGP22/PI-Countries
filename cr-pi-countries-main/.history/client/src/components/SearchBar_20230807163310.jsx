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
  let aux = ""
  const handleClick = async() => {
     aux = await props.nameSearch(name)
     console.log(aux)
  }
  
  const handleKeyDown = (e) => {
    if(e.keyCode === 13) { //Detect enter
       handleClick
       setName("")
    }
  }
  
  
  
  return (
    <div className='searchBar__container normal-text'>
        <input type='text' placeholder='Búsqueda' onChange={handleChange} onKeyDown={handleKeyDown} className='searchBar__input' value={name}/>
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
