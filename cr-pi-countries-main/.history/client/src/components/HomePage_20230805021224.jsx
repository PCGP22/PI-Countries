import { useState } from 'react'
import { connect } from "react-redux"
import Filter from './Filter.jsx'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const sliceData = (data,page,maxPageData) => {
    return data.slice((page-1)*maxPageData,page*maxPageData)
}
const slicePage = (data,currentPage,maxPages) => {
  return data.slice(currentPage,currentPage+maxPages)
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
  pages = slicePages(pages,currentPage,10)
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
            {pages.length < 10 && pages.map(p=>{
              return(
                <button onClick={handlePageChange} className={currentPage === p ? "pagination__current--button": ""} key={p}>{p}</button>
              )
            })}
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