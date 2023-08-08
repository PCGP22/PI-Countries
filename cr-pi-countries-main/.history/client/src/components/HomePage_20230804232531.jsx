import { useEffect, useState } from 'react'
import Filter from './Filter.jsx'
import { connect } from "react-redux"

const sliceCountries = (data,page,maxPageData) => {
    return data.slice((page-1)*maxPageData,page*maxPageData)
}
//max 25 pags. 250/10 = 25

function HomePage(props) {
  const countries = props.allCountries
  const [currentPage, setCurrentPage] = useState(1)

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
    setCurrentPage(e.currentTarget.value)
  }
  
  return (
    <>
        <Filter/>
        <main>
            <h1>Países y sus banderas</h1>
            {
              data.map(c=>{
                return(
                  <figure key={c.id}>
                    <img src={c.image}/>
                    <figcaption>{c.name}</figcaption>
                  </figure>
                )
              })
            }
            {/* {currentPage>0?} */}
            <button onClick={handlePrevious}>Anterior</button>
            {(currentPage>0 && currentPage<23)? 
              <>
                {currentPage>3?
                  <>
                    <button>1</button>
                    <span>...</span>
                  </>:""}
                <button>{currentPage}</button>
                <button onClick={handlePageChange}>{currentPage+1}</button>
                <button onClick={handlePageChange}>{currentPage+2}</button>
                <span>...</span>
                <button>25</button>
              </>:
              <>
                <button>1</button>
                <span>...</span>
                <button>22</button>
                <button>23</button>
                <button>24</button>
                <button>25</button>
              </>
            }
            <button onClick={handleNext}>Siguiente</button>
            {/* paginación */}
        </main>
    </>
  )
}

const mapStateToProps = (state) => {
  return {
    allCountries: state.allCountries,
  }
}

export default connect(mapStateToProps,null)(HomePage)