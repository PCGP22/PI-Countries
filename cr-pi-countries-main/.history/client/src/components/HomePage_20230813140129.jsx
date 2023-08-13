import { useState } from 'react'
import { addCountries, addActivities, nameSearch } from '../redux/actions'
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import Filter from './Filter.jsx'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import { slicePage,sliceData } from '../common/Functions';
import "../styles/HomePage.modules.css"
import Container from './Container';


function HomePage(props) {

  const [reloadAux, setReloadAux] = useState(true)
  // const [currentPage, setCurrentPage] = useState(1)

  const aux = () => {
    setReloadAux(!reloadAux)
    setCurrentPage(1)
  }


  let countries = props.countriesFiltered
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
      <Filter aux={aux}/>
      {reloadAux? "":""}
        
      <main className='homePage__container'>
        <Container source={countries}/>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    countriesFiltered: state.countriesFiltered,
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

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)