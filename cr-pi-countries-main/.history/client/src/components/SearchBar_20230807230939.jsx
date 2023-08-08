import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import { ImSearch } from "react-icons/im";
import "../styles/SearchBar.modules.css"


function SearchBar(props) {

  const [name, setName] = useState()
  const navigate = useNavigate();

  // const handleChange = (e) => {
  //   setName(e.target.value)
  // }

  const handleClick = async() => {
     setName("")
  }
  
  const handleKeyDown = async(e) => {
    if(e.keyCode === 13) { //Detect enter
      navigate(`/countries/countries/search?name=${name}`)
      setName("")
    }
  }
  
  return (
    <div className='searchBar__container normal-text'>
        <input type='text' placeholder='Search country' onChange={()=>setName(name)} onKeyDown={handleKeyDown} className='searchBar__input' value={name}/>
        <Link to={`/countries/countries/search?name=${name}`} className='searchBar__button'>
          <ImSearch onClick={handleClick}/>
        </Link>
    </div>
  )
}



export default SearchBar
