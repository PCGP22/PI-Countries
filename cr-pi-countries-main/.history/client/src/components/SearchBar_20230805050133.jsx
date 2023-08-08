import React, { useState } from 'react'
import { connect } from 'react-redux'
import { ImSearch } from "react-icons/im";
import { nameSearch } from '../redux/actions';

function SearchBar(props) {

  const [name, setName] = useState()

  const handleChange = (e) => {
    setName(e.target.value)
  }
  
  const handleClick = () => {
    props.nameSearch(name)
  }
  
  return (
    <div className='searchBar__container'>
        <input type='text' placeholder='Búsqueda' onChange={handleChange}/>
        <span onClick={handleClick}><ImSearch/></span>
    </div>
  )
}

const mapDispatchToProps = (dispatch) => {
  return{
    nameSearch: (name) => {dispatch(nameSearch(name))}
  }
}

export default connect(null,mapDispatchToProps)(SearchBar)
