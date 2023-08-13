import { Link, useLocation } from 'react-router-dom';
import { connect } from "react-redux"
import { useState, useEffect } from 'react'
import { addCountries, addActivities, nameSearch } from '../redux/actions'
import { slicePage,sliceData } from '../common/Functions';
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import Container from './Container';


function SearchResults(props) {
  
  // const [currentPage, setCurrentPage] = useState(1)
  // const location = useLocation();


  // useEffect(() => {
  //   if(location.pathname === "/countries/countries/search"){
  //     let name = location.search.split("=")[1];
  //     props.nameSearch(name.toString().trim())
  //   } 
  //   if(location.pathname === "/countries/countries/"){

  //   }
  // }, [location])


  let countries = props.foundCountries
  // let max = Math.ceil(countries.length/10)
  // let pages = []
  // let x = 0
  
  // while(x<max){
  //   x++
  //   pages.push(x)
  // }

  // let data = sliceData(countries,currentPage,10)
  // let currentPages = slicePage(pages,currentPage,2)

  // const handlePrevious = () => {  
  //   if(currentPage>1){
  //     setCurrentPage(currentPage-1)
  //   }
  // }

  // const handleNext = () => {
  //   if(currentPage<max){
  //     setCurrentPage(currentPage+1)
  //   }
  // }

  // const handlePageChange = (e) => {
  //   setCurrentPage(Number(e.target.innerHTML))
  // }
  
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