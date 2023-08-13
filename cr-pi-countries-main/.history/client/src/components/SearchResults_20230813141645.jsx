import { Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux"
import { useState, useEffect } from 'react'
import { addCountries, addActivities, nameSearch } from '../redux/actions'
import { slicePage,sliceData } from '../common/Functions';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Container from './Container';


function SearchResults(props) {

  const location = useLocation();

  let countries = props.foundCountries

  useEffect(() => {
    if(location.pathname === "/countries/countries/search"){
      let name = location.search.split("=")[1];
      props.nameSearch(name.toString().trim())
      countries = props.foundCountries
    } 
 
  }, [location])
  
  return (
    <>
        
      <main className='homePage__container'>
       <Container source={countries}/>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    foundCountries: state.foundCountries,
    errorMessage: state.errorMessage,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())},
    addActivities: ()=>{dispatch(addActivities())},
    nameSearch: (name) => {dispatch(nameSearch(name))}
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(SearchResults)