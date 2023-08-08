import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import { ImSearch } from "react-icons/im";
import { nameSearch } from '../redux/actions';
import { Link } from 'react-router-dom';


function SearchBar(props) {

  const [name, setName] = useState()
  const [aux, setAux] = useState("true")
  const foundCountries = props.countriesFiltered

  const handleChange = (e) => {
    setName(e.target.value)
  }



  const handleClick = async () => {
      let message = await props.nameSearch(name)
      if(typeof message === "error"){
        alert("Error")
      }
      
  }
  
  useEffect(() => {
    if(props.countriesFiltered === []){
      alert("No encontrado")
    }
  }, [props.countriesFiltered])
  
  
  return (
    <div className='searchBar__container'>
        <input type='text' placeholder='Búsqueda' onChange={handleChange}/>
        <Link to={`/countries/countries/search?name=${name}`}>
          <span onClick={handleClick}><ImSearch/></span>
        </Link>
    </div>
  )
}

const mapStateToProps = (state) => {
  return{
    countriesFiltered: state.countriesFiltered
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    nameSearch: (name) => {dispatch(nameSearch(name))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchBar)
