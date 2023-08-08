import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ImSearch } from "react-icons/im";
import { nameSearch } from '../redux/actions';
import { Link } from 'react-router-dom';


function SearchBar(props) {

  const [name, setName] = useState()
  const [aux, setAux] = useState(true)

  const handleChange = (e) => {
    setName(e.target.value)
  }

  const handleClick = async () => {
      let message = await props.nameSearch(name)
      if(message.toString() === "undefined"){
        alert("No encontrado")
      }
      setAux(!aux)
  }

  // useEffect(() => {
  //   props.nameSearch(name)
  // }, [aux])
  
  
  return (
    <div className='searchBar__container'>
        <input type='text' placeholder='Búsqueda' onChange={handleChange}/>
        <Link to={`/countries/countries/search?name=${name}`}>
          <span onClick={handleClick}><ImSearch/></span>
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
