import { useState, useEffect } from 'react'
import { addCountries, addActivities } from '../redux/actions'
import { connect } from "react-redux"
import { Link } from 'react-router-dom';
import Filter from './Filter.jsx'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";
import "../styles/HomePage.modules.css"

const sliceData = (data,page,maxPageData) => {
    return data.slice((page-1)*maxPageData,page*maxPageData)
}
const slicePage = (data,currentPage,maxPages) => {
  if(currentPage === 1){
    return data.slice(currentPage,currentPage+maxPages+2)
  }
  if(currentPage === 2){
    return data.slice(currentPage-1,currentPage+maxPages+1)
  }
  else if(currentPage <= 3){
    return data.slice(currentPage-2,currentPage+maxPages)
  }
    return data.slice(currentPage-3,currentPage+maxPages)
  
  
}

function HomePage(props) {
  const [reloadAux, setReloadAux] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  useEffect(() => {
    props.addCountries()
    props.addActivities()
  }, [])

  const aux = () => {
    setReloadAux(!reloadAux)
    setCurrentPage(1)
  }
  let countries = props.countriesFiltered
  let max = Math.ceil(countries.length/10)
  let pages = []
  let x = 0
  
  while(x<max){
    x++
    pages.push(x)
  }

  let data = sliceData(countries,currentPage,10)
  let currentPages = slicePage(pages,currentPage,8)

  const handlePrevious = () => {  
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNext = () => {
    if(currentPage<max){
      setCurrentPage(currentPage+1)
    }
  }

  const handlePageChange = (e) => {
    setCurrentPage(Number(e.target.innerHTML))
  }
  
  return (
    <>
      <Filter aux={aux}/>
      {reloadAux? "":""}
        
      <main className='homePage__container'>
        <section className='homePage__board'>
          <h1 className='homePage__title big-text'>Countries and their flags</h1>
          { data.map(c=>{
            return(
              <Link key={c.id} to={`/countries/countries/${c.id}`}  className='homePage__card'>
                  <figure key={c.id}>
                    <img src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                </Link>
              )
            })
          }
          <div>
            {data.length === 0 && <p className='homePage__errorMsg'>No countries have been found</p>}
            <button onClick={handlePrevious}><FiChevronLeft className="symbolSearch"/></button>
            {currentPage && <button onClick={()=>setCurrentPage(1)} className='pagButton'>1</button>}
            {(currentPage >4 && pages.length>13) && <span>...</span>}
            {currentPages.filter(p=>p>0 && p<=max).map(p=>{
              return(
                <button onClick={handlePageChange} className={currentPage === p ? "pagination__current--button pagButton": "pagButton"} key={p}>{p}</button>
                )
              }
              )}
            {(currentPage + 8) < max && <>
              <span>...</span>
              <button onClick={()=>setCurrentPage(max)} className='pagButton'>{max}</button>
              </>
            }
            <button onClick={handleNext}><FiChevronRight className="symbolSearch"/></button>
          </div>
        </section>
      </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    countriesFiltered: state.countriesFiltered,
  }
}

const mapDispatchToProps = (dispatch) => {
  return{
    addCountries: ()=>{dispatch(addCountries())},
    addActivities: ()=>{dispatch(addActivities())},
  }
}

export default connect(mapStateToProps,mapDispatchToProps)(HomePage)