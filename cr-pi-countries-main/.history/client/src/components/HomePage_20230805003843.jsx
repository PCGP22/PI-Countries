import { useEffect, useState } from 'react'
import { connect } from "react-redux"
import Filter from './Filter.jsx'
import { FiChevronRight, FiChevronLeft } from "react-icons/fi";

const sliceCountries = (data,page,maxPageData) => {
    return data.slice((page-1)*maxPageData,page*maxPageData)
}
//max 25 pags. 250/10 = 25

function HomePage(props) {
  const [reloadAux, setReloadAux] = useState(true)
  const [currentPage, setCurrentPage] = useState(1)

  const aux = () => {
    setReloadAux(!reloadAux)
    console.log(reloadAux)
  }
  let countries = props.countriesFiltered
  

  let data = sliceCountries(countries,currentPage,10)
  const handlePrevious = () => {  
    if(currentPage>1){
      setCurrentPage(currentPage-1)
    }
  }
  const handleNext = () => {
    if(currentPage<25){
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
            { aux &&
              data.map(c=>{
                return(
                  <figure key={c.id}>
                    <img src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                )
              })
            }
            <button onClick={handlePrevious}><FiChevronLeft className="symbolSearch"/></button>
            {(currentPage>0 && currentPage<23)? 
              <>
                {currentPage>2?
                  <>
                    <button onClick={()=>setCurrentPage(1)}>1</button>
                    <span>...</span>
                  </>:""}
                <button>{currentPage}</button>
                <button onClick={handlePageChange}>{currentPage+1}</button>
                <button onClick={handlePageChange}>{currentPage+2}</button>
                <span>...</span>
                <button onClick={()=>setCurrentPage(25)}>25</button>
              </>:
              <>
                <button onClick={()=>setCurrentPage(1)}>1</button>
                <span>...</span>
                <button onClick={()=>setCurrentPage(22)}>22</button>
                <button onClick={()=>setCurrentPage(23)}>23</button>
                <button onClick={()=>setCurrentPage(24)}>24</button>
                <button onClick={()=>setCurrentPage(25)}>25</button>
              </>
            }
            <button onClick={handleNext}><FiChevronRight className="symbolSearch"/></button>
        </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
    countriesFiltered: state.countriesFiltered,
  }
}

export default connect(mapStateToProps,null)(HomePage)