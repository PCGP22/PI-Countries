import { useState } from 'react'
import { connect } from "react-redux"
import Filter from './Filter.jsx'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

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

  const aux = () => {
    setReloadAux(!reloadAux)
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
        
        <main>
            <h1>Países y sus banderas</h1>
            { data.map(c=>{
                return(
                  <figure key={c.id}>
                    <img src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                )
              })
            }
            <button onClick={handlePrevious}><FiChevronLeft className="symbolSearch"/></button>
            {currentPage && <button onClick={()=>setCurrentPage(1)}>1</button>}
            {(currentPage >4 && pages.length>13) && <span>...</span>}
            {currentPages.filter(p=>p>0 && p<=max).map(p=>{
              return(
                <button onClick={handlePageChange} className={currentPage === p ? "pagination__current--button": ""} key={p}>{p}</button>
              )
            })}
            {(currentPage + 8) < max && <>
            <span>...</span>
            <button onClick={()=>setCurrentPage(max)}>{max}</button>
            </>}
            {/* {pages.length >=10 && pages.slice} */}
            {/* {pages.length > 1 && pages.map(p=>{
                  <button onClick={handlePageChange} key={p}>{p}</button>
                  )
              }
              else if(currentPage>2 && currentPage>max-3){
                return(
                    <>
                      <button onClick={()=>setCurrentPage(1)}>1</button>
                      <span>...</span>
                      <button>{currentPage}</button>
                      <button onClick={handlePageChange}>{currentPage+1}</button>
                      <button onClick={handlePageChange}>{currentPage+2}</button>
                      <span>...</span>
                      <button onClick={()=>setCurrentPage(25)}>25</button>
                    </>
                )
              }
              else {
                return(
                  <>
                <button onClick={()=>setCurrentPage(1)}>1</button>
                <span>...</span>
                <button onClick={()=>setCurrentPage(22)}>22</button>
                <button onClick={()=>setCurrentPage(23)}>23</button>
                <button onClick={()=>setCurrentPage(24)}>24</button>
                <button onClick={()=>setCurrentPage(25)}>25</button>
              </>
              )
              }
            })} */}
            
            <button onClick={handleNext}><FiChevronRight className="symbolSearch"/></button>
        </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    countriesFiltered: state.countriesFiltered,
  }
}

export default connect(mapStateToProps,null)(HomePage)